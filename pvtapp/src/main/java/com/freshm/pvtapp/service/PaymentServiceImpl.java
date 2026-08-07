package com.freshm.pvtapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.freshm.pvtapp.dto.PaymentRequest;
import com.freshm.pvtapp.dto.PaymentResponse;
import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.entity.Payment;
import com.freshm.pvtapp.entity.Purchase;
import com.freshm.pvtapp.enums.PaymentMode;
import com.freshm.pvtapp.enums.PaymentStatus;
import com.freshm.pvtapp.exception.ResourceNotFoundException;
import com.freshm.pvtapp.repository.PaymentRepository;
import com.freshm.pvtapp.repository.PurchaseRepository;
import com.freshm.pvtapp.security.SecurityUtil;

import jakarta.transaction.Transactional;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final PurchaseRepository purchaseRepository;
    private final SecurityUtil securityUtil;

    public PaymentServiceImpl(
            PaymentRepository paymentRepository,
            PurchaseRepository purchaseRepository,
            SecurityUtil securityUtil
    ) {
        this.paymentRepository = paymentRepository;
        this.purchaseRepository = purchaseRepository;
        this.securityUtil = securityUtil;
    }

    @Override
    @Transactional
    public PaymentResponse savePayment(PaymentRequest request) {

        Company company = securityUtil.getCurrentCompany();

        Purchase purchase =
                purchaseRepository
                        .findByIdAndCompanyId(
                                request.getPurchaseId(),
                                company.getId()
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Purchase not found"
                                )
                        );

        Payment payment = Payment.builder()
                .purchase(purchase)
                .company(company)
                .amount(request.getAmount())
                .paymentMode(
                        PaymentMode.valueOf(
                                request.getPaymentMode()
                        )
                )
                .transactionNumber(
                        request.getTransactionNumber()
                )
                .paymentDate(
                        request.getPaymentDate()
                )
                .remarks(
                        request.getRemarks()
                )
                .build();
                        Payment saved = paymentRepository.save(payment);

        // Update the purchase's payment status from the sum of its payments.
        double totalPaid = paymentRepository
                .findAllByPurchaseId(purchase.getId())
                .stream()
                .mapToDouble(p -> p.getAmount() != null ? p.getAmount() : 0d)
                .sum();
        double due = purchase.getTotalAmount() != null ? purchase.getTotalAmount() : 0d;
        if (due > 0 && totalPaid >= due) {
            purchase.setPaymentStatus(PaymentStatus.PAID);
        } else if (totalPaid > 0) {
            purchase.setPaymentStatus(PaymentStatus.PARTIAL);
        } else {
            purchase.setPaymentStatus(PaymentStatus.UNPAID);
        }
        purchaseRepository.save(purchase);

        PaymentResponse response = new PaymentResponse();

        response.setId(saved.getId());
        response.setAmount(saved.getAmount());
        response.setPaymentMode(saved.getPaymentMode().name());
        response.setTransactionNumber(saved.getTransactionNumber());
        response.setPaymentDate(saved.getPaymentDate());
        // response.setRemarks(saved.getRemarks());

        return response;
    }

    @Override
    public List<PaymentResponse> getAllPayments() {

        Company company = securityUtil.getCurrentCompany();

        return paymentRepository
                .findAllByCompanyId(company.getId())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public List<PaymentResponse> getPaymentsByPurchase(Long purchaseId) {

        return paymentRepository
                .findAllByPurchaseId(purchaseId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public PaymentResponse getPaymentById(Long id) {

        Payment payment = paymentRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment not found"));

        return convertToResponse(payment);
    }

    @Override
    public void deletePayment(Long id) {

        paymentRepository.deleteById(id);
    }

    private PaymentResponse convertToResponse(Payment payment) {

        PaymentResponse response = new PaymentResponse();

        response.setId(payment.getId());
        response.setAmount(payment.getAmount());
        response.setPaymentMode(payment.getPaymentMode().name());
        response.setTransactionNumber(payment.getTransactionNumber());
        response.setPaymentDate(payment.getPaymentDate());
        // response.setRemarks(payment.getRemarks());

        return response;
    }
}