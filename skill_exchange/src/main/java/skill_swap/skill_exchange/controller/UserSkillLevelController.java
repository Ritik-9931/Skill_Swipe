package skill_swap.skill_exchange.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import skill_swap.skill_exchange.dto.request.UserSkillLevelRequest;
import skill_swap.skill_exchange.dto.response.ApiResponse;
import skill_swap.skill_exchange.dto.response.UserSkillLevelResponse;
import skill_swap.skill_exchange.service.serviceImpl.UserSkillLevelServiceImpl;

import java.util.List;

@RestController
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://skill-swipe-eight.vercel.app/"
})
@RequestMapping("/api/userSkillLevels")
@SecurityRequirement(name = "bearerAuth")
public class UserSkillLevelController {

    @Autowired
    private UserSkillLevelServiceImpl userSkillLevelService;

    @GetMapping("/allSkillLevels/{id}")
    public ApiResponse<List<UserSkillLevelResponse>> getAllUserSkillLevels(@PathVariable Long id) {
        List<UserSkillLevelResponse> userSkillLevelResponse = userSkillLevelService.getAllSkillLevel(id);

        return new ApiResponse<>(true, "User skill levels retrieved successfully", userSkillLevelResponse);
    }

    @GetMapping("/skillLevel/{id}")
    public ApiResponse<UserSkillLevelResponse> getUserSkillLevel(@PathVariable Long id) {
        UserSkillLevelResponse userSkillLevelResponse = userSkillLevelService.getUserSkillLevel(id);
        return new ApiResponse<>(true, "User skill level retrieved successfully", userSkillLevelResponse);
    }

    @PostMapping("/skillLevel")
    public ApiResponse<UserSkillLevelResponse> createUserSkillLevel(@RequestBody UserSkillLevelRequest request) {
        UserSkillLevelResponse createdUserSkillLevel = userSkillLevelService.addUserSkillLevel(request);
        return new ApiResponse<>(true, "User skill level created successfully", createdUserSkillLevel);
    }

    @PutMapping("/skillLevel/{id}")
    public ApiResponse<UserSkillLevelResponse> updateUserSkillLevel(@PathVariable Long id, @RequestBody UserSkillLevelRequest request) {
        UserSkillLevelResponse updatedUserSkillLevel = userSkillLevelService.updateUserSkillLevel(id, request);
        return new ApiResponse<>(true, "User skill level updated successfully", updatedUserSkillLevel);
    }

    @DeleteMapping("/skillLevel/{id}")
    public ApiResponse<Boolean> deleteUserSkillLevel(@PathVariable Long id) {
        boolean isDeleted = userSkillLevelService.deleteSkillLevel(id);
        return new ApiResponse<>(true, "User skill level deleted successfully", isDeleted);
    }
}
