package com.freshm.pvtapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.freshm.pvtapp.dto.LetterHeadRequest;
import com.freshm.pvtapp.dto.LetterHeadResponse;
import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.entity.LetterHead;
import com.freshm.pvtapp.exception.ResourceNotFoundException;
import com.freshm.pvtapp.repository.LetterHeadRepository;
import com.freshm.pvtapp.security.SecurityUtil;

import jakarta.transaction.Transactional;

/**
 * FIX: every operation is now scoped to the current company.
 * Create/update always attaches the tenant, and reads only ever
 * return this company's letterhead. Saving with a blank title no
 * longer 500s (column is nullable now).
 */
@Service
public class LetterHeadServiceImpl implements LetterHeadService {

    private final LetterHeadRepository letterHeadRepository;
    private final SecurityUtil securityUtil;

    public LetterHeadServiceImpl(
            LetterHeadRepository letterHeadRepository,
            SecurityUtil securityUtil) {
        this.letterHeadRepository = letterHeadRepository;
        this.securityUtil = securityUtil;
    }

    @Override
    @Transactional
    public LetterHeadResponse createLetterHead(LetterHeadRequest request) {

        Company company = securityUtil.getCurrentCompany();

        // one letterhead per company: reuse the existing row if present
        LetterHead letterHead = letterHeadRepository
                .findFirstByCompanyId(company.getId())
                .orElseGet(LetterHead::new);

        letterHead.setCompany(company);
        letterHead.setCompanyLogoUrl(request.getCompanyLogoUrl());
        letterHead.setHeaderTitle(request.getHeaderTitle());
        letterHead.setFooterText(request.getFooterText());
        letterHead.setActive(true);

        return mapToResponse(letterHeadRepository.save(letterHead));
    }

    @Override
    public List<LetterHeadResponse> getAllLetterHeads() {
        Company company = securityUtil.getCurrentCompany();
        return letterHeadRepository
                .findFirstByCompanyId(company.getId())
                .map(lh -> List.of(mapToResponse(lh)))
                .orElseGet(List::of);
    }

    @Override
    public LetterHeadResponse getLetterHeadById(Long id) {
        Company company = securityUtil.getCurrentCompany();
        LetterHead lh = letterHeadRepository.findById(id)
                .filter(x -> x.getCompany() != null
                        && x.getCompany().getId().equals(company.getId()))
                .orElseThrow(() -> new ResourceNotFoundException("Letter head not found"));
        return mapToResponse(lh);
    }

    @Override
    @Transactional
    public LetterHeadResponse updateLetterHead(Long id, LetterHeadRequest request) {
        Company company = securityUtil.getCurrentCompany();
        LetterHead lh = letterHeadRepository.findById(id)
                .filter(x -> x.getCompany() != null
                        && x.getCompany().getId().equals(company.getId()))
                .orElseThrow(() -> new ResourceNotFoundException("Letter head not found"));

        lh.setCompanyLogoUrl(request.getCompanyLogoUrl());
        lh.setHeaderTitle(request.getHeaderTitle());
        lh.setFooterText(request.getFooterText());

        return mapToResponse(letterHeadRepository.save(lh));
    }

    @Override
    @Transactional
    public void deleteLetterHead(Long id) {
        Company company = securityUtil.getCurrentCompany();
        LetterHead lh = letterHeadRepository.findById(id)
                .filter(x -> x.getCompany() != null
                        && x.getCompany().getId().equals(company.getId()))
                .orElseThrow(() -> new ResourceNotFoundException("Letter head not found"));
        letterHeadRepository.delete(lh);
    }

    private LetterHeadResponse mapToResponse(LetterHead lh) {
        LetterHeadResponse r = new LetterHeadResponse();
        r.setId(lh.getId());
        r.setCompanyLogoUrl(lh.getCompanyLogoUrl());
        r.setHeaderTitle(lh.getHeaderTitle());
        r.setFooterText(lh.getFooterText());
        r.setActive(lh.getActive());
        return r;
    }
}
