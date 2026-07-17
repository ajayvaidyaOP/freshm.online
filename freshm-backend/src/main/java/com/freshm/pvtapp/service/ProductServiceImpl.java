package com.freshm.pvtapp.service;


import com.freshm.pvtapp.dto.ProductRequest;
import com.freshm.pvtapp.dto.ProductResponse;
import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.entity.Product;
import com.freshm.pvtapp.repository.ProductRepository;
import com.freshm.pvtapp.service.ProductService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;



@Service
@Transactional
public class ProductServiceImpl implements ProductService {


    private final ProductRepository productRepository;



    public ProductServiceImpl(
            ProductRepository productRepository
    ) {
        this.productRepository = productRepository;
    }





    @Override
    public ProductResponse createProduct(
            ProductRequest request
    ) {


        /*
         * Temporary company fetching.
         *
         * Later we will replace this with:
         * SecurityUtil.getCompanyId()
         */

        Long companyId = 1L;



        Company company = new Company();
        company.setId(companyId);



        String productCode = generateProductCode();



        Product product = new Product();

        product.setCompany(company);

        product.setProductCode(productCode);

        product.setProductName(
                request.getProductName()
        );

        product.setArticleName(
                request.getArticleName()
        );

        product.setSize(
                request.getSize()
        );

        product.setDestination(
                request.getDestination()
        );

        product.setDescription(
                request.getDescription()
        );



        Product savedProduct =
                productRepository.save(product);



        return convertToResponse(savedProduct);

    }






    @Override
    public List<ProductResponse> getAllProducts() {


        Long companyId = 1L;



        return productRepository
                .findAllByCompanyId(companyId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

    }







    @Override
    public ProductResponse getProductById(
            Long productId
    ) {


        Long companyId = 1L;



        Product product =
                productRepository
                        .findByIdAndCompanyId(
                                productId,
                                companyId
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Product not found"
                                )
                        );



        return convertToResponse(product);

    }








    @Override
    public ProductResponse updateProduct(
            Long productId,
            ProductRequest request
    ) {


        Long companyId = 1L;



        Product product =
                productRepository
                        .findByIdAndCompanyId(
                                productId,
                                companyId
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Product not found"
                                )
                        );



        product.setProductName(
                request.getProductName()
        );


        product.setArticleName(
                request.getArticleName()
        );


        product.setSize(
                request.getSize()
        );


        product.setDestination(
                request.getDestination()
        );


        product.setDescription(
                request.getDescription()
        );



        Product updated =
                productRepository.save(product);



        return convertToResponse(updated);

    }







    @Override
    public void deleteProduct(
            Long productId
    ) {


        Long companyId = 1L;



        Product product =
                productRepository
                        .findByIdAndCompanyId(
                                productId,
                                companyId
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Product not found"
                                )
                        );



        product.setActive(false);



        productRepository.save(product);

    }









    private String generateProductCode() {


        long number =
                System.currentTimeMillis()
                        % 1000000;



        return "PRO-"
                + String.format(
                        "%06d",
                        number
                );

    }








    private ProductResponse convertToResponse(
            Product product
    ) {


        ProductResponse response =
                new ProductResponse();



        response.setId(
                product.getId()
        );


        response.setProductCode(
                product.getProductCode()
        );


        response.setProductName(
                product.getProductName()
        );


        response.setArticleName(
                product.getArticleName()
        );


        response.setSize(
                product.getSize()
        );


        response.setDestination(
                product.getDestination()
        );


        response.setDescription(
                product.getDescription()
        );


        response.setActive(
                product.getActive()
        );



        if(product.getCompany()!=null){

            response.setCompanyId(
                    product.getCompany().getId()
            );


            response.setCompanyName(
                    product.getCompany().getCompanyName()
            );

        }


        return response;

    }

}