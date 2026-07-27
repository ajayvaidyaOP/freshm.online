package com.freshm.pvtapp.controller;

import com.freshm.pvtapp.dto.BuyerRequest;
import com.freshm.pvtapp.dto.BuyerResponse;
import com.freshm.pvtapp.service.BuyerService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buyers")
@CrossOrigin(origins = "*")
public class BuyerController {

    private final BuyerService buyerService;

    public BuyerController(BuyerService buyerService) {
        this.buyerService = buyerService;
    }

    @PostMapping
    public ResponseEntity<BuyerResponse> createBuyer(
            @RequestBody BuyerRequest request
    ) {
        return new ResponseEntity<>(
                buyerService.createBuyer(request),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<BuyerResponse>> getAllBuyers() {
        return ResponseEntity.ok(buyerService.getAllBuyers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BuyerResponse> getBuyerById(@PathVariable Long id) {
        return ResponseEntity.ok(buyerService.getBuyerById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BuyerResponse> updateBuyer(
            @PathVariable Long id,
            @RequestBody BuyerRequest request
    ) {
        return ResponseEntity.ok(buyerService.updateBuyer(id, request));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> changeStatus(
            @PathVariable Long id,
            @RequestParam Boolean status
    ) {
        buyerService.changeStatus(id, status);
        return ResponseEntity.ok("Buyer status updated successfully.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBuyer(@PathVariable Long id) {
        buyerService.deleteBuyer(id);
        return ResponseEntity.ok("Buyer deleted successfully.");
    }
}
