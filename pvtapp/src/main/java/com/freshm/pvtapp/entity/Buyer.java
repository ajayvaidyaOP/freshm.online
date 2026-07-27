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

/**
 * Buyer = a customer company the ADMIN sells produce to
 * (e.g. "GAURI TRADING COMPANY" on the sale invoice).
 *
 * This is DIFFERENT from {@link Company}, which is the tenant
 * (the admin's own firm, e.g. "Shaakani Industries Pvt Ltd").
 * Every Buyer is scoped to one tenant Company so Admin 1 can
 * never see Admin 2's buyers.
 */
@Entity
@Table(name = "buyers")
public class Buyer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false, length = 20)
    private String buyerCode;

    @Column(nullable = false, length = 150)
    private String buyerName;

    private String contactPerson;

    private String mobile;

    private String email;

    private String address;

    /** Destination / country produce is shipped to, e.g. "Dubai". */
    private String destination;

    private String gstNumber;

    private String panNumber;

    public Buyer() {
    }

    public Buyer(
            Long id,
            Company company,
            String buyerCode,
            String buyerName,
            String contactPerson,
            String mobile,
            String email,
            String address,
            String destination,
            String gstNumber,
            String panNumber
    ) {
        this.id = id;
        this.company = company;
        this.buyerCode = buyerCode;
        this.buyerName = buyerName;
        this.contactPerson = contactPerson;
        this.mobile = mobile;
        this.email = email;
        this.address = address;
        this.destination = destination;
        this.gstNumber = gstNumber;
        this.panNumber = panNumber;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private Long id;
        private Company company;
        private String buyerCode;
        private String buyerName;
        private String contactPerson;
        private String mobile;
        private String email;
        private String address;
        private String destination;
        private String gstNumber;
        private String panNumber;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder company(Company company) { this.company = company; return this; }
        public Builder buyerCode(String buyerCode) { this.buyerCode = buyerCode; return this; }
        public Builder buyerName(String buyerName) { this.buyerName = buyerName; return this; }
        public Builder contactPerson(String contactPerson) { this.contactPerson = contactPerson; return this; }
        public Builder mobile(String mobile) { this.mobile = mobile; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder address(String address) { this.address = address; return this; }
        public Builder destination(String destination) { this.destination = destination; return this; }
        public Builder gstNumber(String gstNumber) { this.gstNumber = gstNumber; return this; }
        public Builder panNumber(String panNumber) { this.panNumber = panNumber; return this; }

        public Buyer build() {
            return new Buyer(
                    id, company, buyerCode, buyerName, contactPerson,
                    mobile, email, address, destination, gstNumber, panNumber
            );
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }

    public String getBuyerCode() { return buyerCode; }
    public void setBuyerCode(String buyerCode) { this.buyerCode = buyerCode; }

    public String getBuyerName() { return buyerName; }
    public void setBuyerName(String buyerName) { this.buyerName = buyerName; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getGstNumber() { return gstNumber; }
    public void setGstNumber(String gstNumber) { this.gstNumber = gstNumber; }

    public String getPanNumber() { return panNumber; }
    public void setPanNumber(String panNumber) { this.panNumber = panNumber; }
}
