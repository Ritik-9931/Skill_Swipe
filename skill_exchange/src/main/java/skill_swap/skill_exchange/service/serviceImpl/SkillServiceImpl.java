package skill_swap.skill_exchange.service.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import skill_swap.skill_exchange.dto.request.SkillRequest;
import skill_swap.skill_exchange.dto.response.SkillResponse;
import skill_swap.skill_exchange.exception.SkillAlreadyExistsException;
import skill_swap.skill_exchange.exception.SkillNotFoundException;
import skill_swap.skill_exchange.model.Skill;
import skill_swap.skill_exchange.repository.SkillRepository;
import skill_swap.skill_exchange.service.SkillService;

import java.util.List;
import java.util.Optional;

@Service
public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public SkillResponse getSkillByName(String name) {
        Optional<Skill> skill = skillRepository.findByName(name);
        if (skill.isEmpty()) {
            throw new SkillNotFoundException("Skill not found");
        }
        SkillResponse response = new SkillResponse();
        response.setId(skill.get().getId());
        response.setName(skill.get().getName());
        response.setDescription(skill.get().getDescription());
        return response;
    }

    @Override
    public SkillResponse createSkill(SkillRequest request) {

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
    public boolean deleteSkill(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new SkillNotFoundException("Skill not found"));
        skillRepository.delete(skill);
        return true;
    }

    @Override
    public List<SkillResponse> getAllSkills() {
        List<Skill> skills = skillRepository.findAll();

        if (skills.isEmpty()) {
            throw new SkillNotFoundException("No skills found");
        }

        return skills.stream().map(skill -> {
            SkillResponse response = new SkillResponse();
            response.setId(skill.getId());
            response.setName(skill.getName());
            response.setDescription(skill.getDescription());
            return response;
        }).toList();
    }
}
