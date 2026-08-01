package com.freshm.pvtapp.dto;

import java.time.LocalDate;

public class PackingResponse {
    private Long id;
    private String packNumber;
    private LocalDate packDate;
    private Long receiptId;
    private String productName;
    private String sizeGrade;
    private String destination;
    private Double inputWeight;
    private Double boxSize;
    private Integer totalBoxes;
    private Double leftoverWeight;
    private String remarks;

    public Long getId() { return id; }
    public void setId(Long v) { this.id = v; }
    public String getPackNumber() { return packNumber; }
    public void setPackNumber(String v) { this.packNumber = v; }
    public LocalDate getPackDate() { return packDate; }
    public void setPackDate(LocalDate v) { this.packDate = v; }
    public Long getReceiptId() { return receiptId; }
    public void setReceiptId(Long v) { this.receiptId = v; }
    public String getProductName() { return productName; }
    public void setProductName(String v) { this.productName = v; }
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
