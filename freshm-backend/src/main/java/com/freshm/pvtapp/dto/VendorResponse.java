package com.freshm.pvtapp.dto;


public class VendorResponse {


    private Long id;


    private String vendorCode;


    private String vendorName;


    private String mobile;


    private String email;


    private Boolean active;




    // Default constructor
    public VendorResponse() {
    }




    // All arguments constructor
    public VendorResponse(
            Long id,
            String vendorCode,
            String vendorName,
            String mobile,
            String email,
            Boolean active
    ) {
        this.id = id;
        this.vendorCode = vendorCode;
        this.vendorName = vendorName;
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
        private String vendorCode;
        private String vendorName;
        private String mobile;
        private String email;
        private Boolean active;



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



        public Builder active(Boolean active) {
            this.active = active;
            return this;
        }




        public VendorResponse build() {

            return new VendorResponse(
                    id,
                    vendorCode,
                    vendorName,
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



    public Boolean getActive() {
        return active;
    }


    public void setActive(Boolean active) {
        this.active = active;
    }

}