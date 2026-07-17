package com.freshm.pvtapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshm.pvtapp.entity.PurchaseItem;

@Repository
public interface PurchaseItemRepository 
        extends JpaRepository<PurchaseItem, Long> {

}