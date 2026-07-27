package com.freshm.pvtapp.service;

import java.util.List;

import com.freshm.pvtapp.dto.PurchaseRequest;
import com.freshm.pvtapp.dto.PurchaseResponse;

public interface PurchaseService {

    /**
     * Create a new material receipt / purchase.
     * Computes each item's net quantity (with crate/tare deduction
     * when applicable) and the purchase totals server-side.
     */
    PurchaseResponse createPurchase(PurchaseRequest request);

    /**
     * All purchases for the current user's company.
     */
    List<PurchaseResponse> getAllPurchases();

    /**
     * Single purchase, scoped to the current user's company.
     */
    PurchaseResponse getPurchaseById(Long id);

}
