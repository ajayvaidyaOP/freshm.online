package com.freshm.pvtapp.service;

import java.util.List;

import com.freshm.pvtapp.dto.UserRequest;
import com.freshm.pvtapp.dto.UserResponse;

public interface UserService {

    UserResponse createUser(
            UserRequest request
    );

    List<UserResponse> getAllUsers();

    UserResponse getUserById(
            Long id
    );

    UserResponse updateUser(
            Long id,
            UserRequest request
    );

    void changeStatus(
            Long userId,
            Boolean status
    );

    void deleteUser(
            Long userId
    );
}