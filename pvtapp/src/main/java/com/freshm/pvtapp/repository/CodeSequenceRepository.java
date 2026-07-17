package com.freshm.pvtapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshm.pvtapp.entity.CodeSequence;
import com.freshm.pvtapp.enums.CodeType;

@Repository
public interface CodeSequenceRepository 
        extends JpaRepository<CodeSequence, Long> {


    Optional<CodeSequence> 
    findByCompanyIdAndCodeType(
            Long companyId,
            CodeType codeType
    );

}