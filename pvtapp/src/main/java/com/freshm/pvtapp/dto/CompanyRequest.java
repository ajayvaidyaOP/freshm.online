// package com.freshm.pvtapp.dto;

// import jakarta.validation.constraints.NotBlank;
// import lombok.AllArgsConstructor;

// import lombok.NoArgsConstructor;


// @NoArgsConstructor
// @AllArgsConstructor
// public class CompanyRequest {


//     @NotBlank
//     private String companyName;


//     private String address;


//     private String mobile;


//     private String email;


// 	public String getCompanyName() {
// 		return companyName;
// 	}


// 	public void setCompanyName(String companyName) {
// 		this.companyName = companyName;
// 	}


// 	public String getAddress() {
// 		return address;
// 	}


// 	public void setAddress(String address) {
// 		this.address = address;
// 	}


// 	public String getMobile() {
// 		return mobile;
// 	}


// 	public void setMobile(String mobile) {
// 		this.mobile = mobile;
// 	}


// 	public String getEmail() {
// 		return email;
// 	}


// 	public void setEmail(String email) {
// 		this.email = email;
// 	}
    
    

// }
package com.freshm.pvtapp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class CompanyRequest {

    @NotBlank
    private String companyName;

    private String address;

    private String mobile;

    private String email;

    private String gstNumber;

    private String panNumber;

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGstNumber() {
        return gstNumber;
    }

    public void setGstNumber(String gstNumber) {
        this.gstNumber = gstNumber;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }
}