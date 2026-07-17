package com.freshm.pvtapp.service;

import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.enums.CodeType;

public interface CodeGeneratorService {


    String generateCode(
            Company company,
            CodeType codeType
    );
}
