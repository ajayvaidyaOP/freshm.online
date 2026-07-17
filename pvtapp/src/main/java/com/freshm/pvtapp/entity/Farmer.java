package com.freshm.pvtapp.entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "farmers",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"company_id", "farmer_code"})
        }
)
public class Farmer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30)
    private String farmerCode;

    @Column(nullable = false, length = 150)
    private String farmerName;

    @Column(nullable = false, length = 15)
    private String mobile;

    @Column(length = 255)
    private String email;

    @Column(length = 500)
    private String address;

    @Column(nullable = false, length = 12)
    private String aadharNumber;

    @Column(length = 10)
    private String panNumber;

    @Column(nullable = false)
    private String bankName;

    @Column(nullable = false)
    private String accountNumber;

    @Column(nullable = false)
    private String ifscCode;

    @Column(length = 500)
    private String aadharPdf;

    @Column(length = 500)
    private String panPdf;

    @Column(length = 500)
    private String passbookPdf;

    @Column(length = 500)
    private String photo;

    @Column(nullable = false)
    private Boolean active = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    public Farmer() {
    }

    public Farmer(Long id, String farmerCode, String farmerName, String mobile,
                  String email, String address, String aadharNumber,
                  String panNumber, String bankName, String accountNumber,
                  String ifscCode, String aadharPdf, String panPdf,
                  String passbookPdf, String photo, Boolean active,
                  Vendor vendor, Company company) {

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
        this.photo = photo;
        this.active = active;
        this.vendor = vendor;
        this.company = company;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFarmerCode() {
        return farmerCode;
    }

    public void setFarmerCode(String farmerCode) {
        this.farmerCode = farmerCode;
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

    public String getAadharPdf() {
        return aadharPdf;
    }

    public void setAadharPdf(String aadharPdf) {
        this.aadharPdf = aadharPdf;
    }

    public String getPanPdf() {
        return panPdf;
    }

    public void setPanPdf(String panPdf) {
        this.panPdf = panPdf;
    }

    public String getPassbookPdf() {
        return passbookPdf;
    }

    public void setPassbookPdf(String passbookPdf) {
        this.passbookPdf = passbookPdf;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Vendor getVendor() {
        return vendor;
    }

    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
    
    
}