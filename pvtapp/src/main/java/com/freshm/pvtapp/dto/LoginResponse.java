package com.freshm.pvtapp.dto;

public class LoginResponse {

    private String type;

    private Long userId;

    private Long companyId;

    private String companyCode;

    private String companyName;

    private String name;

    private String email;

    private String role;

    private String token;

    // Default constructor
    public LoginResponse() {
    }

    // All-arguments constructor
    public LoginResponse(
            String type,
            Long userId,
            Long companyId,
            String companyCode,
            String companyName,
            String name,
            String email,
            String role,
            String token
    ) {
        this.type = type;
        this.userId = userId;
        this.companyId = companyId;
        this.companyCode = companyCode;
        this.companyName = companyName;
        this.name = name;
        this.email = email;
        this.role = role;
        this.token = token;
    }

    // Builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private String type;
        private Long userId;
        private Long companyId;
        private String companyCode;
        private String companyName;
        private String name;
        private String email;
        private String role;
        private String token;

        public Builder type(String type) {
            this.type = type;
            return this;
        }

        public Builder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public Builder companyId(Long companyId) {
            this.companyId = companyId;
            return this;
        }

        public Builder companyCode(String companyCode) {
            this.companyCode = companyCode;
            return this;
        }

        public Builder companyName(String companyName) {
            this.companyName = companyName;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder role(String role) {
            this.role = role;
            return this;
        }

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public LoginResponse build() {
            return new LoginResponse(
                    type,
                    userId,
                    companyId,
                    companyCode,
                    companyName,
                    name,
                    email,
                    role,
                    token
            );
        }
    }

    // Getters and Setters

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}