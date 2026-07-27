// package com.freshm.pvtapp.service;


// import com.freshm.pvtapp.entity.CodeSequence;
// import com.freshm.pvtapp.entity.Company;
// import com.freshm.pvtapp.enums.CodeType;
// import com.freshm.pvtapp.repository.CodeSequenceRepository;


// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;



// @Service
// public class CodeGeneratorServiceImpl 
//         implements CodeGeneratorService {



//     private final CodeSequenceRepository sequenceRepository;


//     public CodeGeneratorServiceImpl(CodeSequenceRepository sequenceRepository) {
//         this.sequenceRepository = sequenceRepository;
//     }

//     @Override
// @Transactional
// public String generateCode(
//         Company company,
//         CodeType codeType
// ) {

//     System.out.println("========== CODE GENERATOR ==========");
//     System.out.println("Company Class : " + company.getClass());
//     System.out.println("Company ID    : " + company.getId());

//     try {
//         System.out.println("Company Code  : " + company.getCompanyCode());
//     } catch (Exception e) {
//         e.printStackTrace();
//         throw e;
//     }

//     System.out.println("====================================");

//     CodeSequence sequence =
//             sequenceRepository
//                     .findByCompanyIdAndCodeType(
//                             company.getId(),
//                             codeType
//                     )
//                     .orElseGet(() -> createNewSequence(
//                             company,
//                             codeType
//                     ));

//     Long nextNumber =
//             sequence.getCurrentNumber() + 1;

//     sequence.setCurrentNumber(nextNumber);

//     sequenceRepository.save(sequence);

//     return createFormattedCode(
//             company.getCompanyCode(),
//             codeType,
//             nextNumber
//     );
// }


//     private CodeSequence createNewSequence(
//             Company company,
//             CodeType codeType
//     ){


//         CodeSequence sequence =
//                 CodeSequence.builder()
//                         .company(company)
//                         .codeType(codeType)
//                         .currentNumber(0L)
//                         .build();


//         return sequenceRepository.save(sequence);

//     }





//     private String createFormattedCode(
//             String companyCode,
//             CodeType type,
//             Long number
//     ){


//         String prefix = switch(type){

//             case VENDOR -> "VEN";

//             case FARMER -> "FAR";

//             case PRODUCT -> "PRD";

//             case PURCHASE -> "PUR";

//             case INVOICE -> "INV";

//         };


//         return companyCode
//                 + "-"
//                 + prefix
//                 + "-"
//                 + String.format(
//                     "%06d",
//                     number
//                 );

//     }


// }

package com.freshm.pvtapp.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.freshm.pvtapp.entity.CodeSequence;
import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.enums.CodeType;
import com.freshm.pvtapp.repository.CodeSequenceRepository;

@Service
public class CodeGeneratorServiceImpl implements CodeGeneratorService {

    private final CodeSequenceRepository sequenceRepository;

    public CodeGeneratorServiceImpl(CodeSequenceRepository sequenceRepository) {
        this.sequenceRepository = sequenceRepository;
    }

    @Override
    @Transactional
    public String generateCode(Company company, CodeType codeType) {

        System.out.println("========== CODE GENERATOR ==========");
        System.out.println("Company Object : " + company);

        try {
            System.out.println("Company Class : " + company.getClass());
            System.out.println("Company ID    : " + company.getId());
            System.out.println("Company Code  : " + company.getCompanyCode());
        } catch (Exception e) {
            System.out.println("ERROR while accessing Company");
            e.printStackTrace();
            throw e;
        }

        System.out.println("Finding sequence...");

        CodeSequence sequence = sequenceRepository
                .findByCompanyIdAndCodeType(company.getId(), codeType)
                .orElseGet(() -> {
                    System.out.println("Sequence not found. Creating new sequence...");
                    return createNewSequence(company, codeType);
                });

        System.out.println("Current Number : " + sequence.getCurrentNumber());

        Long nextNumber = sequence.getCurrentNumber() + 1;

        sequence.setCurrentNumber(nextNumber);

        sequenceRepository.save(sequence);

        System.out.println("Sequence Saved Successfully");

        String code = createFormattedCode(
                company.getCompanyCode(),
                codeType,
                nextNumber);

        System.out.println("Generated Code : " + code);
        System.out.println("===================================");

        return code;
    }

    private CodeSequence createNewSequence(
            Company company,
            CodeType codeType) {

        CodeSequence sequence = CodeSequence.builder()
                .company(company)
                .codeType(codeType)
                .currentNumber(0L)
                .build();

        return sequenceRepository.save(sequence);
    }

    private String createFormattedCode(
            String companyCode,
            CodeType type,
            Long number) {

        String prefix = switch (type) {
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
                + String.format("%06d", number);
    }
}