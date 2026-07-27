package com.freshm.pvtapp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
@EnableMethodSecurity
public class SecurityConfig {


    private final JwtAuthenticationFilter jwtFilter;


    public SecurityConfig(
            JwtAuthenticationFilter jwtFilter
    ) {

        this.jwtFilter = jwtFilter;

    }



    @Bean
    public PasswordEncoder passwordEncoder(){

        return new BCryptPasswordEncoder();

    }



    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration.getAuthenticationManager();

    }



    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {


        http

        // Enable CORS
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))


        // Disable CSRF for JWT
        .csrf(csrf -> csrf.disable())


        .sessionManagement(session ->
                session.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS
                )
        )


        .authorizeHttpRequests(auth -> auth


                // IMPORTANT
                // Allow browser preflight request
                .requestMatchers(
                        org.springframework.http.HttpMethod.OPTIONS,
                        "/**"
                ).permitAll()


                // Auth APIs public
                .requestMatchers(
                        "/api/auth/**"
                ).permitAll()
               
                .requestMatchers(
        "/api/users/**"
)             .permitAll()

                .anyRequest()
                .authenticated()

        )


        .addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
        );


        return http.build();

    }




    @Bean
    public CorsConfigurationSource corsConfigurationSource(){


        CorsConfiguration configuration =
                new CorsConfiguration();


configuration.setAllowedOrigins(List.of(
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5178",
    "http://localhost:3000"
));
        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "PATCH",
                        "OPTIONS"
                )
        );


        configuration.setAllowedHeaders(
                List.of(
                        "*"
                )
        );


        configuration.setAllowCredentials(true);



        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();


        source.registerCorsConfiguration(
                "/**",
                configuration
        );


        return source;

    }

}