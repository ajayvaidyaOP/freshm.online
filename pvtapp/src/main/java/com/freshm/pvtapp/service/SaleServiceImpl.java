package com.freshm.pvtapp.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.freshm.pvtapp.dto.SaleItemRequest;
import com.freshm.pvtapp.dto.SaleItemResponse;
import com.freshm.pvtapp.dto.SaleRequest;
import com.freshm.pvtapp.dto.SaleResponse;
import com.freshm.pvtapp.entity.Buyer;
import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.entity.Product;
import com.freshm.pvtapp.entity.Sale;
import com.freshm.pvtapp.entity.SaleItem;
import com.freshm.pvtapp.enums.CodeType;
import com.freshm.pvtapp.exception.ResourceNotFoundException;
import com.freshm.pvtapp.repository.BuyerRepository;
import com.freshm.pvtapp.repository.ProductRepository;
import com.freshm.pvtapp.repository.SaleRepository;
import com.freshm.pvtapp.security.SecurityUtil;
import com.freshm.pvtapp.util.NumberToWords;

import jakarta.transaction.Transactional;

@Service
public class SaleServiceImpl implements SaleService {

    private final SaleRepository saleRepository;
    private final BuyerRepository buyerRepository;
    private final ProductRepository productRepository;
    private final CodeGeneratorService codeGeneratorService;
    private final SecurityUtil securityUtil;

    public SaleServiceImpl(
            SaleRepository saleRepository,
            BuyerRepository buyerRepository,
            ProductRepository productRepository,
            CodeGeneratorService codeGeneratorService,
            SecurityUtil securityUtil) {
        this.saleRepository = saleRepository;
        this.buyerRepository = buyerRepository;
        this.productRepository = productRepository;
        this.codeGeneratorService = codeGeneratorService;
        this.securityUtil = securityUtil;
    }

    @Override
    @Transactional
    public SaleResponse createSale(SaleRequest request) {

        Company company = securityUtil.getCurrentCompany();

        Sale sale = new Sale();
        sale.setCompany(company);
        sale.setSaleNumber(codeGeneratorService.generateCode(company, CodeType.SALE));
        sale.setSaleDate(request.getSaleDate() != null ? request.getSaleDate() : LocalDate.now());
        sale.setLetterHeadName(
                (request.getLetterHeadName() != null && !request.getLetterHeadName().isBlank())
                        ? request.getLetterHeadName()
                        : company.getCompanyName());
        sale.setHamali(nz(request.getHamali()));
        sale.setCommission(nz(request.getCommission()));
        sale.setTransportAdvance(nz(request.getTransportAdvance()));
        sale.setRemarks(request.getRemarks());
        sale.setTransporterName(request.getTransporterName());
        sale.setTransporterContact(request.getTransporterContact());
        sale.setVehicleNumber(request.getVehicleNumber());

        if (request.getBuyerId() != null) {
            Buyer buyer = buyerRepository
                    .findByIdAndCompanyId(request.getBuyerId(), company.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Buyer not found"));
            sale.setBuyer(buyer);
        }

        double productTotal = 0d;

        if (request.getItems() != null) {
            for (SaleItemRequest ir : request.getItems()) {
                if (ir.getDescription() == null || ir.getDescription().isBlank()) continue;

                double price = nz(ir.getPrice());
                double weight = nz(ir.getWeightKg());
                double count = nz(ir.getItemCount());
                double qty = (count > 0 && weight > 0) ? count * weight   // boxes × kg/box
                           : (weight > 0) ? weight               // total kg
                           : count;                              // pieces
                double amount = qty * price;

                SaleItem item = new SaleItem();
                item.setDescription(ir.getDescription());
                item.setItemCount(ir.getItemCount());
                item.setWeightKg(ir.getWeightKg());
                item.setPrice(price);
                item.setAmount(amount);

                if (ir.getProductId() != null) {
                    Product p = productRepository
                            .findByIdAndCompanyId(ir.getProductId(), company.getId())
                            .orElse(null);
                    item.setProduct(p);
                }

                sale.addItem(item);
                productTotal += amount;
            }
        }

        double grandTotal = productTotal
                + sale.getHamali() + sale.getCommission() + sale.getTransportAdvance();

        sale.setProductTotal(round2(productTotal));
        sale.setGrandTotal(round2(grandTotal));
        sale.setAmountInWords(NumberToWords.toIndianRupeeWords(round2(grandTotal)));

        return toResponse(saleRepository.save(sale));
    }

    @Override
    public List<SaleResponse> getAllSales() {
        Company company = securityUtil.getCurrentCompany();
        return saleRepository.findAllByCompanyIdOrderByIdDesc(company.getId())
                .stream().map(this::toResponse).toList();
    }

    @Override
    public SaleResponse getSaleById(Long id) {
        Company company = securityUtil.getCurrentCompany();
        Sale sale = saleRepository.findByIdAndCompanyId(id, company.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Sale not found"));
        return toResponse(sale);
    }

    @Override
    @Transactional
    public void deleteSale(Long id) {
        Company company = securityUtil.getCurrentCompany();
        Sale sale = saleRepository.findByIdAndCompanyId(id, company.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Sale not found"));
        saleRepository.delete(sale);
    }

    private SaleResponse toResponse(Sale s) {
        SaleResponse r = new SaleResponse();
        r.setId(s.getId());
        r.setSaleNumber(s.getSaleNumber());
        r.setSaleDate(s.getSaleDate());
        r.setLetterHeadName(s.getLetterHeadName());
        r.setHamali(s.getHamali());
        r.setCommission(s.getCommission());
        r.setTransportAdvance(s.getTransportAdvance());
        r.setProductTotal(s.getProductTotal());
        r.setGrandTotal(s.getGrandTotal());
        r.setAmountInWords(s.getAmountInWords());
        r.setRemarks(s.getRemarks());
        r.setTransporterName(s.getTransporterName());
        r.setTransporterContact(s.getTransporterContact());
        r.setVehicleNumber(s.getVehicleNumber());

        if (s.getBuyer() != null) {
            r.setBuyerId(s.getBuyer().getId());
            r.setBuyerName(s.getBuyer().getBuyerName());
            r.setBuyerMobile(s.getBuyer().getMobile());
            r.setBuyerAddress(s.getBuyer().getAddress());
        }

        r.setItems(s.getItems().stream().map(i -> {
            SaleItemResponse ir = new SaleItemResponse();
            ir.setId(i.getId());
            ir.setDescription(i.getDescription());
            ir.setItemCount(i.getItemCount());
            ir.setWeightKg(i.getWeightKg());
            ir.setPrice(i.getPrice());
            ir.setAmount(i.getAmount());
            return ir;
        }).toList());

        return r;
    }

    private static double nz(Double d) { return d == null ? 0d : d; }
    private static double round2(double d) { return Math.round(d * 100.0) / 100.0; }
}
