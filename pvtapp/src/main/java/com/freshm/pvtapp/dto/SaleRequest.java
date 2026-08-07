package com.freshm.pvtapp.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class SaleRequest {
    private Long buyerId;
    private LocalDate saleDate;
    private String letterHeadName;
    private Double hamali = 0d;
    private Double commission = 0d;
    private Double transportAdvance = 0d;
    private String remarks;
    private String transporterName;
    private String transporterContact;
    private String vehicleNumber;
    private List<SaleItemRequest> items = new ArrayList<>();

    public Long getBuyerId() { return buyerId; }
    public void setBuyerId(Long v) { this.buyerId = v; }
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
    public String getRemarks() { return remarks; }
    public void setRemarks(String v) { this.remarks = v; }
    public List<SaleItemRequest> getItems() { return items; }
    public void setItems(List<SaleItemRequest> v) { this.items = v; }

    public String getTransporterName() { return transporterName; }
    public void setTransporterName(String v) { this.transporterName = v; }
    public String getTransporterContact() { return transporterContact; }
    public void setTransporterContact(String v) { this.transporterContact = v; }
    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String v) { this.vehicleNumber = v; }
}
