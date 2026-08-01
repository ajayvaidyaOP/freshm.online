package com.freshm.pvtapp.dto;

import java.time.LocalDate;
import java.util.List;

public class MaterialReceiptResponse {
    private Long id;
    private String receiptNumber;
    private LocalDate receiptDate;
    private Long productId;
    private String productName;
    private String articleName;
    private Double totalCrates;
    private Double grossWeight;
    private Double emptyCrateUnitWeight;
    private Double emptyCrateTotalWeight;
    private Double netWeight;
    private Double returnedWeight;
    private Double packedWeight;
    private Double availableWeight;
    private String remarks;
    private List<CrateLineDto> crateLines;

    public Long getId() { return id; }
    public void setId(Long v) { this.id = v; }
    public String getReceiptNumber() { return receiptNumber; }
    public void setReceiptNumber(String v) { this.receiptNumber = v; }
    public LocalDate getReceiptDate() { return receiptDate; }
    public void setReceiptDate(LocalDate v) { this.receiptDate = v; }
    public Long getProductId() { return productId; }
    public void setProductId(Long v) { this.productId = v; }
    public String getProductName() { return productName; }
    public void setProductName(String v) { this.productName = v; }
    public String getArticleName() { return articleName; }
    public void setArticleName(String v) { this.articleName = v; }
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
    public List<CrateLineDto> getCrateLines() { return crateLines; }
    public void setCrateLines(List<CrateLineDto> v) { this.crateLines = v; }
}
