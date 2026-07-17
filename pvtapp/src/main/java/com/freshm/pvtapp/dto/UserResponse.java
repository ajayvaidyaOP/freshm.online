package com.freshm.pvtapp.dto;


public class UserResponse {


    private Long id;

    private String fullName;

    private String email;

    private String mobile;

    private String role;

    private Boolean active;



    // Default constructor
    public UserResponse() {
    }



    // All arguments constructor
    public UserResponse(
            Long id,
            String fullName,
            String email,
            String mobile,
            String role,
            Boolean active
    ) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.mobile = mobile;
        this.role = role;
        this.active = active;
    }




    // Builder

    public static Builder builder() {
        return new Builder();
    }



    public static class Builder {

        private Long id;
        private String fullName;
        private String email;
        private String mobile;
        private String role;
        private Boolean active;



        public Builder id(Long id) {
            this.id = id;
            return this;
        }



        public Builder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }



        public Builder email(String email) {
            this.email = email;
            return this;
        }



        public Builder mobile(String mobile) {
            this.mobile = mobile;
            return this;
        }



        public Builder role(String role) {
            this.role = role;
            return this;
        }



        public Builder active(Boolean active) {
            this.active = active;
            return this;
        }



        public UserResponse build() {

            return new UserResponse(
                    id,
                    fullName,
                    email,
                    mobile,
                    role,
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



    public String getFullName() {
        return fullName;
    }


    public void setFullName(String fullName) {
        this.fullName = fullName;
    }



    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }



    public String getMobile() {
        return mobile;
    }


    public void setMobile(String mobile) {
        this.mobile = mobile;
    }



    public String getRole() {
        return role;
    }


    public void setRole(String role) {
        this.role = role;
    }



    public Boolean getActive() {
        return active;
    }


    public void setActive(Boolean active) {
        this.active = active;
    }

}