package com.freshm.pvtapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.freshm.pvtapp.dto.VendorRequest;
import com.freshm.pvtapp.dto.VendorResponse;
import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.entity.Vendor;
import com.freshm.pvtapp.enums.CodeType;
import com.freshm.pvtapp.repository.CompanyRepository;
import com.freshm.pvtapp.repository.VendorRepository;
import com.freshm.pvtapp.security.SecurityUtil;

import jakarta.transaction.Transactional;

@Service
public class VendorServiceImpl implements VendorService {


    private final VendorRepository vendorRepository;

    private final CompanyRepository companyRepository;

    private final CodeGeneratorService codeGeneratorService;

    private final SecurityUtil securityUtil;


    public VendorServiceImpl(
            VendorRepository vendorRepository,
            CompanyRepository companyRepository,
            CodeGeneratorService codeGeneratorService,
            SecurityUtil securityUtil
    ) {

        this.vendorRepository = vendorRepository;
        this.companyRepository = companyRepository;
        this.codeGeneratorService = codeGeneratorService;
        this.securityUtil = securityUtil;
    }



    @Override
    @Transactional
    public VendorResponse createVendor(
            VendorRequest request
    ) {

        Company company = securityUtil.getCurrentCompany();

        Vendor vendor = new Vendor();

        vendor.setVendorCode(
                codeGeneratorService.generateCode(
                        company,
                        CodeType.VENDOR
                )
        );

        vendor.setVendorName(request.getVendorName());
        vendor.setMobile(request.getMobile());
        vendor.setEmail(request.getEmail());
        vendor.setAddress(request.getAddress());
        vendor.setAadharNumber(request.getAadharNumber());
        vendor.setPanNumber(request.getPanNumber());
        vendor.setBankName(request.getBankName());
        vendor.setAccountNumber(request.getAccountNumber());
        vendor.setIfscCode(request.getIfscCode());

        vendor.setCompany(company);
        vendor.setActive(true);

        Vendor saved = vendorRepository.save(vendor);

        return convertToResponse(saved);
    }




    @Override
    public List<VendorResponse> getAllVendors() {

        Company company = securityUtil.getCurrentCompany();

        return vendorRepository
                .findAllByCompanyId(company.getId())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }





    @Override
    public VendorResponse getVendorById(
            Long vendorId
    ) {


        Vendor vendor =
                vendorRepository
                .findById(vendorId)
                .orElseThrow(
                        () ->
                        new RuntimeException(
                                "Vendor not found"
                        )
                );


        return convertToResponse(vendor);

    }





    @Override
    @Transactional
    public VendorResponse updateVendor(
            Long vendorId,
            VendorRequest request
    ) {


        Vendor vendor =
                vendorRepository
                .findById(vendorId)
                .orElseThrow(
                        () ->
                        new RuntimeException(
                                "Vendor not found"
                        )
                );



        vendor.setVendorName(
                request.getVendorName()
        );


        vendor.setMobile(
                request.getMobile()
        );


        vendor.setEmail(
                request.getEmail()
        );


        vendor.setAddress(
                request.getAddress()
        );


        vendor.setPanNumber(
                request.getPanNumber()
        );


        vendor.setBankName(
                request.getBankName()
        );


        vendor.setAccountNumber(
                request.getAccountNumber()
        );


        vendor.setIfscCode(
                request.getIfscCode()
        );



        Vendor updated =
                vendorRepository.save(vendor);



        return convertToResponse(updated);

    }





    @Override
    @Transactional
    public void changeStatus(
            Long vendorId,
            Boolean status
    ) {


        Vendor vendor =
                vendorRepository
                .findById(vendorId)
                .orElseThrow(
                        () ->
                        new RuntimeException(
                                "Vendor not found"
                        )
                );


        vendor.setActive(status);


        vendorRepository.save(vendor);

    }





    private VendorResponse convertToResponse(
            Vendor vendor
    ) {


        VendorResponse response =
                new VendorResponse();


        response.setId(
                vendor.getId()
        );


        response.setVendorCode(
                vendor.getVendorCode()
        );


        response.setVendorName(
                vendor.getVendorName()
        );


        response.setMobile(
                vendor.getMobile()
        );


        response.setEmail(
                vendor.getEmail()
        );


        response.setActive(
                vendor.getActive()
        );


        return response;

    }



    @Override
    @Transactional
    public void deleteVendor(Long vendorId) {

        Company company = securityUtil.getCurrentCompany();

        Vendor vendor = vendorRepository
                .findByIdAndCompanyId(
                        vendorId,
                        company.getId()
                )
                .orElseThrow(() ->
                        new RuntimeException("Vendor not found"));

        vendor.setActive(false);

        vendorRepository.save(vendor);
    }

}