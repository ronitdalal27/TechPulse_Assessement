package com.ronit.user.user_service.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
