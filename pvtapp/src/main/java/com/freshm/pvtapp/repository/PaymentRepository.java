package com.freshm.pvtapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshm.pvtapp.entity.Payment;

@Repository
public interface PaymentRepository 
        extends JpaRepository<Payment, Long> {


    List<Payment> findAllByPurchaseId(Long purchaseId);


    List<Payment> findAllByCompanyId(Long companyId);

}
