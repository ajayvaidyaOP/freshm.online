package com.freshm.pvtapp.dto;


public class CompanyResponse {


    private Long id;

    private String companyName;

    private String companyCode;

    private String address;

    private String mobile;

    private String email;

    private Boolean active;



    // Default constructor
    public CompanyResponse() {
    }



    // All arguments constructor
    public CompanyResponse(
            Long id,
            String companyName,
            String companyCode,
            String address,
            String mobile,
            String email,
            Boolean active
    ) {
        this.id = id;
        this.companyName = companyName;
        this.companyCode = companyCode;
        this.address = address;
        this.mobile = mobile;
        this.email = email;
        this.active = active;
    }



    // Manual Builder
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
        private Boolean active;



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



        public Builder active(Boolean active) {
            this.active = active;
            return this;
        }



        public CompanyResponse build() {
            return new CompanyResponse(
                    id,
                    companyName,
                    companyCode,
                    address,
                    mobile,
                    email,
                    active
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


    public Boolean getActive() {
        return active;
    }


    public void setActive(Boolean active) {
        this.active = active;
    }

}