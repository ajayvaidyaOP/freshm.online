package com.freshm.pvtapp.entity;

import java.time.LocalDate;

import com.freshm.pvtapp.enums.PaymentMode;

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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    /**
     * Purchase Reference
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "purchase_id",
            nullable = false
    )
    private Purchase purchase;


    /**
     * Company Isolation
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "company_id",
            nullable = false
    )
    private Company company;


    /**
     * Payment Amount
     */
    @Column(nullable = false)
    private Double amount;


    /**
     * Cash / UPI / Net Banking
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMode paymentMode;


    /**
     * UPI Transaction ID
     * Bank Reference Number
     */
    private String transactionNumber;


    /**
     * Payment Date
     */
    @Column(nullable = false)
    private LocalDate paymentDate;


    /**
     * Extra Notes
     */
    @Column(length = 500)
    private String remarks;

}