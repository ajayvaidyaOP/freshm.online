package com.freshm.pvtapp.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

/**
 * User receives material by crate ("karat"). Each line = crates + machine weight.
 *   grossWeight        = sum of line weights (with crate)
 *   emptyCrateTotal    = totalCrates * emptyCrateUnitWeight
 *   netWeight          = grossWeight - emptyCrateTotal   (weight WITHOUT karat)
 *   availableWeight    = netWeight - returnedWeight - packedWeight   (live stock)
 */
@Entity
@Table(name = "material_receipts")
public class MaterialReceipt extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false, length = 30)
    private String receiptNumber;

    private LocalDate receiptDate;

    @ElementCollection
    @CollectionTable(name = "material_receipt_crates", joinColumns = @JoinColumn(name = "receipt_id"))
    private List<CrateLine> crateLines = new ArrayList<>();

    private Double totalCrates = 0d;
    private Double grossWeight = 0d;          // with karat
    private Double emptyCrateUnitWeight = 0d; // weight of one empty crate (often 0)
    private Double emptyCrateTotalWeight = 0d;
    private Double netWeight = 0d;            // without karat
    private Double returnedWeight = 0d;
    private Double packedWeight = 0d;
    private Double availableWeight = 0d;

    @Column(length = 500)
    private String remarks;

    public MaterialReceipt() { }

    /** Recompute totals from the crate lines and current empty-crate weight. */
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
        this.emptyCrateTotalWeight = round2(crates * unit);
        this.netWeight = round2(gross - this.emptyCrateTotalWeight);
        recomputeAvailable();
    }

    public void recomputeAvailable() {
        double ret = returnedWeight != null ? returnedWeight : 0d;
        double pac = packedWeight != null ? packedWeight : 0d;
        double net = netWeight != null ? netWeight : 0d;
        this.availableWeight = round2(net - ret - pac);
    }

    private static double round2(double d) { return Math.round(d * 100.0) / 100.0; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Company getCompany() { return company; }
    public void setCompany(Company c) { this.company = c; }
    public Product getProduct() { return product; }
    public void setProduct(Product p) { this.product = p; }
    public String getReceiptNumber() { return receiptNumber; }
    public void setReceiptNumber(String v) { this.receiptNumber = v; }
    public LocalDate getReceiptDate() { return receiptDate; }
    public void setReceiptDate(LocalDate v) { this.receiptDate = v; }
    public List<CrateLine> getCrateLines() { return crateLines; }
    public void setCrateLines(List<CrateLine> v) { this.crateLines = v; }
    public Double getTotalCrates() { return totalCrates; }
    public void setTotalCrates(Double v) { this.totalCrates = v; }
    public Double getGrossWeight() { return grossWeight; }
    public void setGrossWeight(Double v) { this.grossWeight = v; }
    public Double getEmptyCrateUnitWeight() { return emptyCrateUnitWeight; }
    public void setEmptyCrateUnitWeight(Double v) { this.emptyCrateUnitWeight = v; }
    public Double getEmptyCrateTotalWeight() { return emptyCrateTotalWeight; }
    public void setEmptyCrateTotalWeight(Double v) { this.emptyCrateTotalWeight = v; }
    public Double getNetWeight() { return netWeight; }
    public void setNetWeight(Double v) { this.netWeight = v; }
    public Double getReturnedWeight() { return returnedWeight; }
    public void setReturnedWeight(Double v) { this.returnedWeight = v; }
    public Double getPackedWeight() { return packedWeight; }
    public void setPackedWeight(Double v) { this.packedWeight = v; }
    public Double getAvailableWeight() { return availableWeight; }
    public void setAvailableWeight(Double v) { this.availableWeight = v; }
    public String getRemarks() { return remarks; }
    public void setRemarks(String v) { this.remarks = v; }
}
