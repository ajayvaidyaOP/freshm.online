package com.freshm.pvtapp.repository;


import com.freshm.pvtapp.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;



@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {


    /**
     * Get all products of particular company
     */
    List<Product> findAllByCompanyId(Long companyId);



    /**
     * Get single product with company isolation
     */
    Optional<Product> findByIdAndCompanyId(
            Long id,
            Long companyId
    );



    /**
     * Check duplicate product code inside company
     */
    boolean existsByCompanyIdAndProductCode(
            Long companyId,
            String productCode
    );



    /**
     * Search product by name inside company
     */
    List<Product> findAllByCompanyIdAndProductNameContainingIgnoreCase(
            Long companyId,
            String productName
    );



    /**
     * Search article name inside company
     */
    List<Product> findAllByCompanyIdAndArticleNameContainingIgnoreCase(
            Long companyId,
            String articleName
    );

}