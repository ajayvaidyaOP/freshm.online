package com.freshm.pvtapp.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.freshm.pvtapp.dto.LoginRequest;
import com.freshm.pvtapp.dto.LoginResponse;
import com.freshm.pvtapp.entity.User;
import com.freshm.pvtapp.model.UserPrincipal;
import com.freshm.pvtapp.repository.UserRepository;
import com.freshm.pvtapp.security.JwtService;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    public AuthServiceImpl(
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            UserRepository userRepository) {

        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        String token = jwtService.generateToken(new UserPrincipal(user));

        LoginResponse response = new LoginResponse();

        response.setToken(token);
        response.setType("Bearer");

        response.setUserId(user.getId());
        response.setName(user.getFullName());
        response.setEmail(user.getEmail());

        response.setRole(user.getRole().name());

        if (user.getCompany() != null) {

            response.setCompanyId(user.getCompany().getId());
            response.setCompanyCode(user.getCompany().getCompanyCode());
            response.setCompanyName(user.getCompany().getCompanyName());

        }

        return response;
    }

}
