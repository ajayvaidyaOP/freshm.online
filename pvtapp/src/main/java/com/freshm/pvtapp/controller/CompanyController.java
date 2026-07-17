package com.freshm.pvtapp.controller;


import com.freshm.pvtapp.dto.CompanyRequest;
import com.freshm.pvtapp.dto.CompanyResponse;
import com.freshm.pvtapp.service.CompanyService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/company")
@CrossOrigin(origins = "*")
public class CompanyController {


    private final CompanyService companyService;



    public CompanyController(
            CompanyService companyService
    ) {
        this.companyService = companyService;
    }





    /**
     * Get company profile
     *
     * GET:
     * /api/company/{id}
     *
     * Later replace id with logged-in company id from JWT
     */
    @GetMapping("/{id}")
    public ResponseEntity<CompanyResponse> getCompany(
            @PathVariable Long id
    ) {


        return ResponseEntity.ok(
                companyService.getCompanyById(id)
        );

    }





    /**
     * Update company details
     *
     * PUT:
     * /api/company/{id}
     */
    @PutMapping("/{id}")
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
     * Change company active status
     *
     * PUT:
     * /api/company/{id}/status
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<String> changeStatus(
            @PathVariable Long id,
            @RequestParam Boolean status
    ) {


        companyService.changeStatus(
                id,
                status
        );


        return ResponseEntity.ok(
                "Company status updated"
        );

    }

}