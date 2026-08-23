package skill_swap.skill_exchange.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import skill_swap.skill_exchange.enums.Status;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "session")
@NoArgsConstructor
@AllArgsConstructor
public class SessionRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String requestGroupId;

    @Column(nullable = false)
    private Long requesterId;

    @Column(nullable = false)
    private List<Long> receiverIds;

    @Column(nullable = false)
    private Long skillId;

    @Column(length = 500)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;
}