package com.freshm.pvtapp.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.freshm.pvtapp.dto.UserRequest;
import com.freshm.pvtapp.dto.UserResponse;
import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.entity.User;
import com.freshm.pvtapp.enums.Role;
import com.freshm.pvtapp.repository.UserRepository;
import com.freshm.pvtapp.security.SecurityUtil;

import jakarta.transaction.Transactional;


@Service
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final SecurityUtil securityUtil;



    public UserServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            SecurityUtil securityUtil
    ) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.securityUtil = securityUtil;
    }




    @Override
    @Transactional
    public UserResponse createUser(UserRequest request) {


        Company company =
                securityUtil.getCurrentCompany();



        if(userRepository.existsByEmail(request.getEmail())){

            throw new RuntimeException(
                    "Email already exists"
            );
        }



        User user = new User();


        user.setFullName(
                request.getFullName()
        );


        user.setEmail(
                request.getEmail()
        );


        user.setMobile(
                request.getMobile()
        );


        // BCrypt password
        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );


        user.setRole(
                Role.valueOf(
                        request.getRole()
                                .toUpperCase()
                )
        );


        // Tenant mapping
        user.setCompany(company);


        user.setActive(true);



        return convertToResponse(
                userRepository.save(user)
        );

    }







    @Override
    public List<UserResponse> getAllUsers(){


        Company company =
                securityUtil.getCurrentCompany();



        return userRepository
                .findByCompanyId(
                        company.getId()
                )
                .stream()
                .map(this::convertToResponse)
                .toList();

    }







    @Override
    public UserResponse getUserById(Long id){


        Company company =
                securityUtil.getCurrentCompany();



        User user =
                userRepository
                .findByIdAndCompanyId(
                        id,
                        company.getId()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );



        return convertToResponse(user);

    }







    @Override
    @Transactional
    public UserResponse updateUser(
            Long id,
            UserRequest request
    ){


        Company company =
                securityUtil.getCurrentCompany();



        User user =
                userRepository
                .findByIdAndCompanyId(
                        id,
                        company.getId()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );



        user.setFullName(
                request.getFullName()
        );


        user.setEmail(
                request.getEmail()
        );


        user.setMobile(
                request.getMobile()
        );



        if(request.getPassword()!=null &&
           !request.getPassword().isBlank()){


            user.setPassword(
                    passwordEncoder.encode(
                            request.getPassword()
                    )
            );
        }



        user.setRole(
                Role.valueOf(
                        request.getRole()
                                .toUpperCase()
                )
        );



        return convertToResponse(
                userRepository.save(user)
        );

    }








    @Override
    @Transactional
    public void deleteUser(Long id){


        Company company =
                securityUtil.getCurrentCompany();



        User user =
                userRepository
                .findByIdAndCompanyId(
                        id,
                        company.getId()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );


        user.setActive(false);


        userRepository.save(user);

    }







    @Override
    @Transactional
    public void changeStatus(
            Long id,
            Boolean status
    ){


        Company company =
                securityUtil.getCurrentCompany();



        User user =
                userRepository
                .findByIdAndCompanyId(
                        id,
                        company.getId()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );


        user.setActive(status);


        userRepository.save(user);

    }






    private UserResponse convertToResponse(
            User user
    ){


        UserResponse response =
                new UserResponse();


        response.setId(
                user.getId()
        );


        response.setFullName(
                user.getFullName()
        );


        response.setEmail(
                user.getEmail()
        );


        response.setMobile(
                user.getMobile()
        );


        response.setRole(
                user.getRole()
                .name()
        );


        response.setActive(
                user.getActive()
        );


        return response;

    }

}