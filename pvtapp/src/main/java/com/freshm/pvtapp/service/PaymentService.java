package com.freshm.pvtapp.service;

import java.util.List;

import com.freshm.pvtapp.dto.PaymentRequest;
import com.freshm.pvtapp.dto.PaymentResponse;

public interface PaymentService {

    PaymentResponse savePayment(PaymentRequest request);

    List<PaymentResponse> getAllPayments();

    PaymentResponse getPaymentById(Long id);

    List<PaymentResponse> getPaymentsByPurchase(Long purchaseId);

    void deletePayment(Long id);
}