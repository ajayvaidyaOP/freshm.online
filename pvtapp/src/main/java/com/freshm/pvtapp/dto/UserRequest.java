package com.freshm.pvtapp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;



public class UserRequest {


    @NotBlank
    private String fullName;


    @Email
    @NotBlank
    private String email;


    private String mobile;


    @NotBlank
    private String password;


    @NotBlank
    private String role;
    
public UserRequest() {
	// TODO Auto-generated constructor stub
}

public UserRequest(@NotBlank String fullName, @Email @NotBlank String email, String mobile, @NotBlank String password,
		@NotBlank String role) {
	super();
	this.fullName = fullName;
	this.email = email;
	this.mobile = mobile;
	this.password = password;
	this.role = role;
}

public String getFullName() {
	return fullName;
}

public void setFullName(String fullName) {
	this.fullName = fullName;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public String getMobile() {
	return mobile;
}

public void setMobile(String mobile) {
	this.mobile = mobile;
}

public String getPassword() {
	return password;
}

public void setPassword(String password) {
	this.password = password;
}

public String getRole() {
	return role;
}

public void setRole(String role) {
	this.role = role;
}


	

}