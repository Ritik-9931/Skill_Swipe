package skill_swap.skill_exchange.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import skill_swap.skill_exchange.model.User;
import skill_swap.skill_exchange.model.UserSkillLevel;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSkillLevelRepository extends JpaRepository<UserSkillLevel, Long> {
    Optional<UserSkillLevel> findById(Long id);

    List<UserSkillLevel> findByUser(User user);
}
