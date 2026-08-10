package bilallafdili.capstone.services;

import bilallafdili.capstone.entities.User;
import bilallafdili.capstone.exceptions.NotFoundException;
import bilallafdili.capstone.recordsDTO.RegistrazioneDTO;
import bilallafdili.capstone.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User registraUtente(RegistrazioneDTO body) {
        if (userRepository.existsByUsername(body.username())) {
            new BadRequestException("Username già in uso!");
        }

        User user = new User(
                body.username(),
                body.email(),
                passwordEncoder.encode(body.password())
        );

        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Utente con email: " + email + " non trovato"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Utente con id " + id + " non trovato"));
    }
}
