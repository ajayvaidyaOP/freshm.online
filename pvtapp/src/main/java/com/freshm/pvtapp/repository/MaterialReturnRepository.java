package com.freshm.pvtapp.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.freshm.pvtapp.entity.MaterialReturn;

public interface MaterialReturnRepository extends JpaRepository<MaterialReturn, Long> {
    List<MaterialReturn> findAllByCompanyIdOrderByIdDesc(Long companyId);
    Optional<MaterialReturn> findByIdAndCompanyId(Long id, Long companyId);
}
