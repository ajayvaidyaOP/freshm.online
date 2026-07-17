package com.freshm.pvtapp.dto;

import jakarta.validation.constraints.NotBlank;


public class VendorRequest {


    @NotBlank
    private String vendorName;


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




    // Default constructor
    public VendorRequest() {
    }




    // All arguments constructor
    public VendorRequest(
            String vendorName,
            String mobile,
            String email,
            String address,
            String aadharNumber,
            String panNumber,
            String bankName,
            String accountNumber,
            String ifscCode
    ) {
        this.vendorName = vendorName;
        this.mobile = mobile;
        this.email = email;
        this.address = address;
        this.aadharNumber = aadharNumber;
        this.panNumber = panNumber;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.ifscCode = ifscCode;
    }




    // Getters and Setters


    public String getVendorName() {
        return vendorName;
    }


    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
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

}