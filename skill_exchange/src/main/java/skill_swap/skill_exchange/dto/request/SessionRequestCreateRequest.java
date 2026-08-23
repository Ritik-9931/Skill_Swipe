package skill_swap.skill_exchange.dto.request;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import skill_swap.skill_exchange.enums.Status;

import java.util.List;

@Getter
@Setter
public class SessionRequestCreateRequest {

    private Long requesterId;

    private String requestGroupId;

    private Long receiverId;

    private Long skillId;

    private String message;

    private String status;
}