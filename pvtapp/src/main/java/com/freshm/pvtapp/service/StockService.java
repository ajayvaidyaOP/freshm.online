package com.freshm.pvtapp.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.freshm.pvtapp.dto.ProductStockResponse;
import com.freshm.pvtapp.entity.MaterialReceipt;
import com.freshm.pvtapp.entity.Product;
import com.freshm.pvtapp.entity.Sale;
import com.freshm.pvtapp.entity.SaleItem;
import com.freshm.pvtapp.repository.MaterialReceiptRepository;
import com.freshm.pvtapp.repository.ProductRepository;
import com.freshm.pvtapp.repository.SaleRepository;
import com.freshm.pvtapp.security.SecurityUtil;

/**
 * Product-level stock that ties the whole chain together:
 *   onHand = received net - returned - sold
 * Every sale of a product lowers its on-hand automatically (sold grows).
 */
public interface StockService {
    List<ProductStockResponse> getStock();
}

@Service
@Transactional
class StockServiceImpl implements StockService {

    private final ProductRepository productRepo;
    private final MaterialReceiptRepository receiptRepo;
    private final SaleRepository saleRepo;
    private final SecurityUtil securityUtil;

    StockServiceImpl(ProductRepository productRepo,
                     MaterialReceiptRepository receiptRepo,
                     SaleRepository saleRepo,
                     SecurityUtil securityUtil) {
        this.productRepo = productRepo;
        this.receiptRepo = receiptRepo;
        this.saleRepo = saleRepo;
        this.securityUtil = securityUtil;
    }

    @Override
    public List<ProductStockResponse> getStock() {
        Long cid = securityUtil.getCurrentCompany().getId();

        Map<Long, double[]> agg = new HashMap<>(); // productId -> [net, returned, packed, sold]

        for (MaterialReceipt r : receiptRepo.findAllByCompanyIdOrderByIdDesc(cid)) {
            if (r.getProduct() == null) continue;
            double[] a = agg.computeIfAbsent(r.getProduct().getId(), k -> new double[4]);
            a[0] += nz(r.getNetWeight());
            a[1] += nz(r.getReturnedWeight());
            a[2] += nz(r.getPackedWeight());
        }

        for (Sale s : saleRepo.findAllByCompanyIdOrderByIdDesc(cid)) {
            if (s.getItems() == null) continue;
            for (SaleItem it : s.getItems()) {
                if (it.getProduct() == null || it.getWeightKg() == null) continue;
                double[] a = agg.computeIfAbsent(it.getProduct().getId(), k -> new double[4]);
                a[3] += nz(it.getWeightKg());
            }
        }

        List<ProductStockResponse> out = new ArrayList<>();
        for (Product p : productRepo.findAllByCompanyId(cid)) {
            double[] a = agg.getOrDefault(p.getId(), new double[4]);
            ProductStockResponse r = new ProductStockResponse();
            r.setProductId(p.getId());
            r.setProductName(p.getProductName());
            r.setArticleName(p.getArticleName());
            r.setReceivedNet(round2(a[0]));
            r.setReturned(round2(a[1]));
            r.setPacked(round2(a[2]));
            r.setSold(round2(a[3]));
            r.setOnHand(round2(a[0] - a[1] - a[3]));
            out.add(r);
        }
        return out;
    }

    private static double nz(Double d) { return d == null ? 0d : d; }
    private static double round2(double d) { return Math.round(d * 100.0) / 100.0; }
}
