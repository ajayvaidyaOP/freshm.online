// Source code is decompiled from a .class file using FernFlower decompiler (from Intellij IDEA).
package com.freshm.pvtapp.dto;

public class ReportGraphResponse {
   private String month;
   private Double purchase;
   private Double payment;
   private Double pending;
   private Double hamali;
   private Double commission;
   private Double transport;

   public ReportGraphResponse() {
   }

   public String getMonth() {
      return this.month;
   }

   public void setMonth(String month) {
      this.month = month;
   }

   public Double getPurchase() {
      return this.purchase;
   }

   public void setPurchase(Double purchase) {
      this.purchase = purchase;
   }

   public Double getPayment() {
      return this.payment;
   }

   public void setPayment(Double payment) {
      this.payment = payment;
   }

   public Double getPending() {
      return this.pending;
   }

   public void setPending(Double pending) {
      this.pending = pending;
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

   public Double getTransport() {
      return this.transport;
   }

   public void setTransport(Double transport) {
      this.transport = transport;
   }
}