package com.freshm.pvtapp.dto;

import java.time.LocalDate;

public class PackingRequest {
    private Long receiptId;   // optional link (for stock)
    private Long productId;   // optional
    private LocalDate packDate;
    private String sizeGrade;
    private String destination;
    private Double inputWeight = 0d;
    private Double boxSize = 0d;
    private String remarks;

    public Long getReceiptId() { return receiptId; }
    public void setReceiptId(Long v) { this.receiptId = v; }
    public Long getProductId() { return productId; }
    public void setProductId(Long v) { this.productId = v; }
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
    public String getRemarks() { return remarks; }
    public void setRemarks(String v) { this.remarks = v; }
}
