package com.freshm.pvtapp.dto;

public class FarmerResponse {

    private Long id;
    private String farmerCode;
    private String farmerName;
    private String mobile;
    private String email;
    private String address;
    private String aadharNumber;
    private String panNumber;
    private String bankName;
    private String accountNumber;
    private String ifscCode;

    private String aadharPdf;
    private String panPdf;
    private String passbookPdf;

    private Boolean active;

    private Long vendorId;
    private String vendorCode;
    private String vendorName;

    private Long companyId;
    private String companyName;

    public FarmerResponse() {
    }

    public FarmerResponse(Long id, String farmerCode, String farmerName,
                          String mobile, String email, String address,
                          String aadharNumber, String panNumber,
                          String bankName, String accountNumber,
                          String ifscCode, String aadharPdf,
                          String panPdf, String passbookPdf,
                          Boolean active, Long vendorId,
                          String vendorCode, String vendorName,
                          Long companyId, String companyName) {

        this.id = id;
        this.farmerCode = farmerCode;
        this.farmerName = farmerName;
        this.mobile = mobile;
        this.email = email;
        this.address = address;
        this.aadharNumber = aadharNumber;
        this.panNumber = panNumber;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.ifscCode = ifscCode;
        this.aadharPdf = aadharPdf;
        this.panPdf = panPdf;
        this.passbookPdf = passbookPdf;
        this.active = active;
        this.vendorId = vendorId;
        this.vendorCode = vendorCode;
        this.vendorName = vendorName;
        this.companyId = companyId;
        this.companyName = companyName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFarmerCode() { return farmerCode; }
    public void setFarmerCode(String farmerCode) { this.farmerCode = farmerCode; }

    public String getFarmerName() { return farmerName; }
    public void setFarmerName(String farmerName) { this.farmerName = farmerName; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getAadharNumber() { return aadharNumber; }
    public void setAadharNumber(String aadharNumber) { this.aadharNumber = aadharNumber; }

    public String getPanNumber() { return panNumber; }
    public void setPanNumber(String panNumber) { this.panNumber = panNumber; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public String getIfscCode() { return ifscCode; }
    public void setIfscCode(String ifscCode) { this.ifscCode = ifscCode; }

    public String getAadharPdf() { return aadharPdf; }
    public void setAadharPdf(String aadharPdf) { this.aadharPdf = aadharPdf; }

    public String getPanPdf() { return panPdf; }
    public void setPanPdf(String panPdf) { this.panPdf = panPdf; }

    public String getPassbookPdf() { return passbookPdf; }
    public void setPassbookPdf(String passbookPdf) { this.passbookPdf = passbookPdf; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public Long getVendorId() { return vendorId; }
    public void setVendorId(Long vendorId) { this.vendorId = vendorId; }

    public String getVendorCode() { return vendorCode; }
    public void setVendorCode(String vendorCode) { this.vendorCode = vendorCode; }

    public String getVendorName() { return vendorName; }
    public void setVendorName(String vendorName) { this.vendorName = vendorName; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
}