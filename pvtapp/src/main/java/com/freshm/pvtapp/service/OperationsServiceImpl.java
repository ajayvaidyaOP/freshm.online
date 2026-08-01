package com.freshm.pvtapp.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.freshm.pvtapp.dto.*;
import com.freshm.pvtapp.entity.*;
import com.freshm.pvtapp.exception.ResourceNotFoundException;
import com.freshm.pvtapp.repository.*;
import com.freshm.pvtapp.security.SecurityUtil;

@Service
@Transactional
public class OperationsServiceImpl implements OperationsService {

    private final MaterialReceiptRepository receiptRepo;
    private final MaterialReturnRepository returnRepo;
    private final PackingEntryRepository packingRepo;
    private final ProductRepository productRepo;
    private final SecurityUtil securityUtil;

    public OperationsServiceImpl(
            MaterialReceiptRepository receiptRepo,
            MaterialReturnRepository returnRepo,
            PackingEntryRepository packingRepo,
            ProductRepository productRepo,
            SecurityUtil securityUtil) {
        this.receiptRepo = receiptRepo;
        this.returnRepo = returnRepo;
        this.packingRepo = packingRepo;
        this.productRepo = productRepo;
        this.securityUtil = securityUtil;
    }

    // ---------- Receiving ----------

    @Override
    public MaterialReceiptResponse createReceipt(MaterialReceiptRequest req) {
        Company company = securityUtil.getCurrentCompany();

        if (req.getProductId() == null) {
            throw new IllegalArgumentException("Select an article/product for the receipt.");
        }
        Product product = productRepo
                .findByIdAndCompanyId(req.getProductId(), company.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        MaterialReceipt r = new MaterialReceipt();
        r.setCompany(company);
        r.setProduct(product);
        r.setReceiptNumber(code("REC"));
        r.setReceiptDate(req.getReceiptDate() != null ? req.getReceiptDate() : LocalDate.now());
        r.setEmptyCrateUnitWeight(nz(req.getEmptyCrateUnitWeight()));
        r.setRemarks(req.getRemarks());
        r.setCrateLines(toCrateLines(req.getCrateLines()));
        r.recompute();

        return toReceiptResponse(receiptRepo.save(r));
    }

    @Override
    public List<MaterialReceiptResponse> getAllReceipts() {
        Long cid = securityUtil.getCurrentCompany().getId();
        return receiptRepo.findAllByCompanyIdOrderByIdDesc(cid)
                .stream().map(this::toReceiptResponse).toList();
    }

    @Override
    public MaterialReceiptResponse getReceipt(Long id) {
        Long cid = securityUtil.getCurrentCompany().getId();
        return toReceiptResponse(receiptRepo.findByIdAndCompanyId(id, cid)
                .orElseThrow(() -> new ResourceNotFoundException("Receipt not found")));
    }

    @Override
    public void deleteReceipt(Long id) {
        Long cid = securityUtil.getCurrentCompany().getId();
        MaterialReceipt r = receiptRepo.findByIdAndCompanyId(id, cid)
                .orElseThrow(() -> new ResourceNotFoundException("Receipt not found"));
        receiptRepo.delete(r);
    }

    // ---------- Returns (reject) ----------

    @Override
    public MaterialReturnResponse createReturn(MaterialReturnRequest req) {
        Company company = securityUtil.getCurrentCompany();

        if (req.getReceiptId() == null) {
            throw new IllegalArgumentException("Select the receipt this return belongs to.");
        }
        MaterialReceipt receipt = receiptRepo
                .findByIdAndCompanyId(req.getReceiptId(), company.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Receipt not found"));

        MaterialReturn ret = new MaterialReturn();
        ret.setCompany(company);
        ret.setReceipt(receipt);
        ret.setReturnNumber(code("RET"));
        ret.setReturnDate(req.getReturnDate() != null ? req.getReturnDate() : LocalDate.now());
        ret.setEmptyCrateUnitWeight(nz(req.getEmptyCrateUnitWeight()));
        ret.setRemarks(req.getRemarks());
        ret.setCrateLines(toCrateLines(req.getCrateLines()));
        ret.recompute();

        MaterialReturn saved = returnRepo.save(ret);

        // subtract from the receipt's stock
        receipt.setReturnedWeight(nz(receipt.getReturnedWeight()) + saved.getNetWeight());
        receipt.recomputeAvailable();
        receiptRepo.save(receipt);

        return toReturnResponse(saved);
    }

    @Override
    public List<MaterialReturnResponse> getAllReturns() {
        Long cid = securityUtil.getCurrentCompany().getId();
        return returnRepo.findAllByCompanyIdOrderByIdDesc(cid)
                .stream().map(this::toReturnResponse).toList();
    }

    @Override
    public void deleteReturn(Long id) {
        Long cid = securityUtil.getCurrentCompany().getId();
        MaterialReturn ret = returnRepo.findByIdAndCompanyId(id, cid)
                .orElseThrow(() -> new ResourceNotFoundException("Return not found"));
        // give the weight back to the receipt
        MaterialReceipt receipt = ret.getReceipt();
        if (receipt != null) {
            receipt.setReturnedWeight(Math.max(0, nz(receipt.getReturnedWeight()) - nz(ret.getNetWeight())));
            receipt.recomputeAvailable();
            receiptRepo.save(receipt);
        }
        returnRepo.delete(ret);
    }

    // ---------- Sorting + packing ----------

    @Override
    public PackingResponse createPacking(PackingRequest req) {
        Company company = securityUtil.getCurrentCompany();

        PackingEntry p = new PackingEntry();
        p.setCompany(company);
        p.setPackNumber(code("PCK"));
        p.setPackDate(req.getPackDate() != null ? req.getPackDate() : LocalDate.now());
        p.setSizeGrade(req.getSizeGrade());
        p.setDestination(req.getDestination());
        p.setInputWeight(nz(req.getInputWeight()));
        p.setBoxSize(nz(req.getBoxSize()));
        p.setRemarks(req.getRemarks());

        MaterialReceipt receipt = null;
        if (req.getReceiptId() != null) {
            receipt = receiptRepo.findByIdAndCompanyId(req.getReceiptId(), company.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Receipt not found"));
            p.setReceipt(receipt);
            p.setProduct(receipt.getProduct());
        } else if (req.getProductId() != null) {
            p.setProduct(productRepo.findByIdAndCompanyId(req.getProductId(), company.getId())
                    .orElse(null));
        }

        p.recompute();
        PackingEntry saved = packingRepo.save(p);

        if (receipt != null) {
            receipt.setPackedWeight(nz(receipt.getPackedWeight()) + saved.getInputWeight());
            receipt.recomputeAvailable();
            receiptRepo.save(receipt);
        }
        return toPackingResponse(saved);
    }

    @Override
    public List<PackingResponse> getAllPacking() {
        Long cid = securityUtil.getCurrentCompany().getId();
        return packingRepo.findAllByCompanyIdOrderByIdDesc(cid)
                .stream().map(this::toPackingResponse).toList();
    }

    @Override
    public void deletePacking(Long id) {
        Long cid = securityUtil.getCurrentCompany().getId();
        PackingEntry p = packingRepo.findByIdAndCompanyId(id, cid)
                .orElseThrow(() -> new ResourceNotFoundException("Packing entry not found"));
        MaterialReceipt receipt = p.getReceipt();
        if (receipt != null) {
            receipt.setPackedWeight(Math.max(0, nz(receipt.getPackedWeight()) - nz(p.getInputWeight())));
            receipt.recomputeAvailable();
            receiptRepo.save(receipt);
        }
        packingRepo.delete(p);
    }

    // ---------- helpers ----------

    private String code(String prefix) {
        long n = System.currentTimeMillis() % 1000000;
        return prefix + "-" + String.format("%06d", n);
    }

    private static double nz(Double d) { return d == null ? 0d : d; }

    private List<CrateLine> toCrateLines(List<CrateLineDto> dtos) {
        List<CrateLine> out = new ArrayList<>();
        if (dtos != null) {
            for (CrateLineDto d : dtos) {
                if (d == null) continue;
                out.add(new CrateLine(d.getCrateCount(), d.getGrossWeight()));
            }
        }
        return out;
    }

    private List<CrateLineDto> fromCrateLines(List<CrateLine> lines) {
        List<CrateLineDto> out = new ArrayList<>();
        if (lines != null) {
            for (CrateLine l : lines) {
                CrateLineDto d = new CrateLineDto();
                d.setCrateCount(l.getCrateCount());
                d.setGrossWeight(l.getGrossWeight());
                out.add(d);
            }
        }
        return out;
    }

    private MaterialReceiptResponse toReceiptResponse(MaterialReceipt r) {
        MaterialReceiptResponse res = new MaterialReceiptResponse();
        res.setId(r.getId());
        res.setReceiptNumber(r.getReceiptNumber());
        res.setReceiptDate(r.getReceiptDate());
        if (r.getProduct() != null) {
            res.setProductId(r.getProduct().getId());
            res.setProductName(r.getProduct().getProductName());
            res.setArticleName(r.getProduct().getArticleName());
        }
        res.setTotalCrates(r.getTotalCrates());
        res.setGrossWeight(r.getGrossWeight());
        res.setEmptyCrateUnitWeight(r.getEmptyCrateUnitWeight());
        res.setEmptyCrateTotalWeight(r.getEmptyCrateTotalWeight());
        res.setNetWeight(r.getNetWeight());
        res.setReturnedWeight(r.getReturnedWeight());
        res.setPackedWeight(r.getPackedWeight());
        res.setAvailableWeight(r.getAvailableWeight());
        res.setRemarks(r.getRemarks());
        res.setCrateLines(fromCrateLines(r.getCrateLines()));
        return res;
    }

    private MaterialReturnResponse toReturnResponse(MaterialReturn r) {
        MaterialReturnResponse res = new MaterialReturnResponse();
        res.setId(r.getId());
        res.setReturnNumber(r.getReturnNumber());
        res.setReturnDate(r.getReturnDate());
        if (r.getReceipt() != null) {
            res.setReceiptId(r.getReceipt().getId());
            res.setReceiptNumber(r.getReceipt().getReceiptNumber());
            if (r.getReceipt().getProduct() != null) {
                res.setProductName(r.getReceipt().getProduct().getProductName());
            }
        }
        res.setTotalCrates(r.getTotalCrates());
        res.setGrossWeight(r.getGrossWeight());
        res.setEmptyCrateUnitWeight(r.getEmptyCrateUnitWeight());
        res.setNetWeight(r.getNetWeight());
        res.setRemarks(r.getRemarks());
        res.setCrateLines(fromCrateLines(r.getCrateLines()));
        return res;
    }

    private PackingResponse toPackingResponse(PackingEntry p) {
        PackingResponse res = new PackingResponse();
        res.setId(p.getId());
        res.setPackNumber(p.getPackNumber());
        res.setPackDate(p.getPackDate());
        if (p.getReceipt() != null) res.setReceiptId(p.getReceipt().getId());
        if (p.getProduct() != null) res.setProductName(p.getProduct().getProductName());
        res.setSizeGrade(p.getSizeGrade());
        res.setDestination(p.getDestination());
        res.setInputWeight(p.getInputWeight());
        res.setBoxSize(p.getBoxSize());
        res.setTotalBoxes(p.getTotalBoxes());
        res.setLeftoverWeight(p.getLeftoverWeight());
        res.setRemarks(p.getRemarks());
        return res;
    }
}
