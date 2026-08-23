package skill_swap.skill_exchange.dto.response;

import lombok.Getter;
import lombok.Setter;
import skill_swap.skill_exchange.enums.Preference;
import skill_swap.skill_exchange.enums.Role;

import java.util.List;

@Getter
@Setter
public class UserResponse {

    private Long id;

    private String username;

    private String email;

    private String firstName;

    private String lastName;

    private Role role;

    private Preference preference;

    private List<UserSkillLevelResponse> userSkillLevels;
}
