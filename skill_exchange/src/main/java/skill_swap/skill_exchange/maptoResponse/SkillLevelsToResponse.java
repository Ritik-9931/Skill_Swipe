package skill_swap.skill_exchange.maptoResponse;

import skill_swap.skill_exchange.dto.response.UserSkillLevelResponse;
import skill_swap.skill_exchange.model.UserSkillLevel;

public class SkillLevelsToResponse {
    public static UserSkillLevelResponse mapSkillLevelToResponse(UserSkillLevel skillLevel) {
        if (skillLevel == null) {
            return null;
        }

        UserSkillLevelResponse response = new UserSkillLevelResponse();
        response.setId(skillLevel.getId());
        response.setLevel(skillLevel.getLevel());
        response.setSkillId(skillLevel.getSkillId());
        response.setUserId(skillLevel.getUser().getId());
        return response;
    }
}
