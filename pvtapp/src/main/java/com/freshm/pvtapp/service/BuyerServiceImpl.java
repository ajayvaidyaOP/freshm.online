package com.freshm.pvtapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.freshm.pvtapp.dto.BuyerRequest;
import com.freshm.pvtapp.dto.BuyerResponse;
import com.freshm.pvtapp.entity.Buyer;
import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.enums.CodeType;
import com.freshm.pvtapp.exception.ResourceNotFoundException;
import com.freshm.pvtapp.repository.BuyerRepository;
import com.freshm.pvtapp.security.SecurityUtil;

import jakarta.transaction.Transactional;

@Service
public class BuyerServiceImpl implements BuyerService {

    private final BuyerRepository buyerRepository;
    private final CodeGeneratorService codeGeneratorService;
    private final SecurityUtil securityUtil;

    public BuyerServiceImpl(
            BuyerRepository buyerRepository,
            CodeGeneratorService codeGeneratorService,
            SecurityUtil securityUtil
    ) {
        this.buyerRepository = buyerRepository;
        this.codeGeneratorService = codeGeneratorService;
        this.securityUtil = securityUtil;
    }

    @Override
    @Transactional
    public BuyerResponse createBuyer(BuyerRequest request) {

        Company company = securityUtil.getCurrentCompany();

        Buyer buyer = new Buyer();

        // Requires CodeType.BUYER (add it to the CodeType enum).
        buyer.setBuyerCode(
                codeGeneratorService.generateCode(company, CodeType.BUYER)
        );

        buyer.setBuyerName(request.getBuyerName());
        buyer.setContactPerson(request.getContactPerson());
        buyer.setMobile(request.getMobile());
        buyer.setEmail(request.getEmail());
        buyer.setAddress(request.getAddress());
        buyer.setDestination(request.getDestination());
        buyer.setGstNumber(request.getGstNumber());
        buyer.setPanNumber(request.getPanNumber());

        buyer.setCompany(company);
        buyer.setActive(true);

        return convertToResponse(buyerRepository.save(buyer));
    }

    @Override
    public List<BuyerResponse> getAllBuyers() {

        Company company = securityUtil.getCurrentCompany();

        return buyerRepository
                .findAllByCompanyId(company.getId())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public BuyerResponse getBuyerById(Long id) {

        Company company = securityUtil.getCurrentCompany();

        Buyer buyer = buyerRepository
                .findByIdAndCompanyId(id, company.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Buyer not found"));

        return convertToResponse(buyer);
    }

    @Override
    @Transactional
    public BuyerResponse updateBuyer(Long id, BuyerRequest request) {

        Company company = securityUtil.getCurrentCompany();

        Buyer buyer = buyerRepository
                .findByIdAndCompanyId(id, company.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Buyer not found"));

        buyer.setBuyerName(request.getBuyerName());
        buyer.setContactPerson(request.getContactPerson());
        buyer.setMobile(request.getMobile());
        buyer.setEmail(request.getEmail());
        buyer.setAddress(request.getAddress());
        buyer.setDestination(request.getDestination());
        buyer.setGstNumber(request.getGstNumber());
        buyer.setPanNumber(request.getPanNumber());

        return convertToResponse(buyerRepository.save(buyer));
    }

    @Override
    @Transactional
    public void changeStatus(Long id, Boolean status) {

        Company company = securityUtil.getCurrentCompany();

        Buyer buyer = buyerRepository
                .findByIdAndCompanyId(id, company.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Buyer not found"));

        buyer.setActive(status);
        buyerRepository.save(buyer);
    }

    @Override
    @Transactional
    public void deleteBuyer(Long id) {

        Company company = securityUtil.getCurrentCompany();

        Buyer buyer = buyerRepository
                .findByIdAndCompanyId(id, company.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Buyer not found"));

        buyer.setActive(false);   // soft delete, same as Vendor
        buyerRepository.save(buyer);
    }

    private BuyerResponse convertToResponse(Buyer buyer) {

        BuyerResponse response = new BuyerResponse();

        response.setId(buyer.getId());
        response.setBuyerCode(buyer.getBuyerCode());
        response.setBuyerName(buyer.getBuyerName());
        response.setContactPerson(buyer.getContactPerson());
        response.setMobile(buyer.getMobile());
        response.setEmail(buyer.getEmail());
        response.setAddress(buyer.getAddress());
        response.setDestination(buyer.getDestination());
        response.setGstNumber(buyer.getGstNumber());
        response.setPanNumber(buyer.getPanNumber());
        response.setActive(buyer.getActive());

        return response;
    }
}
