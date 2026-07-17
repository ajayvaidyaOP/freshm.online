package com.freshm.pvtapp.service;

import java.util.List;

import com.freshm.pvtapp.dto.VendorRequest;
import com.freshm.pvtapp.dto.VendorResponse;

public interface VendorService {

    VendorResponse createVendor(
            VendorRequest request
    );

    List<VendorResponse> getAllVendors();

    VendorResponse getVendorById(
            Long vendorId
    );

    VendorResponse updateVendor(
            Long vendorId,
            VendorRequest request
    );

    void changeStatus(
            Long vendorId,
            Boolean status
    );

    void deleteVendor(
            Long vendorId
    );
}