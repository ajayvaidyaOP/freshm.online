package com.freshm.pvtapp.dto;

import java.time.LocalDate;
import java.util.List;

public class PurchaseResponse {

    private Long id;
    private String purchaseNumber;
    private LocalDate purchaseDate;
    private String vendorName;
    private String farmerName;
    private Double totalQuantity;
    private Double totalAmount;
    private String paymentStatus;
    private List<PurchaseItemResponse> items;

    // Default Constructor
    public PurchaseResponse() {
    }

    // Parameterized Constructor
    public PurchaseResponse(Long id, String purchaseNumber, LocalDate purchaseDate,
                            String vendorName, String farmerName,
                            Double totalQuantity, Double totalAmount,
                            String paymentStatus,
                            List<PurchaseItemResponse> items) {
        this.id = id;
        this.purchaseNumber = purchaseNumber;
        this.purchaseDate = purchaseDate;
        this.vendorName = vendorName;
        this.farmerName = farmerName;
        this.totalQuantity = totalQuantity;
        this.totalAmount = totalAmount;
        this.paymentStatus = paymentStatus;
        this.items = items;
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

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getFarmerName() {
        return farmerName;
    }

    public void setFarmerName(String farmerName) {
        this.farmerName = farmerName;
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

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public List<PurchaseItemResponse> getItems() {
        return items;
    }

    public void setItems(List<PurchaseItemResponse> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "PurchaseResponse{" +
                "id=" + id +
                ", purchaseNumber='" + purchaseNumber + '\'' +
                ", purchaseDate=" + purchaseDate +
                ", vendorName='" + vendorName + '\'' +
                ", farmerName='" + farmerName + '\'' +
                ", totalQuantity=" + totalQuantity +
                ", totalAmount=" + totalAmount +
                ", paymentStatus='" + paymentStatus + '\'' +
                ", items=" + items +
                '}';
    }
}