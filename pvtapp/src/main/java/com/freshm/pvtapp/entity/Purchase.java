package com.freshm.pvtapp.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.freshm.pvtapp.enums.PaymentMode;
import com.freshm.pvtapp.enums.PaymentStatus;

import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "purchases")
public class Purchase extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Example:
     * ABC-PUR-2026-000001
     */
    @Column(nullable = false, unique = true)
    private String purchaseNumber;

    @Column(nullable = false)
    private LocalDate purchaseDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = true)
    private Vendor vendor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = true)
    private Farmer farmer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(length = 500)
    private String remarks;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus;

    @Enumerated(EnumType.STRING)
    private PaymentMode paymentMode;

    @Column(nullable = false)
    private Double totalQuantity = 0.0;

    @Column(nullable = false)
    private Double totalAmount = 0.0;

    @OneToMany(
            mappedBy = "purchase",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<PurchaseItem> items = new ArrayList<>();

    @OneToMany(
            mappedBy = "purchase",
            cascade = CascadeType.ALL
    )
    private List<Payment> payments = new ArrayList<>();

    @OneToOne(
            mappedBy = "purchase",
            cascade = CascadeType.ALL
    )
    private Invoice invoice;

    // Default Constructor
    public Purchase() {
    }

    // Parameterized Constructor
    public Purchase(Long id, String purchaseNumber, LocalDate purchaseDate,
                    Vendor vendor, Farmer farmer, Company company,
                    String remarks, PaymentStatus paymentStatus,
                    PaymentMode paymentMode, Double totalQuantity,
                    Double totalAmount, List<PurchaseItem> items,
                    List<Payment> payments, Invoice invoice) {

        this.id = id;
        this.purchaseNumber = purchaseNumber;
        this.purchaseDate = purchaseDate;
        this.vendor = vendor;
        this.farmer = farmer;
        this.company = company;
        this.remarks = remarks;
        this.paymentStatus = paymentStatus;
        this.paymentMode = paymentMode;
        this.totalQuantity = totalQuantity;
        this.totalAmount = totalAmount;
        this.items = items;
        this.payments = payments;
        this.invoice = invoice;
    }
    
    public static Builder builder() {
        return new Builder();
    }
    
    public static class Builder {
    	
        private Long id;
        private String purchaseNumber;
        private LocalDate purchaseDate;
        private Vendor vendor;
        private Farmer farmer;
        private Company company;
        private String remarks;
        private PaymentStatus paymentStatus;
        private PaymentMode paymentMode;
        private Double totalQuantity = 0.0;
        private Double totalAmount = 0.0;
        private List<PurchaseItem> items = new ArrayList<>();
        private List<Payment> payments = new ArrayList<>();
        private Invoice invoice;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder purchaseNumber(String purchaseNumber) {
            this.purchaseNumber = purchaseNumber;
            return this;
        }

        public Builder purchaseDate(LocalDate purchaseDate) {
            this.purchaseDate = purchaseDate;
            return this;
        }

        public Builder vendor(Vendor vendor) {
            this.vendor = vendor;
            return this;
        }

        public Builder farmer(Farmer farmer) {
            this.farmer = farmer;
            return this;
        }

        public Builder company(Company company) {
            this.company = company;
            return this;
        }

        public Builder remarks(String remarks) {
            this.remarks = remarks;
            return this;
        }

        public Builder paymentStatus(PaymentStatus paymentStatus) {
            this.paymentStatus = paymentStatus;
            return this;
        }

        public Builder paymentMode(PaymentMode paymentMode) {
            this.paymentMode = paymentMode;
            return this;
        }

        public Builder totalQuantity(Double totalQuantity) {
            this.totalQuantity = totalQuantity;
            return this;
        }

        public Builder totalAmount(Double totalAmount) {
            this.totalAmount = totalAmount;
            return this;
        }

        public Builder items(List<PurchaseItem> items) {
            this.items = items;
            return this;
        }

        public Builder payments(List<Payment> payments) {
            this.payments = payments;
            return this;
        }

        public Builder invoice(Invoice invoice) {
            this.invoice = invoice;
            return this;
        }

        public Purchase build() {
            Purchase purchase = new Purchase();
            purchase.setId(id);
            purchase.setPurchaseNumber(purchaseNumber);
            purchase.setPurchaseDate(purchaseDate);
            purchase.setVendor(vendor);
            purchase.setFarmer(farmer);
            purchase.setCompany(company);
            purchase.setRemarks(remarks);
            purchase.setPaymentStatus(paymentStatus);
            purchase.setPaymentMode(paymentMode);
            purchase.setTotalQuantity(totalQuantity);
            purchase.setTotalAmount(totalAmount);
            purchase.setItems(items);
            purchase.setPayments(payments);
            purchase.setInvoice(invoice);
            return purchase;
        }
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPurchaseNumber() {
        return purchaseNumber;
    }

    public void setPurchaseNumber(String purchaseNumber) {
        this.purchaseNumber = purchaseNumber;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public Vendor getVendor() {
        return vendor;
    }

    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public Farmer getFarmer() {
        return farmer;
    }

    public void setFarmer(Farmer farmer) {
        this.farmer = farmer;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public PaymentMode getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(PaymentMode paymentMode) {
        this.paymentMode = paymentMode;
    }

    public Double getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Double totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<PurchaseItem> getItems() {
        return items;
    }

    public void setItems(List<PurchaseItem> items) {
        this.items = items;
    }

    public List<Payment> getPayments() {
        return payments;
    }

    public void setPayments(List<Payment> payments) {
        this.payments = payments;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }

    @Override
    public String toString() {
        return "Purchase{" +
                "id=" + id +
                ", purchaseNumber='" + purchaseNumber + '\'' +
                ", purchaseDate=" + purchaseDate +
                ", remarks='" + remarks + '\'' +
                ", paymentStatus=" + paymentStatus +
                ", paymentMode=" + paymentMode +
                ", totalQuantity=" + totalQuantity +
                ", totalAmount=" + totalAmount +
                '}';
    }
}