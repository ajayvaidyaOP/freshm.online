package com.freshm.pvtapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "companies")
public class Company extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, unique = true, length = 100)
    private String companyName;


    @Column(nullable = false, unique = true, length = 20)
    private String companyCode;


    private String address;


    private String mobile;


    private String email;
private String gstNumber;

private String panNumber;

    @Column(nullable = false)
    private Boolean active = true;



    public Company() {
    }



    public Company(
            Long id,
            String companyName,
            String companyCode,
            String address,
            String mobile,
          String email,
           String gstNumber,
        String panNumber,
         Boolean active
    ) {
        this.id = id;
        this.companyName = companyName;
        this.companyCode = companyCode;
        this.address = address;
        this.mobile = mobile;
        this.email = email;
this.gstNumber = gstNumber;
this.panNumber = panNumber;
this.active = active;
    }



    public static Builder builder() {
        return new Builder();
    }



    public static class Builder {

        private Long id;
        private String companyName;
        private String companyCode;
        private String address;
        private String mobile;
        private String email;
private String gstNumber;
private String panNumber;
private Boolean active = true;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }


        public Builder companyName(String companyName) {
            this.companyName = companyName;
            return this;
        }


        public Builder companyCode(String companyCode) {
            this.companyCode = companyCode;
            return this;
        }


        public Builder address(String address) {
            this.address = address;
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
public Builder gstNumber(String gstNumber) {
    this.gstNumber = gstNumber;
    return this;
}

public Builder panNumber(String panNumber) {
    this.panNumber = panNumber;
    return this;
}

        public Builder active(Boolean active) {
            this.active = active;
            return this;
        }


        public Company build() {
            return new Company(
        id,
        companyName,
        companyCode,
        address,
        mobile,
        email,
        gstNumber,
        panNumber,
        active
);
        }
    }



    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getCompanyName() {
        return companyName;
    }


    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }


    public String getCompanyCode() {
        return companyCode;
    }


    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }


    public String getAddress() {
        return address;
    }


    public void setAddress(String address) {
        this.address = address;
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

    public String getGstNumber() {
    return gstNumber;
}

public void setGstNumber(String gstNumber) {
    this.gstNumber = gstNumber;
}

public String getPanNumber() {
    return panNumber;
}

public void setPanNumber(String panNumber) {
    this.panNumber = panNumber;
}

    public Boolean getActive() {
        return active;
    }


    public void setActive(Boolean active) {
        this.active = active;
    }

}