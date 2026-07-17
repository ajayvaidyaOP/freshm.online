package com.freshm.pvtapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;


@Entity
@Table(
        name = "vendors",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"company_id", "vendor_code"})
        }
)
public class Vendor extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    /**
     * Example
     * ABC-VEN-000001
     */
    @Column(nullable = false, length = 30)
    private String vendorCode;



    @Column(nullable = false, length = 150)
    private String vendorName;



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



    /**
     * Local file path
     */
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
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;


    


    // Default constructor required by JPA
    public Vendor() {
    }






    // All arguments constructor
    public Vendor(
            Long id,
            String vendorCode,
            String vendorName,
            String mobile,
            String email,
            String address,
            String aadharNumber,
            String panNumber,
            String bankName,
            String accountNumber,
            String ifscCode,
            String aadharPdf,
            String panPdf,
            String passbookPdf,
            String photo,
            Boolean active,
            Company company
    ) {

        this.id = id;
        this.vendorCode = vendorCode;
        this.vendorName = vendorName;
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
        this.company = company;
    }





    // Manual Builder

    public static Builder builder() {
        return new Builder();
    }



    public static class Builder {

        private Long id;
        private String vendorCode;
        private String vendorName;
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
        private String photo;
        private Boolean active = true;
        private Company company;



        public Builder id(Long id) {
            this.id = id;
            return this;
        }


        public Builder vendorCode(String vendorCode) {
            this.vendorCode = vendorCode;
            return this;
        }


        public Builder vendorName(String vendorName) {
            this.vendorName = vendorName;
            return this;
        }


        public Builder mobile(String mobile) {
            this.mobile = mobile;
            return this;
        }


        public Builder email(String email) {
            this.email = email;
            return this;
        }


        public Builder address(String address) {
            this.address = address;
            return this;
        }


        public Builder aadharNumber(String aadharNumber) {
            this.aadharNumber = aadharNumber;
            return this;
        }


        public Builder panNumber(String panNumber) {
            this.panNumber = panNumber;
            return this;
        }


        public Builder bankName(String bankName) {
            this.bankName = bankName;
            return this;
        }


        public Builder accountNumber(String accountNumber) {
            this.accountNumber = accountNumber;
            return this;
        }


        public Builder ifscCode(String ifscCode) {
            this.ifscCode = ifscCode;
            return this;
        }


        public Builder aadharPdf(String aadharPdf) {
            this.aadharPdf = aadharPdf;
            return this;
        }


        public Builder panPdf(String panPdf) {
            this.panPdf = panPdf;
            return this;
        }


        public Builder passbookPdf(String passbookPdf) {
            this.passbookPdf = passbookPdf;
            return this;
        }


        public Builder photo(String photo) {
            this.photo = photo;
            return this;
        }
        
        public Builder active(Boolean active) {
            this.active = active;
            return this;
        }


        public Builder company(Company company) {
            this.company = company;
            return this;
        }



        public Vendor build() {

            return new Vendor(
                    id,
                    vendorCode,
                    vendorName,
                    mobile,
                    email,
                    address,
                    aadharNumber,
                    panNumber,
                    bankName,
                    accountNumber,
                    ifscCode,
                    aadharPdf,
                    panPdf,
                    passbookPdf,
                    photo,
                    active,
                    company
            );
        }
    }





    // Getters and Setters


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }



    public String getVendorCode() {
        return vendorCode;
    }


    public void setVendorCode(String vendorCode) {
        this.vendorCode = vendorCode;
    }



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



    public Company getCompany() {
        return company;
    }


    public void setCompany(Company company) {
        this.company = company;
    }
    
    public Boolean getActive() {
        return active;
    }


    public void setActive(Boolean active) {
        this.active = active;
    }

}