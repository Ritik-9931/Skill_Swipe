package skill_swap.skill_exchange.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSkillLevelResponse {
    private Long id;

    private Long userId;

    private Long skillId;

    private int level;
}
