package com.freshm.pvtapp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "letter_heads")
public class LetterHead extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500)
    private String companyLogoUrl;

    @Column(nullable = false, length = 200)
    private String headerTitle;

    @Column(length = 1000)
    private String footerText;

    @Column(nullable = false)
    private Boolean active = true;

    public LetterHead() {
    }

    public LetterHead(Long id, String companyLogoUrl, String headerTitle,
                      String footerText, Boolean active) {
        this.id = id;
        this.companyLogoUrl = companyLogoUrl;
        this.headerTitle = headerTitle;
        this.footerText = footerText;
        this.active = active;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private Long id;
        private String companyLogoUrl;
        private String headerTitle;
        private String footerText;
        private Boolean active = true;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder companyLogoUrl(String companyLogoUrl) {
            this.companyLogoUrl = companyLogoUrl;
            return this;
        }

        public Builder headerTitle(String headerTitle) {
            this.headerTitle = headerTitle;
            return this;
        }

        public Builder footerText(String footerText) {
            this.footerText = footerText;
            return this;
        }

        public Builder active(Boolean active) {
            this.active = active;
            return this;
        }

        public LetterHead build() {
            return new LetterHead(
                    id,
                    companyLogoUrl,
                    headerTitle,
                    footerText,
                    active
            );
        }
    }

    public Long getId() {
        return id;
    }

    public String getCompanyLogoUrl() {
        return companyLogoUrl;
    }

    public void setCompanyLogoUrl(String companyLogoUrl) {
        this.companyLogoUrl = companyLogoUrl;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeaderTitle() {
        return headerTitle;
    }

    public void setHeaderTitle(String headerTitle) {
        this.headerTitle = headerTitle;
    }

    public String getFooterText() {
        return footerText;
    }

    public void setFooterText(String footerText) {
        this.footerText = footerText;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}