// Source code is decompiled from a .class file using FernFlower decompiler (from Intellij IDEA).
package com.freshm.pvtapp.dto;

public class ReportSummaryResponse {
   private Double totalPurchase;
   private Double totalPayment;
   private Double pendingAmount;
   private Double hamali;
   private Double commission;
   private Double transportAdvance;

   public ReportSummaryResponse() {
   }

   public Double getTotalPurchase() {
      return this.totalPurchase;
   }

   public void setTotalPurchase(Double totalPurchase) {
      this.totalPurchase = totalPurchase;
   }

   public Double getTotalPayment() {
      return this.totalPayment;
   }

   public void setTotalPayment(Double totalPayment) {
      this.totalPayment = totalPayment;
   }

   public Double getPendingAmount() {
      return this.pendingAmount;
   }

   public void setPendingAmount(Double pendingAmount) {
      this.pendingAmount = pendingAmount;
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
}