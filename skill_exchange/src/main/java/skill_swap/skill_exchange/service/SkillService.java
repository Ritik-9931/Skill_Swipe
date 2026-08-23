package skill_swap.skill_exchange.service;

import skill_swap.skill_exchange.dto.request.SkillRequest;
import skill_swap.skill_exchange.dto.response.SkillResponse;

import java.util.List;

public interface SkillService {
    SkillResponse getSkillByName(String name);
    SkillResponse createSkill(SkillRequest request);
    SkillResponse updateSkill(Long id, SkillRequest request);
    boolean deleteSkill(Long id);
    List<SkillResponse> getAllSkills();
}
