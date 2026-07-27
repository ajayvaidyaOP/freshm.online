package com.freshm.pvtapp.entity;

import jakarta.persistence.*;

/**
 * FIX: LetterHead is now scoped to a Company (tenant) so each company
 * has its own letterhead and can never see/overwrite another company's.
 * headerTitle is no longer NOT NULL at the DB level, so a partial save
 * (e.g. logo only) doesn't fail with a constraint violation.
 */
@Entity
@Table(name = "letter_heads")
public class LetterHead extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // NEW: tenant link
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @Column(length = 500)
    private String companyLogoUrl;

    // was nullable = false -> caused a 500 when the title was left blank
    @Column(length = 200)
    private String headerTitle;

    @Column(length = 1000)
    private String footerText;

    public LetterHead() {
    }

    public LetterHead(Long id, Company company, String companyLogoUrl,
                      String headerTitle, String footerText) {
        this.id = id;
        this.company = company;
        this.companyLogoUrl = companyLogoUrl;
        this.headerTitle = headerTitle;
        this.footerText = footerText;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private Company company;
        private String companyLogoUrl;
        private String headerTitle;
        private String footerText;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder company(Company company) { this.company = company; return this; }
        public Builder companyLogoUrl(String v) { this.companyLogoUrl = v; return this; }
        public Builder headerTitle(String v) { this.headerTitle = v; return this; }
        public Builder footerText(String v) { this.footerText = v; return this; }

        public LetterHead build() {
            return new LetterHead(id, company, companyLogoUrl, headerTitle, footerText);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }

    public String getCompanyLogoUrl() { return companyLogoUrl; }
    public void setCompanyLogoUrl(String v) { this.companyLogoUrl = v; }

    public String getHeaderTitle() { return headerTitle; }
    public void setHeaderTitle(String v) { this.headerTitle = v; }

    public String getFooterText() { return footerText; }
    public void setFooterText(String v) { this.footerText = v; }
}
