package skill_swap.skill_exchange.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import skill_swap.skill_exchange.dto.request.LoginRequest;
import skill_swap.skill_exchange.dto.request.RegisterRequest;
import skill_swap.skill_exchange.dto.request.UserRequest;
import skill_swap.skill_exchange.dto.response.ApiResponse;
import skill_swap.skill_exchange.dto.response.LoginResponse;
import skill_swap.skill_exchange.dto.response.RegisterResponse;
import skill_swap.skill_exchange.dto.response.UserResponse;
import skill_swap.skill_exchange.enums.Preference;
import skill_swap.skill_exchange.service.serviceImpl.UserServiceImpl;

import java.util.List;

@RestController
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://skill-swipe-eight.vercel.app/"
})
@RequestMapping("/api/users")
@SecurityRequirement(name = "bearerAuth")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/all")
    public ApiResponse<List<UserResponse>> getAllUsers(){
        List<UserResponse> responses = userService.getAllUsers();

        return new ApiResponse<>(true, "All users retrieved successfully", responses);
    }

    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUserById(@PathVariable Long id) {
        UserResponse response = userService.getUserById(id);
        return new ApiResponse<>(true, "User retrieved successfully", response);
    }

    @PutMapping("/update/{id}")
    public ApiResponse<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest request) {
        UserResponse updatedUser = userService.updateUser(id, request);
        return new ApiResponse<>(true, "User updated successfully", updatedUser);
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Boolean> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ApiResponse<>(true, "User deleted successfully", true);
    }

    @PutMapping("/updatePreference/{id}")
    public ApiResponse<UserResponse> updatePreference(@PathVariable Long id, @RequestParam String preference) {
        UserResponse updatedUser = userService.updatePreference(id, preference);
        return new ApiResponse<>(true, "User preference updated successfully", updatedUser);
    }
}
