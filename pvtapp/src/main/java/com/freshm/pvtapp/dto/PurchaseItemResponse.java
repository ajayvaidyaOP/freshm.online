package com.freshm.pvtapp.dto;

public class PurchaseItemResponse {

    private String productName;

    /**
     * Final net quantity used for pricing.
     */
    private Double quantity;

    private Double rate;

    private Double amount;

    // ---- crate weighing breakdown ----

    private Boolean usesCrates;

    private Integer crateCount;

    private Double crateGrossWeight;

    private Double crateUnitTareWeight;

    private Double crateTotalTareWeight;

    // Default Constructor
    public PurchaseItemResponse() {
    }

    // Parameterized Constructor
    public PurchaseItemResponse(String productName, Double quantity,
                                Double rate, Double amount,
                                Boolean usesCrates, Integer crateCount,
                                Double crateGrossWeight,
                                Double crateUnitTareWeight,
                                Double crateTotalTareWeight) {
        this.productName = productName;
        this.quantity = quantity;
        this.rate = rate;
        this.amount = amount;
        this.usesCrates = usesCrates;
        this.crateCount = crateCount;
        this.crateGrossWeight = crateGrossWeight;
        this.crateUnitTareWeight = crateUnitTareWeight;
        this.crateTotalTareWeight = crateTotalTareWeight;
    }

    // Getters and Setters

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Boolean getUsesCrates() {
        return usesCrates;
    }

    public void setUsesCrates(Boolean usesCrates) {
        this.usesCrates = usesCrates;
    }

    public Integer getCrateCount() {
        return crateCount;
    }

    public void setCrateCount(Integer crateCount) {
        this.crateCount = crateCount;
    }

    public Double getCrateGrossWeight() {
        return crateGrossWeight;
    }

    public void setCrateGrossWeight(Double crateGrossWeight) {
        this.crateGrossWeight = crateGrossWeight;
    }

    public Double getCrateUnitTareWeight() {
        return crateUnitTareWeight;
    }

    public void setCrateUnitTareWeight(Double crateUnitTareWeight) {
        this.crateUnitTareWeight = crateUnitTareWeight;
    }

    public Double getCrateTotalTareWeight() {
        return crateTotalTareWeight;
    }

    public void setCrateTotalTareWeight(Double crateTotalTareWeight) {
        this.crateTotalTareWeight = crateTotalTareWeight;
    }

    @Override
    public String toString() {
        return "PurchaseItemResponse{" +
                "productName='" + productName + '\'' +
                ", quantity=" + quantity +
                ", rate=" + rate +
                ", amount=" + amount +
                ", usesCrates=" + usesCrates +
                ", crateCount=" + crateCount +
                ", crateGrossWeight=" + crateGrossWeight +
                ", crateUnitTareWeight=" + crateUnitTareWeight +
                ", crateTotalTareWeight=" + crateTotalTareWeight +
                '}';
    }
}