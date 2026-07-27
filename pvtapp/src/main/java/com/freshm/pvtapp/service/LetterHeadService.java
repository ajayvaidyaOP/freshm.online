package com.freshm.pvtapp.service;

import java.util.List;

import com.freshm.pvtapp.dto.LetterHeadRequest;
import com.freshm.pvtapp.dto.LetterHeadResponse;

public interface LetterHeadService {

    LetterHeadResponse createLetterHead(LetterHeadRequest request);

    List<LetterHeadResponse> getAllLetterHeads();

    LetterHeadResponse getLetterHeadById(Long id);

    LetterHeadResponse updateLetterHead(Long id, LetterHeadRequest request);

    void deleteLetterHead(Long id);
}