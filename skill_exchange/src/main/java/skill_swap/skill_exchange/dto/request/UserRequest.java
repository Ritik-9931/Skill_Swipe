package skill_swap.skill_exchange.dto.request;

import lombok.Getter;
import lombok.Setter;
import skill_swap.skill_exchange.enums.Preference;

@Getter
@Setter
public class UserRequest {
    private String username;

    private String firstName;

    private String lastName;

    private Preference preference;

    private String password;
}
