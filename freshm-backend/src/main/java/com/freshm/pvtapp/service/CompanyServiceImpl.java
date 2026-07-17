package com.freshm.pvtapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.freshm.pvtapp.dto.CompanyRequest;
import com.freshm.pvtapp.dto.CompanyResponse;
import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.repository.CompanyRepository;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.freshm.pvtapp.entity.User;
import com.freshm.pvtapp.enums.Role;
import com.freshm.pvtapp.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class CompanyServiceImpl 
        implements CompanyService {


	private final CompanyRepository companyRepository;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;


	public CompanyServiceImpl(
	        CompanyRepository companyRepository,
	        UserRepository userRepository,
	        PasswordEncoder passwordEncoder
	) {
	    this.companyRepository = companyRepository;
	    this.userRepository = userRepository;
	    this.passwordEncoder = passwordEncoder;
	}

    @Override
    @Transactional
    public CompanyResponse createCompany(
            CompanyRequest request
    ){


        Company company =
                Company.builder()
                        .companyName(
                                request.getCompanyName()
                        )
                        .address(
                                request.getAddress()
                        )
                        .mobile(
                                request.getMobile()
                        )
                        .email(
                                request.getEmail()
                        )
                        .companyCode(
                                generateCompanyCode(
                                        request.getCompanyName()
                                )
                        )
                        .build();



        Company saved =
                companyRepository.save(company);

        User admin = new User();

        admin.setFullName(
                request.getCompanyName() + " Admin"
        );

        admin.setEmail(
                request.getEmail()
        );

        admin.setMobile(
                request.getMobile()
        );

        admin.setPassword(
                passwordEncoder.encode("Admin@123")
        );

        admin.setRole(
                Role.ADMIN
        );

        admin.setActive(true);

        admin.setCompany(saved);


        userRepository.save(admin);


        return mapToResponse(saved);

    }





    @Override
    public List<CompanyResponse> getAllCompanies(){


        return companyRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();

    }





    @Override
    public CompanyResponse getCompanyById(
            Long id
    ){


        Company company =
                companyRepository
                .findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Company not found"
                    )
                );


        return mapToResponse(company);

    }





    @Override
    @Transactional
    public CompanyResponse updateCompany(
            Long id,
            CompanyRequest request
    ){


        Company company =
                companyRepository
                .findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Company not found"
                    )
                );


        company.setCompanyName(
                request.getCompanyName()
        );

        company.setAddress(
                request.getAddress()
        );

        company.setMobile(
                request.getMobile()
        );

        company.setEmail(
                request.getEmail()
        );


        Company updated =
                companyRepository.save(company);


        return mapToResponse(updated);

    }





    @Override
    @Transactional
    public void changeStatus(
            Long id,
            Boolean status
    ){


        Company company =
                companyRepository
                .findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Company not found"
                    )
                );


        company.setActive(status);


        companyRepository.save(company);

    }






    private String generateCompanyCode(
            String name
    ){


        String code =
                name
                .replaceAll(
                    "[^A-Za-z]",
                    ""
                )
                .toUpperCase();


        if(code.length() > 3){
            code = code.substring(0,3);
        }


        return code;

    }





    private CompanyResponse mapToResponse(
            Company company
    ){


        return CompanyResponse.builder()

                .id(
                    company.getId()
                )

                .companyName(
                    company.getCompanyName()
                )

                .companyCode(
                    company.getCompanyCode()
                )

                .address(
                    company.getAddress()
                )

                .mobile(
                    company.getMobile()
                )

                .email(
                    company.getEmail()
                )

                .active(
                    company.getActive()
                )

                .build();

    }

    @Override
    public void deleteCompany(Long id) {


        Company company =
                companyRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Company not found"
                                )
                        );


        company.setActive(false);


        companyRepository.save(company);

    }


}
