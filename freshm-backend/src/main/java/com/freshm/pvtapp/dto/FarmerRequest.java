package com.freshm.pvtapp.dto;

import jakarta.validation.constraints.NotBlank;

public class FarmerRequest {

    @NotBlank
    private String farmerName;

    @NotBlank
    private String mobile;

    private String email;

    private String address;

    @NotBlank
    private String aadharNumber;

    private String panNumber;

    private String bankName;

    private String accountNumber;

    private String ifscCode;

    /**
     * Vendor under which farmer belongs
     */
    private Long vendorId;

    public FarmerRequest() {
    }

    public FarmerRequest(String farmerName, String mobile, String email,
                         String address, String aadharNumber, String panNumber,
                         String bankName, String accountNumber,
                         String ifscCode, Long vendorId) {

        this.farmerName = farmerName;
        this.mobile = mobile;
        this.email = email;
        this.address = address;
        this.aadharNumber = aadharNumber;
        this.panNumber = panNumber;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.ifscCode = ifscCode;
        this.vendorId = vendorId;
    }

    public String getFarmerName() {
        return farmerName;
    }

    public void setFarmerName(String farmerName) {
        this.farmerName = farmerName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }

    public void setAadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }

    public Long getVendorId() {
        return vendorId;
    }

    public void setVendorId(Long vendorId) {
        this.vendorId = vendorId;
    }
}