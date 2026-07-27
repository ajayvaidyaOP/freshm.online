// package com.freshm.pvtapp.service;

// import java.util.List;

// import org.springframework.stereotype.Service;

// import com.freshm.pvtapp.dto.LetterHeadRequest;
// import com.freshm.pvtapp.dto.LetterHeadResponse;
// import com.freshm.pvtapp.entity.LetterHead;
// import com.freshm.pvtapp.repository.LetterHeadRepository;

// import jakarta.transaction.Transactional;

// @Service
// public class LetterHeadServiceImpl implements LetterHeadService {

//     private final LetterHeadRepository letterHeadRepository;

//     public LetterHeadServiceImpl(LetterHeadRepository letterHeadRepository) {
//         this.letterHeadRepository = letterHeadRepository;
//     }

//     @Override
//     @Transactional
//     public LetterHeadResponse createLetterHead(LetterHeadRequest request) {
//         return null;
//     }

//     @Override
//     public List<LetterHeadResponse> getAllLetterHeads() {
//         return null;
//     }

//     @Override
//     public LetterHeadResponse getLetterHeadById(Long id) {
//         return null;
//     }

//     @Override
//     @Transactional
//     public LetterHeadResponse updateLetterHead(Long id, LetterHeadRequest request) {
//         return null;
//     }

//     @Override
//     @Transactional
//     public void deleteLetterHead(Long id) {

//     }
// }

package com.freshm.pvtapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.freshm.pvtapp.dto.LetterHeadRequest;
import com.freshm.pvtapp.dto.LetterHeadResponse;
import com.freshm.pvtapp.entity.LetterHead;
import com.freshm.pvtapp.repository.LetterHeadRepository;

import jakarta.transaction.Transactional;

@Service
public class LetterHeadServiceImpl implements LetterHeadService {

    private final LetterHeadRepository letterHeadRepository;

    public LetterHeadServiceImpl(LetterHeadRepository letterHeadRepository) {
        this.letterHeadRepository = letterHeadRepository;
    }

    @Override
    @Transactional
    public LetterHeadResponse createLetterHead(LetterHeadRequest request) {

        LetterHead letterHead = LetterHead.builder()
                .companyLogoUrl(request.getCompanyLogoUrl())
                .headerTitle(request.getHeaderTitle())
                .footerText(request.getFooterText())
                .active(true)
                .build();

        LetterHead saved = letterHeadRepository.save(letterHead);

        return mapToResponse(saved);
    }

    @Override
    public List<LetterHeadResponse> getAllLetterHeads() {

        return letterHeadRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public LetterHeadResponse getLetterHeadById(Long id) {

        LetterHead letterHead = letterHeadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Letter Head not found"));

        return mapToResponse(letterHead);
    }

    @Override
    @Transactional
    public LetterHeadResponse updateLetterHead(Long id, LetterHeadRequest request) {

        LetterHead letterHead = letterHeadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Letter Head not found"));

        letterHead.setCompanyLogoUrl(request.getCompanyLogoUrl());
        letterHead.setHeaderTitle(request.getHeaderTitle());
        letterHead.setFooterText(request.getFooterText());

        LetterHead updated = letterHeadRepository.save(letterHead);

        return mapToResponse(updated);
    }

    @Override
    @Transactional
    public void deleteLetterHead(Long id) {

        LetterHead letterHead = letterHeadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Letter Head not found"));

        letterHead.setActive(false);

        letterHeadRepository.save(letterHead);
    }

    private LetterHeadResponse mapToResponse(LetterHead letterHead) {

        return LetterHeadResponse.builder()
                .id(letterHead.getId())
                .companyLogoUrl(letterHead.getCompanyLogoUrl())
                .headerTitle(letterHead.getHeaderTitle())
                .footerText(letterHead.getFooterText())
                .active(letterHead.getActive())
                .build();
    }
}