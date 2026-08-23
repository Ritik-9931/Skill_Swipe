package skill_swap.skill_exchange.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import skill_swap.skill_exchange.dto.request.SkillRequest;
import skill_swap.skill_exchange.dto.response.ApiResponse;
import skill_swap.skill_exchange.dto.response.SkillResponse;
import skill_swap.skill_exchange.exception.SkillNotFoundException;
import skill_swap.skill_exchange.service.serviceImpl.SkillServiceImpl;

import java.util.List;

@RestController
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://skill-swipe-eight.vercel.app/"
})
@RequestMapping("/api/skills")
@SecurityRequirement(name = "bearerAuth")
public class SkillController {

    @Autowired
    private SkillServiceImpl skillService;

    @GetMapping("/all")
    public ApiResponse<List<SkillResponse>> getAllSkills() {
        List<SkillResponse> skills = skillService.getAllSkills();
        return new ApiResponse<>(true, "All skills retrieved successfully", skills);
    }

    @GetMapping("/skill/{name}")
    public ApiResponse<SkillResponse> getSkillByName(@PathVariable String name) {

        try {
        } catch (IllegalArgumentException e) {
            throw new SkillNotFoundException("Skill with name '" + name + "' not found");
        }
        SkillResponse skill = skillService.getSkillByName(name);
        return new ApiResponse<>(true, "Skill retrieved successfully", skill);
    }

    @PutMapping("/update/{id}")
    public ApiResponse<SkillResponse> updateSkill(@PathVariable Long id, @RequestBody SkillRequest request) {
        SkillResponse updatedSkill = skillService.updateSkill(id, request);
        return new ApiResponse<>(true, "Skill updated successfully", updatedSkill);
    }

    @PostMapping("/add")
    public ApiResponse<SkillResponse> addSkill(@RequestBody SkillRequest request) {
        SkillResponse newSkill = skillService.createSkill(request);
        return new ApiResponse<>(true, "Skill added successfully", newSkill);
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return new ApiResponse<>(true, "Skill deleted successfully", null);
    }
}
