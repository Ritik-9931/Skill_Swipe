package skill_swap.skill_exchange.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSkillLevelRequest {
    private Long userId;

    private Long skillId;

    private int level;
}
