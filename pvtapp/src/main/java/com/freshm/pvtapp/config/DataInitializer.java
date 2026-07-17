package com.freshm.pvtapp.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.freshm.pvtapp.entity.User;
import com.freshm.pvtapp.enums.Role;
import com.freshm.pvtapp.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner init(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {

        return args -> {

            if (userRepository.findByEmail("superadmin@freshm.com").isEmpty()) {

                User user = new User();

                user.setFullName("Super Admin");
                user.setEmail("superadmin@freshm.com");
                user.setMobile("9999999999");
                user.setPassword(passwordEncoder.encode("Admin@123"));
                user.setRole(Role.SUPER_ADMIN);
                user.setActive(true);

                userRepository.save(user);
            }
        };
    }
}