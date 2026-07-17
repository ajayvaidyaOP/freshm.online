package com.freshm.pvtapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshm.pvtapp.entity.Vendor;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

    List<Vendor> findAllByCompanyId(Long companyId);

    Optional<Vendor> findByVendorCode(String vendorCode);

    Optional<Vendor> findByIdAndCompanyId(Long id, Long companyId);

    boolean existsByCompanyIdAndVendorCode(
            Long companyId,
            String vendorCode
    );
}