package skill_swap.skill_exchange.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skill_swap.skill_exchange.model.SessionRequest;

import java.util.List;

public interface SessionRequestRepository extends JpaRepository<SessionRequest, Long> {

    List<SessionRequest> findByRequestGroupId(String requestGroupId);

    List<SessionRequest> findByRequesterId(Long requesterId);

    List<SessionRequest> findByReceiverId(Long receiverId);
}