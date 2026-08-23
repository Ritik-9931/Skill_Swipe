package skill_swap.skill_exchange.service;

import skill_swap.skill_exchange.dto.request.UserSkillLevelRequest;
import skill_swap.skill_exchange.dto.response.UserResponse;
import skill_swap.skill_exchange.dto.response.UserSkillLevelResponse;

import java.util.List;

public interface UserSkillLevelService {
    UserSkillLevelResponse addUserSkillLevel(UserSkillLevelRequest request);
    UserSkillLevelResponse updateUserSkillLevel(Long id, UserSkillLevelRequest request);
    UserSkillLevelResponse getUserSkillLevel(Long id);
    List<UserSkillLevelResponse> getAllSkillLevel(Long userId);
    boolean deleteSkillLevel(Long id);
}
