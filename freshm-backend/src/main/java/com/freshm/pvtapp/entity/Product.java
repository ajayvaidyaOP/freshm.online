package com.freshm.pvtapp.entity;


import jakarta.persistence.*;

@Entity
@Table(
        name = "products",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"company_id", "product_code"}
                )
        }
)
public class Product extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "company_id",
            nullable = false
    )
    private Company company;



    @Column(
            nullable = false,
            length = 30
    )
    private String productCode;



    @Column(
            nullable = false,
            length = 150
    )
    private String productName;



    @Column(
            nullable = false,
            length = 100
    )
    private String articleName;



    /**
     * Example:
     * 125-150 GM
     */
    @Column(
            nullable = false,
            length = 50
    )
    private String size;



    /**
     * Example:
     * Dubai
     */
    @Column(
            nullable = false,
            length = 100
    )
    private String destination;



    @Column(
            length = 500
    )
    private String description;



    public Product() {
    }



    public Product(
            Long id,
            Company company,
            String productCode,
            String productName,
            String articleName,
            String size,
            String destination,
            String description
    ) {

        this.id = id;
        this.company = company;
        this.productCode = productCode;
        this.productName = productName;
        this.articleName = articleName;
        this.size = size;
        this.destination = destination;
        this.description = description;

    }



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

}