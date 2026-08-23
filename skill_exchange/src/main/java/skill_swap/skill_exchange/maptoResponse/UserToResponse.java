package skill_swap.skill_exchange.maptoResponse;

import skill_swap.skill_exchange.dto.response.UserResponse;
import skill_swap.skill_exchange.model.User;
import skill_swap.skill_exchange.model.UserSkillLevel;

import java.util.Collections;

public class UserToResponse {
    public static UserResponse mapToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setPreference(user.getPreference());
        response.setUserSkillLevels(
                user.getUserSkillLevels()
                        .stream()
                        .map(SkillLevelsToResponse::mapSkillLevelToResponse)
                        .toList()
        );
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        return response;
    }
}
