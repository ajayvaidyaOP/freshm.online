package com.freshm.pvtapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshm.pvtapp.entity.LetterHead;

@Repository
public interface LetterHeadRepository extends JpaRepository<LetterHead, Long> {

    // FIX: fetch this company's letterhead only (one per company)
    Optional<LetterHead> findFirstByCompanyId(Long companyId);
}
