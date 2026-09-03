package skill_swap.skill_exchange.service.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import skill_swap.skill_exchange.config.JwtService;
import skill_swap.skill_exchange.dto.request.RegisterRequest;
import skill_swap.skill_exchange.dto.request.LoginRequest;
import skill_swap.skill_exchange.dto.request.UserRequest;
import skill_swap.skill_exchange.dto.response.LoginResponse;
import skill_swap.skill_exchange.dto.response.RegisterResponse;
import skill_swap.skill_exchange.dto.response.UserResponse;
import skill_swap.skill_exchange.enums.Preference;
import skill_swap.skill_exchange.enums.Role;
import skill_swap.skill_exchange.exception.InvalidCredentialsException;
import skill_swap.skill_exchange.exception.UserAlreadyExistsException;
import skill_swap.skill_exchange.exception.UserNotFoundException;
import skill_swap.skill_exchange.maptoResponse.UserToResponse;
import skill_swap.skill_exchange.model.User;
import skill_swap.skill_exchange.repository.UserRepository;
import skill_swap.skill_exchange.service.UserService;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    private UserToResponse userToResponse;

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());

        RegisterResponse registerResponse = new RegisterResponse();

        registerResponse.setId(user.getId());
        registerResponse.setEmail(user.getEmail());
        registerResponse.setUsername(user.getUsername());
        registerResponse.setRole(user.getRole().toString());
        registerResponse.setFirstName(user.getFirstName());
        registerResponse.setLastName(user.getLastName());

        return new LoginResponse(token, registerResponse);
    }

    @Override
    public RegisterResponse createUser(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Email already exists");
        }

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException("User Already Exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
        user.setUsername(request.getUsername());
        user.setRole(Role.USER);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        User savedUser = userRepository.save(user);

        RegisterResponse response = new RegisterResponse();
        response.setId(savedUser.getId());
        response.setEmail(savedUser.getEmail());
        response.setUsername(savedUser.getUsername());
        response.setFirstName(savedUser.getFirstName());
        response.setLastName(savedUser.getLastName());
        response.setRole(savedUser.getRole().toString());
        return response;
    }

    @Override
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream().map(UserToResponse::mapToResponse).toList();
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return UserToResponse.mapToResponse(user);
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
    public boolean deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        userRepository.delete(user);
        return true;
    }

    @Override
    public UserResponse updatePreference(Long id, String preference) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        user.setPreference(Preference.valueOf(preference));
        User updatedUser = userRepository.save(user);

        return UserToResponse.mapToResponse(updatedUser);
    }
}
