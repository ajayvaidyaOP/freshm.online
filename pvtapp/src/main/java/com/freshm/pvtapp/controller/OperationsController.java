package com.freshm.pvtapp.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.freshm.pvtapp.dto.*;
import com.freshm.pvtapp.service.OperationsService;

@RestController
@RequestMapping("/api/operations")
@CrossOrigin(origins = "*")
public class OperationsController {

    private final OperationsService service;

    public OperationsController(OperationsService service) {
        this.service = service;
    }

    // Receiving
    @PostMapping("/receipts")
    public ResponseEntity<MaterialReceiptResponse> createReceipt(@RequestBody MaterialReceiptRequest req) {
        return new ResponseEntity<>(service.createReceipt(req), HttpStatus.CREATED);
    }

    @GetMapping("/receipts")
    public ResponseEntity<List<MaterialReceiptResponse>> allReceipts() {
        return ResponseEntity.ok(service.getAllReceipts());
    }

    @GetMapping("/receipts/{id}")
    public ResponseEntity<MaterialReceiptResponse> receipt(@PathVariable Long id) {
        return ResponseEntity.ok(service.getReceipt(id));
    }

    @DeleteMapping("/receipts/{id}")
    public ResponseEntity<String> deleteReceipt(@PathVariable Long id) {
        service.deleteReceipt(id);
        return ResponseEntity.ok("Receipt deleted.");
    }

    // Returns
    @PostMapping("/returns")
    public ResponseEntity<MaterialReturnResponse> createReturn(@RequestBody MaterialReturnRequest req) {
        return new ResponseEntity<>(service.createReturn(req), HttpStatus.CREATED);
    }

    @GetMapping("/returns")
    public ResponseEntity<List<MaterialReturnResponse>> allReturns() {
        return ResponseEntity.ok(service.getAllReturns());
    }

    @DeleteMapping("/returns/{id}")
    public ResponseEntity<String> deleteReturn(@PathVariable Long id) {
        service.deleteReturn(id);
        return ResponseEntity.ok("Return deleted.");
    }

    // Packing
    @PostMapping("/packing")
    public ResponseEntity<PackingResponse> createPacking(@RequestBody PackingRequest req) {
        return new ResponseEntity<>(service.createPacking(req), HttpStatus.CREATED);
    }

    @GetMapping("/packing")
    public ResponseEntity<List<PackingResponse>> allPacking() {
        return ResponseEntity.ok(service.getAllPacking());
    }

    @DeleteMapping("/packing/{id}")
    public ResponseEntity<String> deletePacking(@PathVariable Long id) {
        service.deletePacking(id);
        return ResponseEntity.ok("Packing entry deleted.");
    }
}
