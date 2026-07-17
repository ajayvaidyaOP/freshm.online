package com.freshm.pvtapp.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.freshm.pvtapp.dto.FarmerRequest;
import com.freshm.pvtapp.dto.FarmerResponse;
import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.entity.Farmer;
import com.freshm.pvtapp.entity.Vendor;
import com.freshm.pvtapp.enums.CodeType;
import com.freshm.pvtapp.exception.ResourceNotFoundException;
import com.freshm.pvtapp.repository.FarmerRepository;
import com.freshm.pvtapp.repository.VendorRepository;
import com.freshm.pvtapp.security.SecurityUtil;
import com.freshm.pvtapp.storage.FileStorageService;

import jakarta.transaction.Transactional;

@Service
public class FarmerServiceImpl implements FarmerService {


    private final FarmerRepository farmerRepository;

    private final VendorRepository vendorRepository;

    private final SecurityUtil securityUtil;

    private final FileStorageService fileStorageService;

    private final CodeGeneratorService codeGeneratorService;



    public FarmerServiceImpl(
            FarmerRepository farmerRepository,
            VendorRepository vendorRepository,
            SecurityUtil securityUtil,
            FileStorageService fileStorageService,
            CodeGeneratorService codeGeneratorService
    ) {

        this.farmerRepository = farmerRepository;
        this.vendorRepository = vendorRepository;
        this.securityUtil = securityUtil;
        this.fileStorageService = fileStorageService;
        this.codeGeneratorService = codeGeneratorService;

    }



    @Override
    @Transactional
    public FarmerResponse createFarmer(
            FarmerRequest request,
            MultipartFile aadharFile,
            MultipartFile panFile,
            MultipartFile bankPassbookFile
    ) {


        Company company =
                securityUtil.getCurrentCompany();



        Vendor vendor =
                vendorRepository
                        .findByIdAndCompanyId(
                                request.getVendorId(),
                                company.getId()
                        )
                        .orElseThrow(
                                () ->
                                new ResourceNotFoundException(
                                        "Vendor not found"
                                )
                        );



        Farmer farmer =
                new Farmer();



        String farmerCode =
                codeGeneratorService.generateCode(
                        company,
                        CodeType.FARMER
                );



        farmer.setFarmerCode(
                farmerCode
        );


        farmer.setFarmerName(
                request.getFarmerName()
        );


        farmer.setMobile(
                request.getMobile()
        );


        farmer.setEmail(
                request.getEmail()
        );


        farmer.setAddress(
                request.getAddress()
        );


        farmer.setAadharNumber(
                request.getAadharNumber()
        );


        farmer.setPanNumber(
                request.getPanNumber()
        );


        farmer.setBankName(
                request.getBankName()
        );


        farmer.setAccountNumber(
                request.getAccountNumber()
        );


        farmer.setIfscCode(
                request.getIfscCode()
        );


        farmer.setVendor(
                vendor
        );


        farmer.setCompany(
                company
        );


        farmer.setActive(
                true
        );



        if(aadharFile != null &&
                !aadharFile.isEmpty()) {


            String path =
                    fileStorageService.saveFile(
                            aadharFile,
                            "farmers/" + farmerCode,
                            "aadhar"
                    );


            farmer.setAadharPdf(path);
            

        }



        if(panFile != null &&
                !panFile.isEmpty()) {


            String path =
                    fileStorageService.saveFile(
                            panFile,
                            "farmers/" + farmerCode,
                            "pan"
                    );


            farmer.setPanPdf(
                    path
            );

        }




        if(bankPassbookFile != null &&
                !bankPassbookFile.isEmpty()) {


            String path =
                    fileStorageService.saveFile(
                            bankPassbookFile,
                            "farmers/" + farmerCode,
                            "bank-passbook"
                    );


            farmer.setPassbookPdf(
                    path
            );

        }



        Farmer saved =
                farmerRepository.save(
                        farmer
                );



        return convertToResponse(saved);

    }

    @Override
    @Transactional
    public FarmerResponse updateFarmer(
            Long farmerId,
            FarmerRequest request
    ) {


        Company company =
                securityUtil.getCurrentCompany();



        Farmer farmer =
                farmerRepository
                        .findByIdAndCompanyId(
                                farmerId,
                                company.getId()
                        )
                        .orElseThrow(
                                () ->
                                new ResourceNotFoundException(
                                        "Farmer not found"
                                )
                        );



        if(request.getVendorId() != null) {


            Vendor vendor =
                    vendorRepository
                            .findByIdAndCompanyId(
                                    request.getVendorId(),
                                    company.getId()
                            )
                            .orElseThrow(
                                    () ->
                                    new ResourceNotFoundException(
                                            "Vendor not found"
                                    )
                            );


            farmer.setVendor(vendor);

        }




        farmer.setFarmerName(
                request.getFarmerName()
        );


        farmer.setMobile(
                request.getMobile()
        );


        farmer.setEmail(
                request.getEmail()
        );


        farmer.setAddress(
                request.getAddress()
        );


        farmer.setAadharNumber(
                request.getAadharNumber()
        );


        farmer.setPanNumber(
                request.getPanNumber()
        );


        farmer.setBankName(
                request.getBankName()
        );


        farmer.setAccountNumber(
                request.getAccountNumber()
        );


        farmer.setIfscCode(
                request.getIfscCode()
        );



        Farmer updated =
                farmerRepository.save(
                        farmer
                );


        return convertToResponse(updated);

    }






    @Override
    public FarmerResponse getFarmerById(
            Long farmerId
    ) {


        Company company =
                securityUtil.getCurrentCompany();



        Farmer farmer =
                farmerRepository
                        .findByIdAndCompanyId(
                                farmerId,
                                company.getId()
                        )
                        .orElseThrow(
                                () ->
                                new ResourceNotFoundException(
                                        "Farmer not found"
                                )
                        );



        return convertToResponse(farmer);

    }






    @Override
    public List<FarmerResponse> getAllFarmers() {


        Company company =
                securityUtil.getCurrentCompany();



        return farmerRepository
                .findAllByCompanyId(
                        company.getId()
                )
                .stream()
                .map(this::convertToResponse)
                .toList();

    }


    @Override
    public void changeStatus(
            Long farmerId,
            Boolean status
    ) {


        Company company =
                securityUtil.getCurrentCompany();



        Farmer farmer =
                farmerRepository
                        .findByIdAndCompanyId(
                                farmerId,
                                company.getId()
                        )
                        .orElseThrow(
                                () ->
                                new ResourceNotFoundException(
                                        "Farmer not found"
                                )
                        );



        farmer.setActive(
                status
        );



        farmerRepository.save(
                farmer
        );
        
        

    }
    
    private FarmerResponse convertToResponse(
            Farmer farmer
    ) {

        FarmerResponse response = new FarmerResponse();

        response.setId(
                farmer.getId()
        );

        response.setFarmerCode(
                farmer.getFarmerCode()
        );

        response.setFarmerName(
                farmer.getFarmerName()
        );

        response.setMobile(
                farmer.getMobile()
        );

        response.setEmail(
                farmer.getEmail()
        );

        response.setAddress(
                farmer.getAddress()
        );

        response.setAadharNumber(
                farmer.getAadharNumber()
        );

        response.setPanNumber(
                farmer.getPanNumber()
        );

        response.setBankName(
                farmer.getBankName()
        );

        response.setAccountNumber(
                farmer.getAccountNumber()
        );

        response.setIfscCode(
                farmer.getIfscCode()
        );

        response.setAadharPdf(
                farmer.getAadharPdf()
        );

        response.setPanPdf(
                farmer.getPanPdf()
        );

        response.setPassbookPdf(
                farmer.getPassbookPdf()
        );

        response.setActive(
                farmer.getActive()
        );

        if (farmer.getVendor() != null) {

            response.setVendorId(
                    farmer.getVendor().getId()
            );

            response.setVendorCode(
                    farmer.getVendor().getVendorCode()
            );

            response.setVendorName(
                    farmer.getVendor().getVendorName()
            );

        }

        if (farmer.getCompany() != null) {

            response.setCompanyId(
                    farmer.getCompany().getId()
            );

            response.setCompanyName(
                    farmer.getCompany().getCompanyName()
            );

        }

        return response;

    }
    
    @Override
    public List<FarmerResponse> getFarmersByVendor(Long vendorId) {

        return farmerRepository
                .findByVendorId(vendorId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }



    @Override
    @Transactional
    public void deleteFarmer(Long farmerId) {

        Company company = securityUtil.getCurrentCompany();

        Farmer farmer = farmerRepository
                .findByIdAndCompanyId(
                        farmerId,
                        company.getId()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException("Farmer not found"));

        farmer.setActive(false);

        farmerRepository.save(farmer);
    }

}



 
  