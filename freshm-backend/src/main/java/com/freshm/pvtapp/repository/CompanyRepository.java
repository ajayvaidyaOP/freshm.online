package com.freshm.pvtapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshm.pvtapp.entity.Company;

@Repository
public interface CompanyRepository 
        extends JpaRepository<Company, Long> {


    Optional<Company> findByCompanyCode(String companyCode);


    Optional<Company> findByEmail(String email);


    boolean existsByCompanyCode(String companyCode);

}