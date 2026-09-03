package skill_swap.skill_exchange.service.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import skill_swap.skill_exchange.dto.request.SkillRequest;
import skill_swap.skill_exchange.dto.request.UserRequest;
import skill_swap.skill_exchange.dto.request.UserSkillLevelRequest;
import skill_swap.skill_exchange.dto.response.SkillResponse;
import skill_swap.skill_exchange.dto.response.UserResponse;
import skill_swap.skill_exchange.dto.response.UserSkillLevelResponse;
import skill_swap.skill_exchange.exception.SkillAlreadyExistsException;
import skill_swap.skill_exchange.exception.SkillNotFoundException;
import skill_swap.skill_exchange.exception.UserAlreadyExistsException;
import skill_swap.skill_exchange.exception.UserNotFoundException;
import skill_swap.skill_exchange.maptoResponse.SkillLevelsToResponse;
import skill_swap.skill_exchange.maptoResponse.UserToResponse;
import skill_swap.skill_exchange.model.Skill;
import skill_swap.skill_exchange.model.User;
import skill_swap.skill_exchange.model.UserSkillLevel;
import skill_swap.skill_exchange.repository.SkillRepository;
import skill_swap.skill_exchange.repository.UserRepository;
import skill_swap.skill_exchange.repository.UserSkillLevelRepository;
import skill_swap.skill_exchange.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserSkillLevelRepository userSkillLevelRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public boolean deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        userRepository.delete(user);
        return true;
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (request.getUsername() != null && !request.getUsername().equals(user.getUsername())) {
            if (userRepository.findAll().stream().anyMatch(u -> u.getUsername().equals(request.getUsername()))) {
                throw new UserAlreadyExistsException("Username already exists");
            }
            user.setUsername(request.getUsername());
        }

        if (request.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPreference(request.getPreference());

        User updatedUser = userRepository.save(user);

        return UserToResponse.mapToResponse(updatedUser);
    }

    @Override
    public SkillResponse updateSkill(Long id, SkillRequest request) {
        Skill existingSkill = skillRepository.findByName(request.getName())
                .orElse(null);

        if (existingSkill != null && !existingSkill.getId().equals(id)) {
            throw new SkillAlreadyExistsException("Skill with this name already exists");
        }

        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new SkillNotFoundException("Skill not found"));

        skill.setName(request.getName());
        skill.setDescription(request.getDescription());
        Skill updatedSkill = skillRepository.save(skill);

        SkillResponse response = new SkillResponse();
        response.setId(updatedSkill.getId());
        response.setName(updatedSkill.getName());
        response.setDescription(updatedSkill.getDescription());
        return response;
    }

    @Override
    public SkillResponse addSkill(SkillRequest request) {
        Skill existingSkill = skillRepository.findByName(request.getName())
                .orElse(null);

        if (existingSkill != null) {
            throw new SkillAlreadyExistsException("Skill already exists");
        }

        Skill skill = new Skill();
        skill.setName(request.getName());
        skill.setDescription(request.getDescription());

        Skill savedSkill = skillRepository.save(skill);

        SkillResponse response = new SkillResponse();
        response.setId(savedSkill.getId());
        response.setName(savedSkill.getName());
        response.setDescription(savedSkill.getDescription());

        return response;
    }

    @Override
    public boolean deleteSkill(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new SkillNotFoundException("Skill not found"));
        skillRepository.delete(skill);
        return true;
    }

    @Override
    public UserSkillLevelResponse updateUserSkill(Long id, UserSkillLevelRequest request) {
        UserSkillLevel userSkillLevel = userSkillLevelRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User skill level not found")
        );

        userSkillLevel.setLevel(request.getLevel());
        userSkillLevel.setSkillId(request.getSkillId());
        UserSkillLevel updatedUserSkillLevel = userSkillLevelRepository.save(userSkillLevel);

        return SkillLevelsToResponse.mapSkillLevelToResponse(updatedUserSkillLevel);
    }

    @Override
    public boolean deleteUserSkill(Long id) {
        UserSkillLevel userSkillLevel = userSkillLevelRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User skill level not found")
        );

        userSkillLevelRepository.delete(userSkillLevel);
        return true;
    }
}
