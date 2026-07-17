package com.freshm.pvtapp.service;


import com.freshm.pvtapp.dto.CompanyRequest;
import com.freshm.pvtapp.dto.CompanyResponse;

import java.util.List;


public interface CompanyService {


    CompanyResponse createCompany(
            CompanyRequest request
    );


    List<CompanyResponse> getAllCompanies();


    CompanyResponse getCompanyById(
            Long id
    );


    CompanyResponse updateCompany(
            Long id,
            CompanyRequest request
    );

    void changeStatus(
            Long id,
            Boolean status
    );

    void deleteCompany(
            Long id
    );

}