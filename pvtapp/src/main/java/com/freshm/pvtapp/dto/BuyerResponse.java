package com.freshm.pvtapp.dto;

public class BuyerResponse {

    private Long id;
    private String buyerCode;
    private String buyerName;
    private String contactPerson;
    private String mobile;
    private String email;
    private String address;
    private String destination;
    private String gstNumber;
    private String panNumber;
    private Boolean active;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBuyerCode() { return buyerCode; }
    public void setBuyerCode(String buyerCode) { this.buyerCode = buyerCode; }

    public String getBuyerName() { return buyerName; }
    public void setBuyerName(String buyerName) { this.buyerName = buyerName; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getGstNumber() { return gstNumber; }
    public void setGstNumber(String gstNumber) { this.gstNumber = gstNumber; }

    public String getPanNumber() { return panNumber; }
    public void setPanNumber(String panNumber) { this.panNumber = panNumber; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
