package com.freshm.pvtapp.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.freshm.pvtapp.dto.FarmerRequest;
import com.freshm.pvtapp.dto.FarmerResponse;

public interface FarmerService {

    FarmerResponse createFarmer(
            FarmerRequest request,
            MultipartFile aadharFile,
            MultipartFile panFile,
            MultipartFile bankPassbookFile
    );

    FarmerResponse updateFarmer(
            Long farmerId,
            FarmerRequest request
    );

    FarmerResponse getFarmerById(
            Long farmerId
    );
    
    
    List<FarmerResponse> getFarmersByVendor(
            Long vendorId
    );

    List<FarmerResponse> getAllFarmers();

    void changeStatus(
            Long farmerId,
            Boolean status
    );
    
    
    
    void deleteFarmer(Long farmerId);

}
