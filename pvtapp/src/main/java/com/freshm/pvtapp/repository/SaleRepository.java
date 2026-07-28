package com.freshm.pvtapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freshm.pvtapp.entity.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findAllByCompanyIdOrderByIdDesc(Long companyId);
    Optional<Sale> findByIdAndCompanyId(Long id, Long companyId);
}
