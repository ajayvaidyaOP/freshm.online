package com.freshm.pvtapp.controller;


import com.freshm.pvtapp.dto.UserRequest;
import com.freshm.pvtapp.dto.UserResponse;
import com.freshm.pvtapp.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {


    private final UserService userService;



    public UserController(
            UserService userService
    ) {
        this.userService = userService;
    }


    /**
     * Create user under company
     *
     * POST:
     * /api/users
     */
    @PostMapping
    public ResponseEntity<UserResponse> createUser(
            @RequestBody UserRequest request
    ) {


        return new ResponseEntity<>(
                userService.createUser(request),
                HttpStatus.CREATED
        );

    }








    /**
     * Get all users of company
     *
     * GET:
     * /api/users
     */
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {


        return ResponseEntity.ok(
                userService.getAllUsers()
        );

    }








    /**
     * Get user by id
     *
     * GET:
     * /api/users/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable Long id
    ) {


        return ResponseEntity.ok(
                userService.getUserById(id)
        );

    }








    /**
     * Update user
     *
     * PUT:
     * /api/users/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UserRequest request
    ) {


        return ResponseEntity.ok(
                userService.updateUser(
                        id,
                        request
                )
        );

    }








    /**
     * Change user status
     *
     * PUT:
     * /api/users/{id}/status
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<String> changeStatus(
            @PathVariable Long id,
            @RequestParam Boolean status
    ) {


        userService.changeStatus(
                id,
                status
        );


        return ResponseEntity.ok(
                "User status updated"
        );

    }







    /**
     * Delete user (soft delete)
     *
     * DELETE:
     * /api/users/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id
    ) {


        userService.deleteUser(id);


        return ResponseEntity.ok(
                "User deleted successfully"
        );

    }


}