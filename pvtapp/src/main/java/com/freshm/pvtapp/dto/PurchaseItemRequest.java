package com.freshm.pvtapp.dto;

import jakarta.validation.constraints.NotNull;

public class PurchaseItemRequest {

    @NotNull
    private Long productId;

    /**
     * Whether the weight for this item was captured via
     * crate-by-crate weighing (true) or entered directly (false).
     * Defaults to false if not sent.
     */
    private Boolean usesCrates = false;

    /**
     * Required when usesCrates = false.
     * The manually entered net weight.
     */
    private Double quantity;

    /**
     * Required when usesCrates = true.
     * Total number of crates weighed across all batches.
     */
    private Integer crateCount;

    /**
     * Required when usesCrates = true.
     * Sum of every machine weight reading entered
     * (gross weight, before tare deduction).
     */
    private Double crateGrossWeight;

    /**
     * Optional even when usesCrates = true.
     */
    private Double crateUnitTareWeight;

    @NotNull
    private Double rate;

    private String remarks;

    // Default Constructor
    public PurchaseItemRequest() {
    }

    // Parameterized Constructor
    public PurchaseItemRequest(Long productId, Boolean usesCrates, Double quantity,
                               Integer crateCount, Double crateGrossWeight,
                               Double crateUnitTareWeight, Double rate,
                               String remarks) {
        this.productId = productId;
        this.usesCrates = usesCrates;
        this.quantity = quantity;
        this.crateCount = crateCount;
        this.crateGrossWeight = crateGrossWeight;
        this.crateUnitTareWeight = crateUnitTareWeight;
        this.rate = rate;
        this.remarks = remarks;
    }

    // Getters and Setters

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Boolean getUsesCrates() {
        return usesCrates;
    }

    public void setUsesCrates(Boolean usesCrates) {
        this.usesCrates = usesCrates;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
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

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    @Override
    public String toString() {
        return "PurchaseItemRequest{" +
                "productId=" + productId +
                ", usesCrates=" + usesCrates +
                ", quantity=" + quantity +
                ", crateCount=" + crateCount +
                ", crateGrossWeight=" + crateGrossWeight +
                ", crateUnitTareWeight=" + crateUnitTareWeight +
                ", rate=" + rate +
                ", remarks='" + remarks + '\'' +
                '}';
    }
}	