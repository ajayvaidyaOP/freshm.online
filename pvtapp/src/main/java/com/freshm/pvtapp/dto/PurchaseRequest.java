// Source code is decompiled from a .class file using FernFlower decompiler (from Intellij IDEA).
package com.freshm.pvtapp.dto;

import java.util.List;

public class PurchaseRequest {
   private Long vendorId;
   private Long farmerId;
   private List<PurchaseItemRequest> items;
   private String remarks;
   private Double hamali;
   private Double commission;
   private Double transportAdvance;

   public PurchaseRequest() {
   }

   public PurchaseRequest(Long vendorId, Long farmerId, List<PurchaseItemRequest> items, String remarks, Double hamali, Double commission, Double transportAdvance) {
      this.vendorId = vendorId;
      this.farmerId = farmerId;
      this.items = items;
      this.remarks = remarks;
      this.hamali = hamali;
      this.commission = commission;
      this.transportAdvance = transportAdvance;
   }

   public Long getVendorId() {
      return this.vendorId;
   }

   public void setVendorId(Long vendorId) {
      this.vendorId = vendorId;
   }

   public Long getFarmerId() {
      return this.farmerId;
   }

   public void setFarmerId(Long farmerId) {
      this.farmerId = farmerId;
   }

   public List<PurchaseItemRequest> getItems() {
      return this.items;
   }

   public void setItems(List<PurchaseItemRequest> items) {
      this.items = items;
   }

   public String getRemarks() {
      return this.remarks;
   }

   public void setRemarks(String remarks) {
      this.remarks = remarks;
   }

   public Double getHamali() {
      return this.hamali;
   }

   public void setHamali(Double hamali) {
      this.hamali = hamali;
   }

   public Double getCommission() {
      return this.commission;
   }

   public void setCommission(Double commission) {
      this.commission = commission;
   }

   public Double getTransportAdvance() {
      return this.transportAdvance;
   }

   public void setTransportAdvance(Double transportAdvance) {
      this.transportAdvance = transportAdvance;
   }

   public String toString() {
      Long var10000 = this.vendorId;
      return "PurchaseRequest{vendorId=" + var10000 + ", farmerId=" + this.farmerId + ", items=" + String.valueOf(this.items) + ", remarks='" + this.remarks + "'}";
   }
}