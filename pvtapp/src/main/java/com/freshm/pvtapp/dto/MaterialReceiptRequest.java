package com.freshm.pvtapp.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class MaterialReceiptRequest {
    private Long productId;
    private LocalDate receiptDate;
    private Double emptyCrateUnitWeight = 0d;
    private String remarks;
    private List<CrateLineDto> crateLines = new ArrayList<>();

    public Long getProductId() { return productId; }
    public void setProductId(Long v) { this.productId = v; }
    public LocalDate getReceiptDate() { return receiptDate; }
    public void setReceiptDate(LocalDate v) { this.receiptDate = v; }
    public Double getEmptyCrateUnitWeight() { return emptyCrateUnitWeight; }
    public void setEmptyCrateUnitWeight(Double v) { this.emptyCrateUnitWeight = v; }
    public String getRemarks() { return remarks; }
    public void setRemarks(String v) { this.remarks = v; }
    public List<CrateLineDto> getCrateLines() { return crateLines; }
    public void setCrateLines(List<CrateLineDto> v) { this.crateLines = v; }
}
