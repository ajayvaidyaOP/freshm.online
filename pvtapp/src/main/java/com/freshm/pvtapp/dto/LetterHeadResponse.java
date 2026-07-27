package com.freshm.pvtapp.dto;

public class LetterHeadResponse {

    private Long id;
    private String companyLogoUrl;
    private String headerTitle;
    private String footerText;
    private Boolean active;

    public LetterHeadResponse() {
    }

    public LetterHeadResponse(Long id, String companyLogoUrl,
                              String headerTitle,
                              String footerText,
                              Boolean active) {
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
        private Boolean active;

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

        public LetterHeadResponse build() {
            return new LetterHeadResponse(
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

    public String getHeaderTitle() {
        return headerTitle;
    }

    public String getFooterText() {
        return footerText;
    }

    public Boolean getActive() {
        return active;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCompanyLogoUrl(String companyLogoUrl) {
        this.companyLogoUrl = companyLogoUrl;
    }

    public void setHeaderTitle(String headerTitle) {
        this.headerTitle = headerTitle;
    }

    public void setFooterText(String footerText) {
        this.footerText = footerText;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}