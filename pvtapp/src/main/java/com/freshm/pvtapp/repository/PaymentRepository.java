package com.freshm.pvtapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshm.pvtapp.entity.Payment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface PaymentRepository
        extends JpaRepository<Payment, Long> {

    List<Payment> findAllByPurchaseId(Long purchaseId);

    List<Payment> findAllByCompanyId(Long companyId);

  @Query("""
SELECT COALESCE(SUM(p.amount),0)
FROM Payment p
WHERE p.company.id = :companyId
AND MONTH(p.paymentDate) = MONTH(CURRENT_DATE)
AND YEAR(p.paymentDate) = YEAR(CURRENT_DATE)
""")
Double getTotalPayment(@Param("companyId") Long companyId);
        }