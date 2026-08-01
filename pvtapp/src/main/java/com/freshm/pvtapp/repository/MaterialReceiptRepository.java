package com.freshm.pvtapp.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.freshm.pvtapp.entity.MaterialReceipt;

public interface MaterialReceiptRepository extends JpaRepository<MaterialReceipt, Long> {
    List<MaterialReceipt> findAllByCompanyIdOrderByIdDesc(Long companyId);
    Optional<MaterialReceipt> findByIdAndCompanyId(Long id, Long companyId);
}
