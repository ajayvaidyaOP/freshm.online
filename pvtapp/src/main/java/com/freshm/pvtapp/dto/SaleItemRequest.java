package com.freshm.pvtapp.dto;

public class SaleItemRequest {
    private Long productId;      // optional
    private String description;  // required
    private Double itemCount;
    private Double weightKg;
    private Double price;

    public Long getProductId() { return productId; }
    public void setProductId(Long v) { this.productId = v; }
    public String getDescription() { return description; }
    public void setDescription(String v) { this.description = v; }
    public Double getItemCount() { return itemCount; }
    public void setItemCount(Double v) { this.itemCount = v; }
    public Double getWeightKg() { return weightKg; }
    public void setWeightKg(Double v) { this.weightKg = v; }
    public Double getPrice() { return price; }
    public void setPrice(Double v) { this.price = v; }
}
