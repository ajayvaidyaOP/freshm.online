package com.freshm.pvtapp.service;

import java.util.List;

import com.freshm.pvtapp.dto.SaleRequest;
import com.freshm.pvtapp.dto.SaleResponse;

public interface SaleService {
    SaleResponse createSale(SaleRequest request);
    List<SaleResponse> getAllSales();
    SaleResponse getSaleById(Long id);
    void deleteSale(Long id);
}
