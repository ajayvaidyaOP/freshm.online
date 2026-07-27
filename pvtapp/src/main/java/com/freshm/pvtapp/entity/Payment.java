package com.freshm.pvtapp.entity;

import java.time.LocalDate;

import com.freshm.pvtapp.enums.PaymentMode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "payments")
public class Payment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Purchase Reference
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "purchase_id",
            nullable = false
    )
    private Purchase purchase;

    /**
     * Company Isolation
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "company_id",
            nullable = false
    )
    private Company company;

    /**
     * Payment Amount
     */
    @Column(nullable = false)
    private Double amount;

    /**
     * Cash / UPI / Net Banking
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMode paymentMode;

    /**
     * UPI Transaction ID
     * Bank Reference Number
     */
    private String transactionNumber;

    /**
     * Payment Date
     */
    @Column(nullable = false)
    private LocalDate paymentDate;

    /**
     * Extra Notes
     */
    @Column(length = 500)
    private String remarks;

    // Default Constructor
    public Payment() {
    }

    // Parameterized Constructor
    public Payment(Long id, Purchase purchase, Company company, Double amount,
                   PaymentMode paymentMode, String transactionNumber,
                   LocalDate paymentDate, String remarks) {
        this.id = id;
        this.purchase = purchase;
        this.company = company;
        this.amount = amount;
        this.paymentMode = paymentMode;
        this.transactionNumber = transactionNumber;
        this.paymentDate = paymentDate;
        this.remarks = remarks;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Purchase getPurchase() {
        return purchase;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public PaymentMode getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(PaymentMode paymentMode) {
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