package com.freshm.pvtapp.entity;

import com.freshm.pvtapp.enums.CodeType;

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
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
        name = "code_sequences",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {
                                "company_id",
                                "code_type"
                        }
                )
        }
)
public class CodeSequence extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Company wise sequence
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "company_id",
            nullable = false
    )
    private Company company;

    /**
     * What number are we generating?
     */
    @Enumerated(EnumType.STRING)
    @Column(
            name = "code_type",
            nullable = false
    )
    private CodeType codeType;

    /**
     * Current running number
     */
    @Column(nullable = false)
    private Long currentNumber;

    // Default Constructor
    public CodeSequence() {
    }

    // Parameterized Constructor
    public CodeSequence(Long id, Company company, CodeType codeType, Long currentNumber) {
        this.id = id;
        this.company = company;
        this.codeType = codeType;
        this.currentNumber = currentNumber;
    }

    // Builder Method
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private Company company;
        private CodeType codeType;
        private Long currentNumber;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder company(Company company) {
            this.company = company;
            return this;
        }

        public Builder codeType(CodeType codeType) {
            this.codeType = codeType;
            return this;
        }

        public Builder currentNumber(Long currentNumber) {
            this.currentNumber = currentNumber;
            return this;
        }

        public CodeSequence build() {
            return new CodeSequence(id, company, codeType, currentNumber);
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

    public CodeType getCodeType() {
        return codeType;
    }

    public void setCodeType(CodeType codeType) {
        this.codeType = codeType;
    }

    public Long getCurrentNumber() {
        return currentNumber;
    }

    public void setCurrentNumber(Long currentNumber) {
        this.currentNumber = currentNumber;
    }
}