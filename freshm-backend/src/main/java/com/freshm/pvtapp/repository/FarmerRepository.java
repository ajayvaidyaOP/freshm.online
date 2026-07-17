package com.freshm.pvtapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshm.pvtapp.entity.Farmer;

@Repository
public interface FarmerRepository 
        extends JpaRepository<Farmer, Long> {


	List<Farmer> findAllByCompanyId(Long companyId);

    Optional<Farmer> findByIdAndCompanyId(
            Long id,
            Long companyId
    );

    List<Farmer> findAllByVendorIdAndCompanyId(
            Long vendorId,
            Long companyId
    );
    
    List<Farmer> findByVendorId(Long vendorId);


}