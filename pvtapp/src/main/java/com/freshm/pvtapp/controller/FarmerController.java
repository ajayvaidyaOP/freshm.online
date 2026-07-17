package com.freshm.pvtapp.controller;

import com.freshm.pvtapp.dto.FarmerRequest;
import com.freshm.pvtapp.dto.FarmerResponse;
import com.freshm.pvtapp.service.FarmerService;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/farmers")
@CrossOrigin(origins = "*")
public class FarmerController {

    private final FarmerService farmerService;

    public FarmerController(FarmerService farmerService) {
        this.farmerService = farmerService;
    }

    /**
     * Create Farmer
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FarmerResponse> createFarmer(

            @RequestPart("farmer")
            FarmerRequest request,

            @RequestPart(value = "aadharFile", required = false)
            MultipartFile aadharFile,

            @RequestPart(value = "panFile", required = false)
            MultipartFile panFile,

            @RequestPart(value = "bankPassbookFile", required = false)
            MultipartFile bankPassbookFile
    ) {

        FarmerResponse response =
                farmerService.createFarmer(
                        request,
                        aadharFile,
                        panFile,
                        bankPassbookFile
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }
    /**
     * Get All Farmers
     */
    @GetMapping
    public ResponseEntity<List<FarmerResponse>> getAllFarmers() {

        return ResponseEntity.ok(
                farmerService.getAllFarmers()
        );
    }

    /**
     * Get Farmer By Id
     */
    @GetMapping("/{id}")
    public ResponseEntity<FarmerResponse> getFarmerById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                farmerService.getFarmerById(id)
        );
    }

    /**
     * Get Farmers By Vendor
     */
    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<FarmerResponse>> getFarmersByVendor(
            @PathVariable Long vendorId
    ) {

        return ResponseEntity.ok(
                farmerService.getFarmersByVendor(vendorId)
        );
    }

    /**
     * Update Farmer
     */
    @PutMapping("/{id}")
    public ResponseEntity<FarmerResponse> updateFarmer(
            @PathVariable Long id,
            @RequestBody FarmerRequest request
    ) {

        return ResponseEntity.ok(
                farmerService.updateFarmer(id, request)
        );
    }

    /**
     * Change Farmer Status
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<String> changeStatus(
            @PathVariable Long id,
            @RequestParam Boolean status
    ) {

        farmerService.changeStatus(id, status);

        return ResponseEntity.ok(
                "Farmer status updated successfully."
        );
    }

    /**
     * Delete Farmer
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFarmer(
            @PathVariable Long id
    ) {

        farmerService.deleteFarmer(id);

        return ResponseEntity.ok(
                "Farmer deleted successfully."
        );
    }

}