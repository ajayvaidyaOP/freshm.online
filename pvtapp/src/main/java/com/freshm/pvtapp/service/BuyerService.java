package com.freshm.pvtapp.service;

import java.util.List;

import com.freshm.pvtapp.dto.BuyerRequest;
import com.freshm.pvtapp.dto.BuyerResponse;

public interface BuyerService {

    BuyerResponse createBuyer(BuyerRequest request);

    List<BuyerResponse> getAllBuyers();

    BuyerResponse getBuyerById(Long id);

    BuyerResponse updateBuyer(Long id, BuyerRequest request);

    void changeStatus(Long id, Boolean status);

    void deleteBuyer(Long id);
}
