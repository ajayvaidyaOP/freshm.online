package com.freshm.pvtapp.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

/**
 * Sort + pack: take sorted weight of a size grade and pack into fixed-size boxes.
 *   totalBoxes = floor(inputWeight / boxSize)
 * inputWeight is subtracted from the linked receipt's availableWeight (packedWeight).
 */
@Entity
@Table(name = "packing_entries")
public class PackingEntry extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "receipt_id")
    private MaterialReceipt receipt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(nullable = false, length = 30)
    private String packNumber;

    private LocalDate packDate;

    @Column(length = 60)
    private String sizeGrade;   // e.g. "150-250 gm"

    @Column(length = 60)
    private String destination; // e.g. "Dubai"

    private Double inputWeight = 0d;  // sorted weight to pack (without karat)
    private Double boxSize = 0d;      // kg per box, e.g. 1.6
    private Integer totalBoxes = 0;
    private Double leftoverWeight = 0d;

    @Column(length = 500)
    private String remarks;

    public PackingEntry() { }

    public void recompute() {
        double w = inputWeight != null ? inputWeight : 0d;
        double b = boxSize != null ? boxSize : 0d;
        if (b > 0) {
            this.totalBoxes = (int) Math.floor(w / b);
            this.leftoverWeight = round2(w - this.totalBoxes * b);
        } else {
            this.totalBoxes = 0;
            this.leftoverWeight = round2(w);
        }
    }

    private static double round2(double d) { return Math.round(d * 100.0) / 100.0; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Company getCompany() { return company; }
    public void setCompany(Company c) { this.company = c; }
    public MaterialReceipt getReceipt() { return receipt; }
    public void setReceipt(MaterialReceipt r) { this.receipt = r; }
    public Product getProduct() { return product; }
    public void setProduct(Product p) { this.product = p; }
    public String getPackNumber() { return packNumber; }
    public void setPackNumber(String v) { this.packNumber = v; }
    public LocalDate getPackDate() { return packDate; }
    public void setPackDate(LocalDate v) { this.packDate = v; }
    public String getSizeGrade() { return sizeGrade; }
    public void setSizeGrade(String v) { this.sizeGrade = v; }
    public String getDestination() { return destination; }
    public void setDestination(String v) { this.destination = v; }
    public Double getInputWeight() { return inputWeight; }
    public void setInputWeight(Double v) { this.inputWeight = v; }
    public Double getBoxSize() { return boxSize; }
    public void setBoxSize(Double v) { this.boxSize = v; }
    public Integer getTotalBoxes() { return totalBoxes; }
    public void setTotalBoxes(Integer v) { this.totalBoxes = v; }
    public Double getLeftoverWeight() { return leftoverWeight; }
    public void setLeftoverWeight(Double v) { this.leftoverWeight = v; }
    public String getRemarks() { return remarks; }
    public void setRemarks(String v) { this.remarks = v; }
}
