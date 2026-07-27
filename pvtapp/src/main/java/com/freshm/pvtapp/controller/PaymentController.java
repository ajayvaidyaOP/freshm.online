package com.freshm.pvtapp.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.freshm.pvtapp.dto.PaymentRequest;
import com.freshm.pvtapp.dto.PaymentResponse;
import com.freshm.pvtapp.service.PaymentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    /**
     * Save Payment
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PaymentResponse savePayment(
            @Valid @RequestBody PaymentRequest request
    ) {
        return paymentService.savePayment(request);
    }

    /**
     * Get All Payments
     */
    @GetMapping
    public List<PaymentResponse> getAllPayments() {
        return paymentService.getAllPayments();
    }

    /**
     * Get Payment By Id
     */
    @GetMapping("/{id}")
    public PaymentResponse getPaymentById(
            @PathVariable Long id
    ) {
        return paymentService.getPaymentById(id);
    }

    /**
     * Get Payments By Purchase
     */
    @GetMapping("/purchase/{purchaseId}")
    public List<PaymentResponse> getPaymentsByPurchase(
            @PathVariable Long purchaseId
    ) {
        return paymentService.getPaymentsByPurchase(purchaseId);
    }

    /**
     * Delete Payment
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePayment(
            @PathVariable Long id
    ) {
        paymentService.deletePayment(id);
    }
}