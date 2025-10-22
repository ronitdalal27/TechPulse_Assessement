package com.ronit.user.user_service.dto;

import java.util.List;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private List<String> roles; 
}