package com.freshm.pvtapp.service;


import com.freshm.pvtapp.entity.CodeSequence;
import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.enums.CodeType;
import com.freshm.pvtapp.repository.CodeSequenceRepository;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
public class CodeGeneratorServiceImpl 
        implements CodeGeneratorService {



    private final CodeSequenceRepository sequenceRepository;


    public CodeGeneratorServiceImpl(CodeSequenceRepository sequenceRepository) {
        this.sequenceRepository = sequenceRepository;
    }

    @Override
    @Transactional
    public String generateCode(
            Company company,
            CodeType codeType
    ) {


        CodeSequence sequence =
                sequenceRepository
                .findByCompanyIdAndCodeType(
                        company.getId(),
                        codeType
                )
                .orElseGet(() -> createNewSequence(
                        company,
                        codeType
                ));



        Long nextNumber =
                sequence.getCurrentNumber() + 1;



        sequence.setCurrentNumber(nextNumber);



        sequenceRepository.save(sequence);



        return createFormattedCode(
                company.getCompanyCode(),
                codeType,
                nextNumber
        );

    }



    private CodeSequence createNewSequence(
            Company company,
            CodeType codeType
    ){


        CodeSequence sequence =
                CodeSequence.builder()
                        .company(company)
                        .codeType(codeType)
                        .currentNumber(0L)
                        .build();


        return sequenceRepository.save(sequence);

    }





    private String createFormattedCode(
            String companyCode,
            CodeType type,
            Long number
    ){


        String prefix = switch(type){

            case VENDOR -> "VEN";

            case FARMER -> "FAR";

            case PRODUCT -> "PRD";

            case PURCHASE -> "PUR";

            case INVOICE -> "INV";

        };


        return companyCode
                + "-"
                + prefix
                + "-"
                + String.format(
                    "%06d",
                    number
                );

    }


}