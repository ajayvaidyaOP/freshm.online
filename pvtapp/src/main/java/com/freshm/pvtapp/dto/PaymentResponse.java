package com.freshm.pvtapp.dto;

import java.time.LocalDate;

public class PaymentResponse {

    private Long id;

    private Double amount;

    private String paymentMode;

    private String transactionNumber;

    private LocalDate paymentDate;

    // Default Constructor
    public PaymentResponse() {
    }

    // Parameterized Constructor
    public PaymentResponse(Long id, Double amount, String paymentMode,
                           String transactionNumber, LocalDate paymentDate) {
        this.id = id;
        this.amount = amount;
        this.paymentMode = paymentMode;
        this.transactionNumber = transactionNumber;
        this.paymentDate = paymentDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getTransactionNumber() {
        return transactionNumber;
    }

    public void setTransactionNumber(String transactionNumber) {
        this.transactionNumber = transactionNumber;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }
}