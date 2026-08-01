package com.freshm.pvtapp.dto;

public class ProductStockResponse {
    private Long productId;
    private String productName;
    private String articleName;
    private Double receivedNet;   // sum of receipt net weights
    private Double returned;      // sum of returns
    private Double packed;        // sum packed into boxes (info)
    private Double sold;          // sum of sale item weights
    private Double onHand;        // receivedNet - returned - sold (sellable)

    public Long getProductId() { return productId; }
    public void setProductId(Long v) { this.productId = v; }
    public String getProductName() { return productName; }
    public void setProductName(String v) { this.productName = v; }
    public String getArticleName() { return articleName; }
    public void setArticleName(String v) { this.articleName = v; }
    public Double getReceivedNet() { return receivedNet; }
    public void setReceivedNet(Double v) { this.receivedNet = v; }
    public Double getReturned() { return returned; }
    public void setReturned(Double v) { this.returned = v; }
    public Double getPacked() { return packed; }
    public void setPacked(Double v) { this.packed = v; }
    public Double getSold() { return sold; }
    public void setSold(Double v) { this.sold = v; }
    public Double getOnHand() { return onHand; }
    public void setOnHand(Double v) { this.onHand = v; }
}
