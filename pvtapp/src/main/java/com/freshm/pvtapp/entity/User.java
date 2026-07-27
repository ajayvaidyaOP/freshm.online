package com.freshm.pvtapp.entity;

import com.freshm.pvtapp.enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "users")
public class User extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;



    @Column(nullable = false)
    private String fullName;



    @Column(nullable = false, unique = true)
    private String email;



    private String mobile;



    @Column(nullable = false)
    private String password;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;



    @Column(nullable = false)
    private Boolean active = true;




    // Default constructor
    public User() {
    }




    // All arguments constructor
    public User(
            Long id,
            Company company,
            String fullName,
            String email,
            String mobile,
            String password,
            Role role,
            Boolean active
    ) {
        this.id = id;
        this.company = company;
        this.fullName = fullName;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
        this.role = role;
        this.active = active;
    }





    // Builder

    public static Builder builder() {
        return new Builder();
    }



    public static class Builder {

        private Long id;
        private Company company;
        private String fullName;
        private String email;
        private String mobile;
        private String password;
        private Role role;
        private Boolean active = true;



        public Builder id(Long id) {
            this.id = id;
            return this;
        }



        public Builder company(Company company) {
            this.company = company;
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



        public Builder password(String password) {
            this.password = password;
            return this;
        }



        public Builder role(Role role) {
            this.role = role;
            return this;
        }



        public Builder active(Boolean active) {
            this.active = active;
            return this;
        }



        public User build() {

            return new User(
                    id,
                    company,
                    fullName,
                    email,
                    mobile,
                    password,
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



    public Company getCompany() {
        return company;
    }


    public void setCompany(Company company) {
        this.company = company;
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



    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }



    public Role getRole() {
        return role;
    }


    public void setRole(Role role) {
        this.role = role;
    }



    public Boolean getActive() {
        return active;
    }


    public void setActive(Boolean active) {
        this.active = active;
    }

}