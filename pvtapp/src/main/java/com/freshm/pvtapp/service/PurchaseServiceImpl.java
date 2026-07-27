package com.freshm.pvtapp.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.freshm.pvtapp.dto.PurchaseItemRequest;
import com.freshm.pvtapp.dto.PurchaseItemResponse;
import com.freshm.pvtapp.dto.PurchaseRequest;
import com.freshm.pvtapp.dto.PurchaseResponse;
import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.entity.Farmer;
import com.freshm.pvtapp.entity.Product;
import com.freshm.pvtapp.entity.Purchase;
import com.freshm.pvtapp.entity.PurchaseItem;
import com.freshm.pvtapp.entity.Vendor;
import com.freshm.pvtapp.enums.CodeType;
import com.freshm.pvtapp.enums.PaymentStatus;
import com.freshm.pvtapp.exception.BadRequestException;
import com.freshm.pvtapp.exception.ResourceNotFoundException;
import com.freshm.pvtapp.repository.FarmerRepository;
import com.freshm.pvtapp.repository.ProductRepository;
import com.freshm.pvtapp.repository.PurchaseRepository;
import com.freshm.pvtapp.repository.VendorRepository;
import com.freshm.pvtapp.security.SecurityUtil;

import jakarta.transaction.Transactional;

@Service
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseRepository purchaseRepository;

    private final ProductRepository productRepository;

    private final VendorRepository vendorRepository;

    private final FarmerRepository farmerRepository;

    private final SecurityUtil securityUtil;

    private final CodeGeneratorService codeGeneratorService;


    public PurchaseServiceImpl(
            PurchaseRepository purchaseRepository,
            ProductRepository productRepository,
            VendorRepository vendorRepository,
            FarmerRepository farmerRepository,
            SecurityUtil securityUtil,
            CodeGeneratorService codeGeneratorService
    ) {
        this.purchaseRepository = purchaseRepository;
        this.productRepository = productRepository;
        this.vendorRepository = vendorRepository;
        this.farmerRepository = farmerRepository;
        this.securityUtil = securityUtil;
        this.codeGeneratorService = codeGeneratorService;
    }


    @Override
    @Transactional
    public PurchaseResponse createPurchase(PurchaseRequest request) {

        Company company =
                securityUtil.getCurrentCompany();


        if (request.getVendorId() == null
                && request.getFarmerId() == null) {

            throw new BadRequestException(
                    "Either a vendor or a farmer must be selected."
            );
        }


        if (request.getItems() == null
                || request.getItems().isEmpty()) {

            throw new BadRequestException(
                    "At least one item is required."
            );
        }


        Vendor vendor = null;

        if (request.getVendorId() != null) {

            vendor = vendorRepository
                    .findByIdAndCompanyId(
                            request.getVendorId(),
                            company.getId()
                    )
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Vendor not found")
                    );
        }


        Farmer farmer = null;

        if (request.getFarmerId() != null) {

            farmer = farmerRepository
                    .findByIdAndCompanyId(
                            request.getFarmerId(),
                            company.getId()
                    )
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Farmer not found")
                    );
        }


        String purchaseNumber =
                codeGeneratorService.generateCode(
                        company,
                        CodeType.PURCHASE
                );


        Purchase purchase =
                Purchase.builder()
                        .purchaseNumber(purchaseNumber)
                        .purchaseDate(LocalDate.now())
                        .vendor(vendor)
                        .farmer(farmer)
                        .company(company)
                        .remarks(request.getRemarks())
                        .paymentStatus(PaymentStatus.UNPAID)
                        .totalQuantity(0.0)
                        .totalAmount(0.0)
                        .build();


        List<PurchaseItem> items = new ArrayList<>();

        double totalQuantity = 0.0;

        double totalAmount = 0.0;


        for (PurchaseItemRequest itemRequest : request.getItems()) {

            Product product =
                    productRepository
                            .findByIdAndCompanyId(
                                    itemRequest.getProductId(),
                                    company.getId()
                            )
                            .orElseThrow(() ->
                                    new ResourceNotFoundException("Product not found")
                            );


            if (itemRequest.getRate() == null
                    || itemRequest.getRate() <= 0) {

                throw new BadRequestException(
                        "Rate must be greater than zero."
                );
            }


            boolean usesCrates =
                    Boolean.TRUE.equals(itemRequest.getUsesCrates());

            Integer crateCount = null;

            Double crateGrossWeight = null;

            Double crateUnitTareWeight = null;

            Double crateTotalTareWeight = null;

            double netQuantity;


            if (usesCrates) {

                if (itemRequest.getCrateCount() == null
                        || itemRequest.getCrateCount() <= 0) {

                    throw new BadRequestException(
                            "Crate count is required when receiving material using crates."
                    );
                }


                if (itemRequest.getCrateGrossWeight() == null
                        || itemRequest.getCrateGrossWeight() <= 0) {

                    throw new BadRequestException(
                            "Total crate weight is required when receiving material using crates."
                    );
                }


                crateCount = itemRequest.getCrateCount();

                crateGrossWeight = round2(itemRequest.getCrateGrossWeight());


                if (itemRequest.getCrateUnitTareWeight() != null
                        && itemRequest.getCrateUnitTareWeight() > 0) {

                    crateUnitTareWeight = itemRequest.getCrateUnitTareWeight();

                    crateTotalTareWeight =
                            round2(crateUnitTareWeight * crateCount);

                    netQuantity =
                            crateGrossWeight - crateTotalTareWeight;

                } else {

                    // "sometimes without crate weight deduction" —
                    // gross weight is used as-is.
                    crateTotalTareWeight = 0.0;

                    netQuantity = crateGrossWeight;
                }


                if (netQuantity <= 0) {

                    throw new BadRequestException(
                            "Net weight after crate deduction must be greater than zero. "
                                    + "Please check the crate tare weight."
                    );
                }

            } else {

                if (itemRequest.getQuantity() == null
                        || itemRequest.getQuantity() <= 0) {

                    throw new BadRequestException(
                            "Quantity is required."
                    );
                }

                netQuantity = itemRequest.getQuantity();
            }


            netQuantity = round2(netQuantity);

            double amount = round2(netQuantity * itemRequest.getRate());


            PurchaseItem item =
                    PurchaseItem.builder()
                            .purchase(purchase)
                            .product(product)
                            .quantity(netQuantity)
                            .rate(itemRequest.getRate())
                            .amount(amount)
                            .usesCrates(usesCrates)
                            .crateCount(crateCount)
                            .crateGrossWeight(crateGrossWeight)
                            .crateUnitTareWeight(crateUnitTareWeight)
                            .crateTotalTareWeight(crateTotalTareWeight)
                            .remarks(itemRequest.getRemarks())
                            .build();


            items.add(item);

            totalQuantity += netQuantity;

            totalAmount += amount;
        }


        purchase.setItems(items);

        purchase.setTotalQuantity(round2(totalQuantity));

        purchase.setTotalAmount(round2(totalAmount));


        Purchase saved =
                purchaseRepository.save(purchase);


        return convertToResponse(saved);
    }


    @Override
    public List<PurchaseResponse> getAllPurchases() {

        Company company =
                securityUtil.getCurrentCompany();

        return purchaseRepository
                .findAllByCompanyId(company.getId())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    @Override
    public PurchaseResponse getPurchaseById(Long id) {

        Company company =
                securityUtil.getCurrentCompany();

        Purchase purchase =
                purchaseRepository
                        .findByIdAndCompanyId(id, company.getId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Purchase not found")
                        );

        return convertToResponse(purchase);
    }


    private PurchaseResponse convertToResponse(Purchase purchase) {

        PurchaseResponse response = new PurchaseResponse();

        response.setId(purchase.getId());
        response.setPurchaseNumber(purchase.getPurchaseNumber());
        response.setPurchaseDate(purchase.getPurchaseDate());

        response.setVendorName(
                purchase.getVendor() != null
                        ? purchase.getVendor().getVendorName()
                        : null);

        response.setFarmerName(
                purchase.getFarmer() != null
                        ? purchase.getFarmer().getFarmerName()
                        : null);

        response.setTotalQuantity(purchase.getTotalQuantity());
        response.setTotalAmount(purchase.getTotalAmount());
        response.setPaymentStatus(purchase.getPaymentStatus().name());

        response.setItems(
                purchase.getItems()
                        .stream()
                        .map(this::convertItemToResponse)
                        .toList());

        return response;
    }

    private PurchaseItemResponse convertItemToResponse(PurchaseItem item) {

        PurchaseItemResponse response = new PurchaseItemResponse();

        response.setProductName(item.getProduct().getProductName());
        response.setQuantity(item.getQuantity());
        response.setRate(item.getRate());
        response.setAmount(item.getAmount());
        response.setUsesCrates(item.getUsesCrates());
        response.setCrateCount(item.getCrateCount());
        response.setCrateGrossWeight(item.getCrateGrossWeight());
        response.setCrateUnitTareWeight(item.getCrateUnitTareWeight());
        response.setCrateTotalTareWeight(item.getCrateTotalTareWeight());

        return response;
    }


    /**
     * Rounds to 2 decimal places — machine weight readings
     * (e.g. 84.23 kg) and money amounts should never carry
     * floating-point noise into stored/returned values.
     */
    private double round2(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

}
