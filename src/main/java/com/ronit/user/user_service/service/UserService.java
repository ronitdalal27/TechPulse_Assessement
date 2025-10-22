package com.ronit.user.user_service.service;

import com.ronit.user.user_service.dto.RegisterRequest;
import com.ronit.user.user_service.dto.UserDto;
import java.util.List;

public interface UserService {
    String registerUser(RegisterRequest request);
    List<UserDto> getAllUsers();
    UserDto getUserById(Long id);
    void deleteUser(Long id);
}