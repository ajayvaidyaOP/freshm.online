package com.freshm.pvtapp.controller;

import com.freshm.pvtapp.dto.VendorRequest;
import com.freshm.pvtapp.dto.VendorResponse;
import com.freshm.pvtapp.service.VendorService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin(origins = "*")
public class VendorController {

    private final VendorService vendorService;

    public VendorController(
            VendorService vendorService
    ) {
        this.vendorService = vendorService;
    }

    /**
     * Create Vendor
     */
    @PostMapping
    public ResponseEntity<VendorResponse> createVendor(
            @RequestBody VendorRequest request
    ) {

        VendorResponse response =
                vendorService.createVendor(request);

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }

    /**
     * Get All Vendors
     */
    @GetMapping
    public ResponseEntity<List<VendorResponse>> getAllVendors() {

        return ResponseEntity.ok(
                vendorService.getAllVendors()
        );
    }

    /**
     * Get Vendor By Id
     */
    @GetMapping("/{id}")
    public ResponseEntity<VendorResponse> getVendorById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                vendorService.getVendorById(id)
        );
    }

    /**
     * Update Vendor
     */
    @PutMapping("/{id}")
    public ResponseEntity<VendorResponse> updateVendor(
            @PathVariable Long id,
            @RequestBody VendorRequest request
    ) {

        return ResponseEntity.ok(
                vendorService.updateVendor(
                        id,
                        request
                )
        );
    }

    /**
     * Change Vendor Status
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<String> changeStatus(
            @PathVariable Long id,
            @RequestParam Boolean status
    ) {

        vendorService.changeStatus(
                id,
                status
        );

        return ResponseEntity.ok(
                "Vendor status updated successfully."
        );
    }

    /**
     * Delete Vendor (Soft Delete)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVendor(
            @PathVariable Long id
    ) {

        vendorService.deleteVendor(id);

        return ResponseEntity.ok(
                "Vendor deleted successfully."
        );
    }

}