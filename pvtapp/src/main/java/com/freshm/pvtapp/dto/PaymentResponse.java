package com.freshm.pvtapp.dto;

import java.time.LocalDate;

public class PaymentResponse {

    private Long id;
    private Double amount;
    private String paymentMode;
    private String transactionNumber;
    private LocalDate paymentDate;

    // No-Argument Constructor
    public PaymentResponse() {
    }

    // All-Argument Constructor
    public PaymentResponse(Long id, Double amount, String paymentMode,
                           String transactionNumber, LocalDate paymentDate) {
        this.id = id;
        this.amount = amount;
        this.paymentMode = paymentMode;
        this.transactionNumber = transactionNumber;
        this.paymentDate = paymentDate;
    }

    // Getters and Setters

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

    // Builder

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private Long id;
        private Double amount;
        private String paymentMode;
        private String transactionNumber;
        private LocalDate paymentDate;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder amount(Double amount) {
            this.amount = amount;
            return this;
        }

        public Builder paymentMode(String paymentMode) {
            this.paymentMode = paymentMode;
            return this;
        }

        public Builder transactionNumber(String transactionNumber) {
            this.transactionNumber = transactionNumber;
            return this;
        }

        public Builder paymentDate(LocalDate paymentDate) {
            this.paymentDate = paymentDate;
            return this;
        }

        public PaymentResponse build() {
            return new PaymentResponse(
                    id,
                    amount,
                    paymentMode,
                    transactionNumber,
                    paymentDate
            );
        }
    }
}