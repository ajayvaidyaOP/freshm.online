package com.freshm.pvtapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freshm.pvtapp.entity.Buyer;

public interface BuyerRepository extends JpaRepository<Buyer, Long> {
    List<Buyer> findAllByCompanyId(Long companyId);
    Optional<Buyer> findByIdAndCompanyId(Long id, Long companyId);
}
