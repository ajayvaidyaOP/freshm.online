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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "purchase_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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


    /**
     * Received Quantity
     *
     * Example:
     * 2000 KG
     */
    @Column(nullable = false)
    private Double quantity;


    /**
     * Rate per KG
     *
     * Example:
     * ₹45
     */
    @Column(nullable = false)
    private Double rate;


    /**
     * quantity * rate
     *
     * Automatically calculated
     */
    @Column(nullable = false)
    private Double amount;


    /**
     * Optional remarks
     */
    @Column(length = 500)
    private String remarks;


}
