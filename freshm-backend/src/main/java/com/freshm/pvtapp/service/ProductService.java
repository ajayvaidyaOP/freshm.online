package com.freshm.pvtapp.service;


import com.freshm.pvtapp.dto.ProductRequest;
import com.freshm.pvtapp.dto.ProductResponse;

import java.util.List;


public interface ProductService {


    /**
     * Create new product
     */
    ProductResponse createProduct(
            ProductRequest request
    );



    /**
     * Get all products of logged-in company
     */
    List<ProductResponse> getAllProducts();



    /**
     * Get single product
     */
    ProductResponse getProductById(
            Long productId
    );



    /**
     * Update existing product
     */
    ProductResponse updateProduct(
            Long productId,
            ProductRequest request
    );



    /**
     * Disable product
     */
    void deleteProduct(
            Long productId
    );


}