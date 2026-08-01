package com.freshm.pvtapp.service;

import java.util.List;

import com.freshm.pvtapp.dto.*;

public interface OperationsService {
    // Receiving
    MaterialReceiptResponse createReceipt(MaterialReceiptRequest request);
    List<MaterialReceiptResponse> getAllReceipts();
    MaterialReceiptResponse getReceipt(Long id);
    void deleteReceipt(Long id);

    // Returns (reject)
    MaterialReturnResponse createReturn(MaterialReturnRequest request);
    List<MaterialReturnResponse> getAllReturns();
    void deleteReturn(Long id);

    // Sorting + packing
    PackingResponse createPacking(PackingRequest request);
    List<PackingResponse> getAllPacking();
    void deletePacking(Long id);
}
