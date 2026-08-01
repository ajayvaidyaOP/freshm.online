package com.freshm.pvtapp.dto;

import java.time.LocalDate;
import java.util.List;

public class MaterialReturnResponse {
    private Long id;
    private String returnNumber;
    private LocalDate returnDate;
    private Long receiptId;
    private String receiptNumber;
    private String productName;
    private Double totalCrates;
    private Double grossWeight;
    private Double emptyCrateUnitWeight;
    private Double netWeight;
    private String remarks;
    private List<CrateLineDto> crateLines;

    public Long getId() { return id; }
    public void setId(Long v) { this.id = v; }
    public String getReturnNumber() { return returnNumber; }
    public void setReturnNumber(String v) { this.returnNumber = v; }
    public LocalDate getReturnDate() { return returnDate; }
    public void setReturnDate(LocalDate v) { this.returnDate = v; }
    public Long getReceiptId() { return receiptId; }
    public void setReceiptId(Long v) { this.receiptId = v; }
    public String getReceiptNumber() { return receiptNumber; }
    public void setReceiptNumber(String v) { this.receiptNumber = v; }
    public String getProductName() { return productName; }
    public void setProductName(String v) { this.productName = v; }
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
    public List<CrateLineDto> getCrateLines() { return crateLines; }
    public void setCrateLines(List<CrateLineDto> v) { this.crateLines = v; }
}
