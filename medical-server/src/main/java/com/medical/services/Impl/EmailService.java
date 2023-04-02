package com.medical.services.Impl;

import com.medical.services.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

@Component
@Service
public class EmailService implements IEmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void send(String subject, String content, String to, Boolean isHtmlFormat) throws MessagingException {
        if (isHtmlFormat == null) {
            isHtmlFormat = false;
        } else {
            isHtmlFormat = true;
        }
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        mimeMessage.setHeader("Content-Type", "text/html; charset=UTF-8");
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, isHtmlFormat, "UTF-8");
        helper.setSubject(subject);
        helper.setText(content, isHtmlFormat);
        helper.setTo(to);

        mailSender.send(mimeMessage);
    }
}
