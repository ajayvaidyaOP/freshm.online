package com.freshm.pvtapp;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PvtappApplication {

    @Value("${spring.datasource.username}")
    private String username;

    @Bean
    CommandLineRunner checkUsername() {
        return args -> {
            System.out.println("MYSQL USER = [" + username + "]");
            System.out.println("USER LENGTH = " + username.length());
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(PvtappApplication.class, args);
    }
}