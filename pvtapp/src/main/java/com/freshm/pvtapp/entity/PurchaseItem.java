package com.freshm.pvtapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "purchase_items")
public class PurchaseItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Parent Purchase
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purchase_id", nullable = false)
    private Purchase purchase;

    /**
     * Product Master
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Double quantity;

    @Column(nullable = false)
    private Double rate;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private Boolean usesCrates = false;

    @Column
    private Integer crateCount;

    @Column
    private Double crateGrossWeight;

    @Column
    private Double crateUnitTareWeight;

    @Column
    private Double crateTotalTareWeight;

    @Column(length = 500)
    private String remarks;

    // Default Constructor
    public PurchaseItem() {
    }

    // Parameterized Constructor
    public PurchaseItem(Long id, Purchase purchase, Product product,
                        Double quantity, Double rate, Double amount,
                        Boolean usesCrates, Integer crateCount,
                        Double crateGrossWeight, Double crateUnitTareWeight,
                        Double crateTotalTareWeight, String remarks) {

        this.id = id;
        this.purchase = purchase;
        this.product = product;
        this.quantity = quantity;
        this.rate = rate;
        this.amount = amount;
        this.usesCrates = usesCrates;
        this.crateCount = crateCount;
        this.crateGrossWeight = crateGrossWeight;
        this.crateUnitTareWeight = crateUnitTareWeight;
        this.crateTotalTareWeight = crateTotalTareWeight;
        this.remarks = remarks;
    }

    // Builder Method
    public static Builder builder() {
        return new Builder();
    }

    // Builder Class
    public static class Builder {

        private Long id;
        private Purchase purchase;
        private Product product;
        private Double quantity;
        private Double rate;
        private Double amount;
        private Boolean usesCrates = false;
        private Integer crateCount;
        private Double crateGrossWeight;
        private Double crateUnitTareWeight;
        private Double crateTotalTareWeight;
        private String remarks;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder purchase(Purchase purchase) {
            this.purchase = purchase;
            return this;
        }

        public Builder product(Product product) {
            this.product = product;
            return this;
        }

        public Builder quantity(Double quantity) {
            this.quantity = quantity;
            return this;
        }

        public Builder rate(Double rate) {
            this.rate = rate;
            return this;
        }

        public Builder amount(Double amount) {
            this.amount = amount;
            return this;
        }

        public Builder usesCrates(Boolean usesCrates) {
            this.usesCrates = usesCrates;
            return this;
        }

        public Builder crateCount(Integer crateCount) {
            this.crateCount = crateCount;
            return this;
        }

        public Builder crateGrossWeight(Double crateGrossWeight) {
            this.crateGrossWeight = crateGrossWeight;
            return this;
        }

        public Builder crateUnitTareWeight(Double crateUnitTareWeight) {
            this.crateUnitTareWeight = crateUnitTareWeight;
            return this;
        }

        public Builder crateTotalTareWeight(Double crateTotalTareWeight) {
            this.crateTotalTareWeight = crateTotalTareWeight;
            return this;
        }

        public Builder remarks(String remarks) {
            this.remarks = remarks;
            return this;
        }

        public PurchaseItem build() {
            PurchaseItem item = new PurchaseItem();
            item.setId(id);
            item.setPurchase(purchase);
            item.setProduct(product);
            item.setQuantity(quantity);
            item.setRate(rate);
            item.setAmount(amount);
            item.setUsesCrates(usesCrates);
            item.setCrateCount(crateCount);
            item.setCrateGrossWeight(crateGrossWeight);
            item.setCrateUnitTareWeight(crateUnitTareWeight);
            item.setCrateTotalTareWeight(crateTotalTareWeight);
            item.setRemarks(remarks);
            return item;
        }
    }

    // Getters and Setters

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

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    @Override
    public String toString() {
        return "PurchaseItem{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", rate=" + rate +
                ", amount=" + amount +
                ", usesCrates=" + usesCrates +
                ", crateCount=" + crateCount +
                ", crateGrossWeight=" + crateGrossWeight +
                ", crateUnitTareWeight=" + crateUnitTareWeight +
                ", crateTotalTareWeight=" + crateTotalTareWeight +
                ", remarks='" + remarks + '\'' +
                '}';
    }
}