package com.freshm.pvtapp.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

/**
 * Rejected/returned goods, weighed again by crate. Its netWeight is subtracted
 * from the linked receipt's availableWeight.
 */
@Entity
@Table(name = "material_returns")
public class MaterialReturn extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "receipt_id", nullable = false)
    private MaterialReceipt receipt;

    @Column(nullable = false, length = 30)
    private String returnNumber;

    private LocalDate returnDate;

    @ElementCollection
    @CollectionTable(name = "material_return_crates", joinColumns = @JoinColumn(name = "return_id"))
    private List<CrateLine> crateLines = new ArrayList<>();

    private Double totalCrates = 0d;
    private Double grossWeight = 0d;
    private Double emptyCrateUnitWeight = 0d;
    private Double netWeight = 0d;   // amount subtracted from the receipt

    @Column(length = 500)
    private String remarks;

    public MaterialReturn() { }

    public void recompute() {
        double crates = 0d, gross = 0d;
        if (crateLines != null) {
            for (CrateLine l : crateLines) {
                crates += l.getCrateCount() != null ? l.getCrateCount() : 0d;
                gross += l.getGrossWeight() != null ? l.getGrossWeight() : 0d;
            }
        }
        this.totalCrates = round2(crates);
        this.grossWeight = round2(gross);
        double unit = emptyCrateUnitWeight != null ? emptyCrateUnitWeight : 0d;
        this.netWeight = round2(gross - crates * unit);
    }

    private static double round2(double d) { return Math.round(d * 100.0) / 100.0; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Company getCompany() { return company; }
    public void setCompany(Company c) { this.company = c; }
    public MaterialReceipt getReceipt() { return receipt; }
    public void setReceipt(MaterialReceipt r) { this.receipt = r; }
    public String getReturnNumber() { return returnNumber; }
    public void setReturnNumber(String v) { this.returnNumber = v; }
    public LocalDate getReturnDate() { return returnDate; }
    public void setReturnDate(LocalDate v) { this.returnDate = v; }
    public List<CrateLine> getCrateLines() { return crateLines; }
    public void setCrateLines(List<CrateLine> v) { this.crateLines = v; }
    public Double getTotalCrates() { return totalCrates; }
    public void setTotalCrates(Double v) { this.totalCrates = v; }
    public Double getGrossWeight() { return grossWeight; }
    public void setGrossWeight(Double v) { this.grossWeight = v; }
    public Double getEmptyCrateUnitWeight() { return emptyCrateUnitWeight; }
    public void setEmptyCrateUnitWeight(Double v) { this.emptyCrateUnitWeight = v; }
    public Double getNetWeight() { return netWeight; }
    public void setNetWeight(Double v) { this.netWeight = v; }
    public String getRemarks() { return remarks; }
    public void setRemarks(String v) { this.remarks = v; }
}
