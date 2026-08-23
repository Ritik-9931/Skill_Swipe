package skill_swap.skill_exchange.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import skill_swap.skill_exchange.dto.request.RegisterRequest;
import skill_swap.skill_exchange.dto.request.LoginRequest;
import skill_swap.skill_exchange.dto.response.ApiResponse;
import skill_swap.skill_exchange.dto.response.LoginResponse;
import skill_swap.skill_exchange.dto.response.RegisterResponse;
import skill_swap.skill_exchange.service.serviceImpl.UserServiceImpl;

@RestController
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://skill-swipe-eight.vercel.app/"
})
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request) {

        LoginResponse response = userService.login(request);

        return new ApiResponse<>(true, "Login successful", response);
    }

    @PostMapping("/register")
    public ApiResponse<RegisterResponse> register(@RequestBody RegisterRequest request){
        RegisterResponse response = userService.createUser(request);

        return new ApiResponse<>(true, "User registered successfully", response);
    }
}
