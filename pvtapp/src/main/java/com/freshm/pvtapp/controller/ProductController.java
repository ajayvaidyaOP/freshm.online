package com.freshm.pvtapp.controller;


import com.freshm.pvtapp.dto.ProductRequest;
import com.freshm.pvtapp.dto.ProductResponse;
import com.freshm.pvtapp.service.ProductService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {



    private final ProductService productService;



    public ProductController(
            ProductService productService
    ) {
        this.productService = productService;
    }






    /**
     * Create Product
     *
     * POST:
     * /api/products
     */
    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
            @RequestBody ProductRequest request
    ) {


        ProductResponse response =
                productService.createProduct(request);


        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );

    }








    /**
     * Get All Products
     *
     * GET:
     * /api/products
     */
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {


        return ResponseEntity.ok(
                productService.getAllProducts()
        );

    }









    /**
     * Get Product By Id
     *
     * GET:
     * /api/products/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(
            @PathVariable Long id
    ) {


        return ResponseEntity.ok(
                productService.getProductById(id)
        );

    }


    /**
     * Update Product
     *
     * PUT:
     * /api/products/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductRequest request
    ) {


        return ResponseEntity.ok(
                productService.updateProduct(
                        id,
                        request
                )
        );

    }










    /**
     * Soft Delete Product
     *
     * DELETE:
     * /api/products/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(
            @PathVariable Long id
    ) {


        productService.deleteProduct(id);


        return ResponseEntity.ok(
                "Product deleted successfully"
        );

    }


}