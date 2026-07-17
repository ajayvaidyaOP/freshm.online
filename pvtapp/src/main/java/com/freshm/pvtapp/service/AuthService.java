package com.freshm.pvtapp.service;

import com.freshm.pvtapp.dto.LoginRequest;
import com.freshm.pvtapp.dto.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

}