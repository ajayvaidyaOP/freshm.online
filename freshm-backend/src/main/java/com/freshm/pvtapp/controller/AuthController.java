package com.freshm.pvtapp.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freshm.pvtapp.dto.LoginRequest;
import com.freshm.pvtapp.dto.LoginResponse;
import com.freshm.pvtapp.response.ApiResponse;
import com.freshm.pvtapp.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService) {

        this.authService = authService;
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response =
                authService.login(request);

        return new ApiResponse<>(
                true,
                "Login Successful",
                response
        );

    }

}
