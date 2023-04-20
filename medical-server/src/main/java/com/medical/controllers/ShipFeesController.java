package com.medical.controllers;

import com.medical.base.BaseController;
import com.medical.entity.ShipFees;
import com.medical.services.IShipFeesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/shipFees")
@CrossOrigin("*")
public class ShipFeesController extends BaseController<ShipFees> {

    @Autowired
    private IShipFeesService shipFeesService;


    @GetMapping()
    public ResponseEntity<?> getAllShipFees() {
        return new ResponseEntity<>(shipFeesService.getListShipFees(), HttpStatus.OK);
    }
}
