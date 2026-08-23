package skill_swap.skill_exchange.service;

import skill_swap.skill_exchange.dto.request.RegisterRequest;
import skill_swap.skill_exchange.dto.request.LoginRequest;
import skill_swap.skill_exchange.dto.request.UserRequest;
import skill_swap.skill_exchange.dto.response.LoginResponse;
import skill_swap.skill_exchange.dto.response.RegisterResponse;
import skill_swap.skill_exchange.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    LoginResponse login(LoginRequest request);
    RegisterResponse createUser(RegisterRequest request);
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Long id);
    UserResponse updateUser(Long id, UserRequest request);
    boolean deleteUser(Long id);
    UserResponse updatePreference(Long id, String preference);
}
