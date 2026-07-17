package com.freshm.pvtapp.controller;


import com.freshm.pvtapp.dto.CompanyRequest;
import com.freshm.pvtapp.dto.CompanyResponse;
import com.freshm.pvtapp.service.CompanyService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api/super-admin")
@CrossOrigin(origins = "*")
public class SuperAdminController {


    private final CompanyService companyService;



    public SuperAdminController(
            CompanyService companyService
    ) {
        this.companyService = companyService;
    }



    /**
     * Create new company/admin login
     */
    @PostMapping("/companies")
    public ResponseEntity<CompanyResponse> createCompany(
            @RequestBody CompanyRequest request
    ) {

        return new ResponseEntity<>(
                companyService.createCompany(request),
                HttpStatus.CREATED
        );

    }





    /**
     * Get all companies
     */
    @GetMapping("/companies")
    public ResponseEntity<List<CompanyResponse>> getAllCompanies() {


        return ResponseEntity.ok(
                companyService.getAllCompanies()
        );

    }





    /**
     * Get company by id
     */
    @GetMapping("/companies/{id}")
    public ResponseEntity<CompanyResponse> getCompany(
            @PathVariable Long id
    ) {


        return ResponseEntity.ok(
                companyService.getCompanyById(id)
        );

    }





    /**
     * Update company
     */
    @PutMapping("/companies/{id}")
    public ResponseEntity<CompanyResponse> updateCompany(
            @PathVariable Long id,
            @RequestBody CompanyRequest request
    ) {


        return ResponseEntity.ok(
                companyService.updateCompany(
                        id,
                        request
                )
        );

    }





    /**
     * Disable company
     */
    @DeleteMapping("/companies/{id}")
    public ResponseEntity<String> deleteCompany(
            @PathVariable Long id
    ) {


        companyService.deleteCompany(id);


        return ResponseEntity.ok(
                "Company disabled successfully"
        );

    }

}