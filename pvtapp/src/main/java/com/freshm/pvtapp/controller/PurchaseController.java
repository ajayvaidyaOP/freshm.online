package com.freshm.pvtapp.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freshm.pvtapp.dto.PurchaseRequest;
import com.freshm.pvtapp.dto.PurchaseResponse;
import com.freshm.pvtapp.service.PurchaseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/purchases")
@CrossOrigin(origins = "*")
public class PurchaseController {

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    /**
     * Create Purchase / Material Receipt
     */
    @PostMapping
    public ResponseEntity<PurchaseResponse> createPurchase(
            @Valid @RequestBody PurchaseRequest request
    ) {

        PurchaseResponse response =
                purchaseService.createPurchase(request);

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }

    /**
     * Get All Purchases
     */
    @GetMapping
    public ResponseEntity<List<PurchaseResponse>> getAllPurchases() {

        return ResponseEntity.ok(
                purchaseService.getAllPurchases()
        );
    }

    /**
     * Get Purchase By Id
     */
    @GetMapping("/{id}")
    public ResponseEntity<PurchaseResponse> getPurchaseById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                purchaseService.getPurchaseById(id)
        );
    }

}
