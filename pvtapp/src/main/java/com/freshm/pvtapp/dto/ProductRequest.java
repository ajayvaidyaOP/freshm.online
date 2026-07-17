package com.freshm.pvtapp.dto;


public class ProductRequest {


    private String productName;


    private String articleName;


    /**
     * Example:
     * 125-150 GM
     */
    private String size;



    /**
     * Example:
     * Dubai
     */
    private String destination;



    private String description;



    public ProductRequest() {

    }



    public ProductRequest(
            String productName,
            String articleName,
            String size,
            String destination,
            String description
    ) {

        this.productName = productName;
        this.articleName = articleName;
        this.size = size;
        this.destination = destination;
        this.description = description;

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

}