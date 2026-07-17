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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "purchases")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
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
    @Builder.Default
    private Double totalQuantity = 0.0;

    @Column(nullable = false)
    @Builder.Default
    private Double totalAmount = 0.0;

    @OneToMany(
            mappedBy = "purchase",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Builder.Default
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
}