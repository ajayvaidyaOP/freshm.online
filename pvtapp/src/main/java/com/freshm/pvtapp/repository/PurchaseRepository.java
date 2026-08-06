package com.freshm.pvtapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshm.pvtapp.entity.Purchase;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface PurchaseRepository
                extends JpaRepository<Purchase, Long> {

        List<Purchase> findAllByCompanyId(Long companyId);

        Optional<Purchase> findByPurchaseNumber(
                        String purchaseNumber);

        Optional<Purchase> findByIdAndCompanyId(
                        Long id,
                        Long companyId);

        @Query("""
                        SELECT COALESCE(SUM(p.totalAmount),0)
                        FROM Purchase p
                        WHERE p.company.id = :companyId
                        AND MONTH(p.purchaseDate) = MONTH(CURRENT_DATE)
                        AND YEAR(p.purchaseDate) = YEAR(CURRENT_DATE)
                        """)
        Double getTotalPurchase(@Param("companyId") Long companyId);

        @Query("""
                        SELECT COALESCE(SUM(p.hamali),0)
                        FROM Purchase p
                        WHERE p.company.id = :companyId
                        AND MONTH(p.purchaseDate) = MONTH(CURRENT_DATE)
                        AND YEAR(p.purchaseDate) = YEAR(CURRENT_DATE)
                        """)
        Double getTotalHamali(@Param("companyId") Long companyId);

        @Query("""
                        SELECT COALESCE(SUM(p.commission),0)
                        FROM Purchase p
                        WHERE p.company.id = :companyId
                        AND MONTH(p.purchaseDate) = MONTH(CURRENT_DATE)
                        AND YEAR(p.purchaseDate) = YEAR(CURRENT_DATE)
                        """)
        Double getTotalCommission(@Param("companyId") Long companyId);

        @Query("""
                        SELECT COALESCE(SUM(p.transportAdvance),0)
                        FROM Purchase p
                        WHERE p.company.id = :companyId
                        AND MONTH(p.purchaseDate) = MONTH(CURRENT_DATE)
                        AND YEAR(p.purchaseDate) = YEAR(CURRENT_DATE)
                        """)
        Double getTotalTransportAdvance(@Param("companyId") Long companyId);

}