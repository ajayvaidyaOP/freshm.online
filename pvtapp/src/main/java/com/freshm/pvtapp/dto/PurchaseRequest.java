package com.freshm.pvtapp.dto;

import java.util.List;

public class PurchaseRequest {

    private Long vendorId;
    private Long farmerId;
    private List<PurchaseItemRequest> items;
    private String remarks;

    // Default Constructor
    public PurchaseRequest() {
    }

    // Parameterized Constructor
    public PurchaseRequest(Long vendorId, Long farmerId, List<PurchaseItemRequest> items, String remarks) {
        this.vendorId = vendorId;
        this.farmerId = farmerId;
        this.items = items;
        this.remarks = remarks;
    }

    // Getters and Setters

    public Long getVendorId() {
        return vendorId;
    }

    public void setVendorId(Long vendorId) {
        this.vendorId = vendorId;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public List<PurchaseItemRequest> getItems() {
        return items;
    }

    public void setItems(List<PurchaseItemRequest> items) {
        this.items = items;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    @Override
    public String toString() {
        return "PurchaseRequest{" +
                "vendorId=" + vendorId +
                ", farmerId=" + farmerId +
                ", items=" + items +
                ", remarks='" + remarks + '\'' +
                '}';
    }
}