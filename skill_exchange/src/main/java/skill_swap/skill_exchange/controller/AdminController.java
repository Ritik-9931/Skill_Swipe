package skill_swap.skill_exchange.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import skill_swap.skill_exchange.dto.request.SkillRequest;
import skill_swap.skill_exchange.dto.request.UserRequest;
import skill_swap.skill_exchange.dto.request.UserSkillLevelRequest;
import skill_swap.skill_exchange.dto.response.ApiResponse;
import skill_swap.skill_exchange.dto.response.SkillResponse;
import skill_swap.skill_exchange.dto.response.UserResponse;
import skill_swap.skill_exchange.dto.response.UserSkillLevelResponse;
import skill_swap.skill_exchange.service.serviceImpl.AdminServiceImpl;

@RestController
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://skill-swipe-eight.vercel.app/"
})
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminServiceImpl adminService;

    @DeleteMapping("/deleteUser/{id}")
    public ApiResponse<Boolean> deleteUser(@PathVariable Long id) {
        boolean result = adminService.deleteUser(id);
        return new ApiResponse<>(true, "User delete successfully", result);
    }

    @PutMapping("/updateUser/{id}")
    public ApiResponse<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest request) {
        UserResponse response = adminService.updateUser(id, request);
        return new ApiResponse<>(true, "Update user Successfully", response);
    }

    @PutMapping("/updateSkill/{id}")
    public ApiResponse<SkillResponse> updateSkill(@PathVariable Long id, @RequestBody SkillRequest request) {
        SkillResponse response = adminService.updateSkill(id, request);
        return new ApiResponse<>(true, "Update skill successfully", response);
    }

    @PostMapping("/addSkill")
    public ApiResponse<SkillResponse> addSkill(@RequestBody SkillRequest request) {
        SkillResponse response = adminService.addSkill(request);
        return new ApiResponse<>(true, "Add Skill Successfully", response);
    }

    @DeleteMapping("/deleteSkill/{id}")
    public ApiResponse<Boolean> deleteSkill(@PathVariable Long id) {
        Boolean result = adminService.deleteSkill(id);
        return new ApiResponse<>(true, "Delete Skill Successfully", result);
    }

    @PutMapping("/updateUserSkill/{id}")
    public ApiResponse<UserSkillLevelResponse> updateUserSkill(@PathVariable Long id, @RequestBody UserSkillLevelRequest request) {
        UserSkillLevelResponse response = adminService.updateUserSkill(id, request);
        return new ApiResponse<>(true, "Update UserSkill", response);
    }

    @DeleteMapping("/deleteUserSkill/{id}")
    public ApiResponse<Boolean> deleteUserSkill(@PathVariable Long id) {
        Boolean result = adminService.deleteUserSkill(id);
        return new ApiResponse<>(true, "Delete User Skill Successfully", result);
    }
}
