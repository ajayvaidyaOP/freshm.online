package com.freshm.pvtapp.dto;

import java.time.LocalDate;

public class PaymentRequest {

    private Long purchaseId;

    private Double amount;

    private String paymentMode;

    private String transactionNumber;

    private LocalDate paymentDate;

    private String remarks;

    // Default Constructor
    public PaymentRequest() {
    }

    // Parameterized Constructor
    public PaymentRequest(Long purchaseId, Double amount, String paymentMode,
                          String transactionNumber, LocalDate paymentDate,
                          String remarks) {
        this.purchaseId = purchaseId;
        this.amount = amount;
        this.paymentMode = paymentMode;
        this.transactionNumber = transactionNumber;
        this.paymentDate = paymentDate;
        this.remarks = remarks;
    }

    public Long getPurchaseId() {
        return purchaseId;
    }

    public void setPurchaseId(Long purchaseId) {
        this.purchaseId = purchaseId;
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

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}