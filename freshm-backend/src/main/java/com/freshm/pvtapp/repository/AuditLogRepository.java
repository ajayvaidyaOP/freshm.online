package com.freshm.pvtapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshm.pvtapp.entity.AuditLog;

@Repository
public interface AuditLogRepository 
        extends JpaRepository<AuditLog, Long> {


    List<AuditLog> findAllByCompanyId(
            Long companyId
    );


    List<AuditLog> findAllByUserId(
            Long userId
    );

}