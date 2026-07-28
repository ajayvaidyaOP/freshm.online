package com.freshm.pvtapp.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

/**
 * Sale = a sale invoice to a Buyer (e.g. GAURI TRADING COMPANY).
 * Mirrors Purchase but on the selling side, and carries the charge
 * lines that appear on the bill (Hamali, Commission, Transport Advance)
 * plus the letterhead name printed at the top of the invoice.
 */
@Entity
@Table(name = "sales")
public class Sale extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "buyer_id")
    private Buyer buyer;

    @Column(nullable = false, length = 30)
    private String saleNumber;

    private LocalDate saleDate;

    /** Name printed as the letterhead on the invoice (settable per bill). */
    private String letterHeadName;

    // charge lines from the bill
    private Double hamali = 0d;
    private Double commission = 0d;
    private Double transportAdvance = 0d;

    // computed totals
    private Double productTotal = 0d;
    private Double grandTotal = 0d;

    @Column(length = 500)
    private String amountInWords;

    @Column(length = 500)
    private String remarks;

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SaleItem> items = new ArrayList<>();

    public Sale() { }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final Sale s = new Sale();
        public Builder company(Company v) { s.company = v; return this; }
        public Builder buyer(Buyer v) { s.buyer = v; return this; }
        public Builder saleNumber(String v) { s.saleNumber = v; return this; }
        public Builder saleDate(LocalDate v) { s.saleDate = v; return this; }
        public Builder letterHeadName(String v) { s.letterHeadName = v; return this; }
        public Builder hamali(Double v) { s.hamali = v; return this; }
        public Builder commission(Double v) { s.commission = v; return this; }
        public Builder transportAdvance(Double v) { s.transportAdvance = v; return this; }
        public Builder productTotal(Double v) { s.productTotal = v; return this; }
        public Builder grandTotal(Double v) { s.grandTotal = v; return this; }
        public Builder amountInWords(String v) { s.amountInWords = v; return this; }
        public Builder remarks(String v) { s.remarks = v; return this; }
        public Sale build() { return s; }
    }

    public void addItem(SaleItem item) { item.setSale(this); this.items.add(item); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }
    public Buyer getBuyer() { return buyer; }
    public void setBuyer(Buyer buyer) { this.buyer = buyer; }
    public String getSaleNumber() { return saleNumber; }
    public void setSaleNumber(String v) { this.saleNumber = v; }
    public LocalDate getSaleDate() { return saleDate; }
    public void setSaleDate(LocalDate v) { this.saleDate = v; }
    public String getLetterHeadName() { return letterHeadName; }
    public void setLetterHeadName(String v) { this.letterHeadName = v; }
    public Double getHamali() { return hamali; }
    public void setHamali(Double v) { this.hamali = v; }
    public Double getCommission() { return commission; }
    public void setCommission(Double v) { this.commission = v; }
    public Double getTransportAdvance() { return transportAdvance; }
    public void setTransportAdvance(Double v) { this.transportAdvance = v; }
    public Double getProductTotal() { return productTotal; }
    public void setProductTotal(Double v) { this.productTotal = v; }
    public Double getGrandTotal() { return grandTotal; }
    public void setGrandTotal(Double v) { this.grandTotal = v; }
    public String getAmountInWords() { return amountInWords; }
    public void setAmountInWords(String v) { this.amountInWords = v; }
    public String getRemarks() { return remarks; }
    public void setRemarks(String v) { this.remarks = v; }
    public List<SaleItem> getItems() { return items; }
    public void setItems(List<SaleItem> items) { this.items = items; }
}
