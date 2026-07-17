package com.freshm.pvtapp.dto;


public class ProductResponse {


    private Long id;


    private String productCode;


    private String productName;


    private String articleName;


    private String size;


    private String destination;


    private String description;


    private Long companyId;


    private String companyName;


    private Boolean active;



    public ProductResponse() {

    }



    public ProductResponse(
            Long id,
            String productCode,
            String productName,
            String articleName,
            String size,
            String destination,
            String description,
            Long companyId,
            String companyName,
            Boolean active
    ) {

        this.id = id;
        this.productCode = productCode;
        this.productName = productName;
        this.articleName = articleName;
        this.size = size;
        this.destination = destination;
        this.description = description;
        this.companyId = companyId;
        this.companyName = companyName;
        this.active = active;

    }



    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }



    public String getProductCode() {
        return productCode;
    }


    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }



    public String getProductName() {
        return productName;
    }


    public void setProductName(String productName) {
        this.productName = productName;
    }



    public String getArticleName() {
        return articleName;
    }


    public void setArticleName(String articleName) {
        this.articleName = articleName;
    }



    public String getSize() {
        return size;
    }


    public void setSize(String size) {
        this.size = size;
    }



    public String getDestination() {
        return destination;
    }


    public void setDestination(String destination) {
        this.destination = destination;
    }



    public String getDescription() {
        return description;
    }


    public void setDescription(String description) {
        this.description = description;
    }



    public Long getCompanyId() {
        return companyId;
    }


    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }



    public String getCompanyName() {
        return companyName;
    }


    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }



    public Boolean getActive() {
        return active;
    }


    public void setActive(Boolean active) {
        this.active = active;
    }

}