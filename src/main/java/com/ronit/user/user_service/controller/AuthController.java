package com.ronit.user.user_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import com.ronit.user.user_service.dto.AuthRequest;
import com.ronit.user.user_service.dto.AuthResponse;
import com.ronit.user.user_service.dto.RegisterRequest;
import com.ronit.user.user_service.service.JwtService;
import com.ronit.user.user_service.service.UserService;
import com.ronit.user.user_service.service.UserServiceImpl;

import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired 
    private AuthenticationManager authenticationManager;

    @Autowired 
    private JwtService jwtService;

    @Autowired 
    private UserServiceImpl userDetailsService;

    @Autowired 
    private UserService userService;

    // Register a new user
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

    // Login and return JWT
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            if (authentication.isAuthenticated()) {
                var userDetails = userDetailsService.loadUserByUsername(request.getEmail());

                // Extract all roles from authenticated user
                Set<String> roles = userDetails.getAuthorities()
                        .stream()
                        .map(auth -> auth.getAuthority())
                        .collect(Collectors.toSet());

                // Generate JWT with multiple roles
                String token = jwtService.generateToken(userDetails.getUsername(), roles);

                return new AuthResponse(token);
            } else {
                throw new RuntimeException("Invalid credentials");
            }
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username or password");
        }
    }
}
