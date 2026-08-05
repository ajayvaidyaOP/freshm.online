package com.freshm.pvtapp.service;


import com.freshm.pvtapp.dto.ProductRequest;
import com.freshm.pvtapp.dto.ProductResponse;
import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.entity.Product;
import com.freshm.pvtapp.repository.ProductRepository;
import com.freshm.pvtapp.security.SecurityUtil;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final SecurityUtil securityUtil;

    public ProductServiceImpl(
            ProductRepository productRepository,
            SecurityUtil securityUtil
    ) {
        this.productRepository = productRepository;
        this.securityUtil = securityUtil;
    }


    @Override
    public ProductResponse createProduct(ProductRequest request) {

        // FIX: use the logged-in user's real company (was hardcoded to 1L,
        // which is why products vanished for every other company and caused
        // "Product not found" when creating a purchase).
        Company company = securityUtil.getCurrentCompany();

        String productCode = generateProductCode();

        Product product = new Product();
        product.setCompany(company);
        product.setProductCode(productCode);
        product.setProductName(request.getProductName());
        product.setArticleName(request.getArticleName());
        product.setSize(request.getSize());
        product.setDestination(request.getDestination());
        product.setDescription(request.getDescription());
        product.setActive(true);

        return convertToResponse(productRepository.save(product));
    }


    @Override
    public List<ProductResponse> getAllProducts() {

        Long companyId = securityUtil.getCurrentCompany().getId();

        return productRepository
                .findAllByCompanyId(companyId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    @Override
    public ProductResponse getProductById(Long productId) {

        Long companyId = securityUtil.getCurrentCompany().getId();

        Product product = productRepository
                .findByIdAndCompanyId(productId, companyId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return convertToResponse(product);
    }


    @Override
    public ProductResponse updateProduct(Long productId, ProductRequest request) {

        Long companyId = securityUtil.getCurrentCompany().getId();

        Product product = productRepository
                .findByIdAndCompanyId(productId, companyId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setProductName(request.getProductName());
        product.setArticleName(request.getArticleName());
        product.setSize(request.getSize());
        product.setDestination(request.getDestination());
        product.setDescription(request.getDescription());

        return convertToResponse(productRepository.save(product));
    }


    @Override
    public void deleteProduct(Long productId) {

        Long companyId = securityUtil.getCurrentCompany().getId();

        Product product = productRepository
                .findByIdAndCompanyId(productId, companyId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setActive(false);
        productRepository.save(product);
    }


    private String generateProductCode() {
        long number = System.currentTimeMillis() % 1000000;
        return "PRO-" + String.format("%06d", number);
    }


    private ProductResponse convertToResponse(Product product) {

        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setProductCode(product.getProductCode());
        response.setProductName(product.getProductName());
        response.setArticleName(product.getArticleName());
        response.setSize(product.getSize());
        response.setDestination(product.getDestination());
        response.setDescription(product.getDescription());
        response.setActive(product.getActive());

        if (product.getCompany() != null) {
            response.setCompanyId(product.getCompany().getId());
            response.setCompanyName(product.getCompany().getCompanyName());
        }

        return response;
    }
}