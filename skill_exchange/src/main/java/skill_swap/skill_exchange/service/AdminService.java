package skill_swap.skill_exchange.service;

import skill_swap.skill_exchange.dto.request.SkillRequest;
import skill_swap.skill_exchange.dto.request.UserRequest;
import skill_swap.skill_exchange.dto.request.UserSkillLevelRequest;
import skill_swap.skill_exchange.dto.response.SkillResponse;
import skill_swap.skill_exchange.dto.response.UserResponse;
import skill_swap.skill_exchange.dto.response.UserSkillLevelResponse;

public interface AdminService {
    boolean deleteUser(Long id);
    UserResponse updateUser(Long id, UserRequest request);
    SkillResponse updateSkill(Long id, SkillRequest request);
    SkillResponse addSkill(SkillRequest request);
    boolean deleteSkill(Long id);
    UserSkillLevelResponse updateUserSkill(Long id, UserSkillLevelRequest request);
    boolean deleteUserSkill(Long id);
}
