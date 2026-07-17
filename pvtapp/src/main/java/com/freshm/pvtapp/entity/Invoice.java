package com.freshm.pvtapp.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "invoices",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "invoice_number")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    /**
     * Example:
     * ABC-INV-2026-000001
     */
    @Column(nullable = false, length = 50)
    private String invoiceNumber;


    /**
     * Purchase Reference
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "purchase_id",
            nullable = false,
            unique = true
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
     * Generated PDF location
     *
     * Development:
     * uploads/invoices/ABC-INV-2026-000001.pdf
     *
     * Future:
     * Wasabi object key
     */
    @Column(length = 1000)
    private String pdfPath;


    /**
     * Invoice generated time
     */
    private LocalDateTime generatedAt;


    /**
     * Number of downloads
     */
    @Builder.Default
    private Integer downloadCount = 0;


    @PrePersist
    public void generateDate(){

        if(generatedAt == null){
            generatedAt = LocalDateTime.now();
        }

    }
}
