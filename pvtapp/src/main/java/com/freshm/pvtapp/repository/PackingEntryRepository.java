package com.freshm.pvtapp.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.freshm.pvtapp.entity.PackingEntry;

public interface PackingEntryRepository extends JpaRepository<PackingEntry, Long> {
    List<PackingEntry> findAllByCompanyIdOrderByIdDesc(Long companyId);
    Optional<PackingEntry> findByIdAndCompanyId(Long id, Long companyId);
}
