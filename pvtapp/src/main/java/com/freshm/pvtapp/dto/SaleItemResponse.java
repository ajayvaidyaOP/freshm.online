package com.freshm.pvtapp.dto;

public class SaleItemResponse {
    private Long id;
    private String description;
    private Double itemCount;
    private Double weightKg;
    private Double price;
    private Double amount;

    public Long getId() { return id; }
    public void setId(Long v) { this.id = v; }
    public String getDescription() { return description; }
    public void setDescription(String v) { this.description = v; }
    public Double getItemCount() { return itemCount; }
    public void setItemCount(Double v) { this.itemCount = v; }
    public Double getWeightKg() { return weightKg; }
    public void setWeightKg(Double v) { this.weightKg = v; }
    public Double getPrice() { return price; }
    public void setPrice(Double v) { this.price = v; }
    public Double getAmount() { return amount; }
    public void setAmount(Double v) { this.amount = v; }
}
