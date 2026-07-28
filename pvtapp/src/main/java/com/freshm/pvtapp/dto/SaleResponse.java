package com.freshm.pvtapp.dto;

import java.time.LocalDate;
import java.util.List;

public class SaleResponse {
    private Long id;
    private String saleNumber;
    private LocalDate saleDate;
    private Long buyerId;
    private String buyerName;
    private String buyerMobile;
    private String buyerAddress;
    private String letterHeadName;
    private Double hamali;
    private Double commission;
    private Double transportAdvance;
    private Double productTotal;
    private Double grandTotal;
    private String amountInWords;
    private String remarks;
    private List<SaleItemResponse> items;

    public Long getId() { return id; }
    public void setId(Long v) { this.id = v; }
    public String getSaleNumber() { return saleNumber; }
    public void setSaleNumber(String v) { this.saleNumber = v; }
    public LocalDate getSaleDate() { return saleDate; }
    public void setSaleDate(LocalDate v) { this.saleDate = v; }
    public Long getBuyerId() { return buyerId; }
    public void setBuyerId(Long v) { this.buyerId = v; }
    public String getBuyerName() { return buyerName; }
    public void setBuyerName(String v) { this.buyerName = v; }
    public String getBuyerMobile() { return buyerMobile; }
    public void setBuyerMobile(String v) { this.buyerMobile = v; }
    public String getBuyerAddress() { return buyerAddress; }
    public void setBuyerAddress(String v) { this.buyerAddress = v; }
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
    public List<SaleItemResponse> getItems() { return items; }
    public void setItems(List<SaleItemResponse> v) { this.items = v; }
}
