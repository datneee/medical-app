package com.medical.controllers;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.medical.constants.Common;
import com.medical.dto.CustomerDTO;
import com.medical.dto.SignUpDTO;
import com.medical.dto.UserResetPasswordDTO;
import com.medical.entity.ResetPasswordUserToken;
import com.medical.entity.User;
import com.medical.exceptions.AppException;
import com.medical.models.AuthenticationRequest;
import com.medical.models.AuthenticationResponse;
import com.medical.services.IEmailService;
import com.medical.services.IRegistrationUserTokenService;
import com.medical.services.IResetPasswordUserTokenService;
import com.medical.services.IUserService;
import com.medical.services.Impl.MyUserDetailsService;
import com.medical.utils.JwtUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IUserService userService;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private IRegistrationUserTokenService registrationUserTokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private IResetPasswordUserTokenService resetPasswordUserTokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private IEmailService mailService;

    @Transactional
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody @Valid SignUpDTO signUpDTO) throws MessagingException, UnsupportedEncodingException {

        User oldUser = userService.getUserByUsername(signUpDTO.getUsername());
        oldUser = oldUser != null ? oldUser : userService.getUserByEmail(signUpDTO.getEmail());
        if (oldUser != null) {
            throw new AppException(Common.MSG_USERNAME_EXISTS);
        }
        User user = userService.create(signUpDTO);

        final UserDetails userDetails = myUserDetailsService.loadUserByUsername(user.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        registrationUserTokenService.createNewRegistrationUserToken(user, jwt);
        String linkActive = "<br /><a href ='localhost:8080/api/v1/auth/active/'>localhost:8080/api/v1/auth/active/" +jwt+" </a>";
        mailService.send(Common.MSG_SUBJECT_MAIL, Common.MSG_CONTENT + linkActive, user.getEmail(), true);
        return new ResponseEntity<>(Common.MSG_SIGNUP_SUCCESS, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new AppException(Common.MSG_INCORRECT_USERNAME);
        }
        final UserDetails userDetails = myUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        CustomerDTO user = userService.findByUsername(authenticationRequest.getUsername());

        return new ResponseEntity<>(new AuthenticationResponse(jwt, user), HttpStatus.OK);
    }


    @GetMapping("/active/{token}")
    public ResponseEntity<?> activeUser(@PathVariable(value = "token") String token){
        userService.activeUser(token);
        return new ResponseEntity<>(Common.MSG_ACTIVE_SUCCESS, HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody @Valid UserResetPasswordDTO userResetPasswordDTO) throws Exception {
        User user = userService.getUserByEmail(userResetPasswordDTO.getEmail());

        if(user == null || user.getStatus().toString() == "NOT_ACTIVE")
            throw new AppException(Common.MSG_NOT_FOUND);

        String newPassword = NanoIdUtils.randomNanoId(NanoIdUtils.DEFAULT_NUMBER_GENERATOR,
                NanoIdUtils.DEFAULT_ALPHABET, 15);

        final UserDetails userDetails = myUserDetailsService.loadUserByUsername(user.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        ResetPasswordUserToken resetPasswordToken = new ResetPasswordUserToken(user, jwt);
        resetPasswordUserTokenService.createResetPasswordUserToken(resetPasswordToken);

        mailService.send(Common.MSG_FORGOT_PASSWORD_SUBJECT, Common.MSG_NEW_PASSWORD+ newPassword, user.getEmail(), true);
        user.setPassword(passwordEncoder.encode(newPassword));
        userService.updateUser(user);

        resetPasswordUserTokenService.deleteById(resetPasswordToken.getId());
        return new ResponseEntity<>(Common.MSG_REQUEST_FORGOT_PASSWORD, HttpStatus.OK);
    }

}
