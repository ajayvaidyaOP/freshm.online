package com.freshm.pvtapp.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class MaterialReturnRequest {
    private Long receiptId;
    private LocalDate returnDate;
    private Double emptyCrateUnitWeight = 0d;
    private String remarks;
    private List<CrateLineDto> crateLines = new ArrayList<>();

    public Long getReceiptId() { return receiptId; }
    public void setReceiptId(Long v) { this.receiptId = v; }
    public LocalDate getReturnDate() { return returnDate; }
    public void setReturnDate(LocalDate v) { this.returnDate = v; }
    public Double getEmptyCrateUnitWeight() { return emptyCrateUnitWeight; }
    public void setEmptyCrateUnitWeight(Double v) { this.emptyCrateUnitWeight = v; }
    public String getRemarks() { return remarks; }
    public void setRemarks(String v) { this.remarks = v; }
    public List<CrateLineDto> getCrateLines() { return crateLines; }
    public void setCrateLines(List<CrateLineDto> v) { this.crateLines = v; }
}
