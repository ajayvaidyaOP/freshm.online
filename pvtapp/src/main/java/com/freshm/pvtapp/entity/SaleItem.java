package com.freshm.pvtapp.entity;

import jakarta.persistence.*;

/**
 * One row on the sale bill:  Sr | Material Desc | Item | Weight | Price | Total Amount.
 * "Empty box" is just a normal line item (no weight).
 * amount = (weightKg > 0) ? weightKg * price : itemCount * price
 */
@Entity
@Table(name = "sale_items")
public class SaleItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sale_id", nullable = false)
    private Sale sale;

    // optional link to a catalogue article
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(nullable = false, length = 200)
    private String description;   // "Fresh Capsicum", "Empty box"

    private Double itemCount;     // the "Item" column (e.g. 385.00)
    private Double weightKg;      // the "Weight" column (e.g. 6930), null for boxes
    private Double price;         // rate
    private Double amount;        // computed total

    public SaleItem() { }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final SaleItem i = new SaleItem();
        public Builder sale(Sale v) { i.sale = v; return this; }
        public Builder product(Product v) { i.product = v; return this; }
        public Builder description(String v) { i.description = v; return this; }
        public Builder itemCount(Double v) { i.itemCount = v; return this; }
        public Builder weightKg(Double v) { i.weightKg = v; return this; }
        public Builder price(Double v) { i.price = v; return this; }
        public Builder amount(Double v) { i.amount = v; return this; }
        public SaleItem build() { return i; }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Sale getSale() { return sale; }
    public void setSale(Sale sale) { this.sale = sale; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
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
