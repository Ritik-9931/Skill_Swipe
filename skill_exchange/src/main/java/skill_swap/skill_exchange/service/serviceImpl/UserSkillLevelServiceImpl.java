package skill_swap.skill_exchange.service.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import skill_swap.skill_exchange.dto.request.UserSkillLevelRequest;
import skill_swap.skill_exchange.dto.response.UserSkillLevelResponse;
import skill_swap.skill_exchange.exception.UserNotFoundException;
import skill_swap.skill_exchange.maptoResponse.SkillLevelsToResponse;
import skill_swap.skill_exchange.model.User;
import skill_swap.skill_exchange.model.UserSkillLevel;
import skill_swap.skill_exchange.repository.UserRepository;
import skill_swap.skill_exchange.repository.UserSkillLevelRepository;
import skill_swap.skill_exchange.service.UserSkillLevelService;

import java.util.List;

@Service
public class UserSkillLevelServiceImpl implements UserSkillLevelService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSkillLevelRepository userSkillLevelRepository;

    @Override
    public UserSkillLevelResponse addUserSkillLevel(UserSkillLevelRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(
                () -> new UserNotFoundException("User not found")
        );

        UserSkillLevel userSkillLevel = new UserSkillLevel();

        userSkillLevel.setLevel(request.getLevel());
        userSkillLevel.setSkillId(request.getSkillId());
        userSkillLevel.setUser(user);
        UserSkillLevel savedUserSkillLevel = userSkillLevelRepository.save(userSkillLevel);

        return SkillLevelsToResponse.mapSkillLevelToResponse(savedUserSkillLevel);
    }

    @Override
    public UserSkillLevelResponse updateUserSkillLevel(Long id, UserSkillLevelRequest request) {
        UserSkillLevel userSkillLevel = userSkillLevelRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User skill level not found")
        );

        userSkillLevel.setLevel(request.getLevel());
        userSkillLevel.setSkillId(request.getSkillId());
        UserSkillLevel updatedUserSkillLevel = userSkillLevelRepository.save(userSkillLevel);

        return SkillLevelsToResponse.mapSkillLevelToResponse(updatedUserSkillLevel);
    }

    @Override
    public UserSkillLevelResponse getUserSkillLevel(Long id) {
        UserSkillLevel userSkillLevel = userSkillLevelRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User skill level not found")
        );

        return SkillLevelsToResponse.mapSkillLevelToResponse(userSkillLevel);
    }

    @Override
    public List<UserSkillLevelResponse> getAllSkillLevel(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User not found")
        );
        return userSkillLevelRepository.findByUser(user).stream()
                .map(SkillLevelsToResponse::mapSkillLevelToResponse)
                .toList();
    }

    @Override
    public boolean deleteSkillLevel(Long id) {
        UserSkillLevel userSkillLevel = userSkillLevelRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User skill level not found")
        );

        userSkillLevelRepository.delete(userSkillLevel);
        return true;
    }
}
