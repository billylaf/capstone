package bilallafdili.capstone.services;

import bilallafdili.capstone.entities.User;
import bilallafdili.capstone.exceptions.UnauthorizedException;
import bilallafdili.capstone.recordsDTO.LoginPayloadDTO;
import bilallafdili.capstone.security.JWTTools;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final JWTTools jwtTools;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService, JWTTools jwtTools, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtTools = jwtTools;
        this.passwordEncoder = passwordEncoder;
    }

    public String controllaCredenzialiEGeneraToken(LoginPayloadDTO body) {
        User user = userService.findByEmail(body.email());

        if (passwordEncoder.matches(body.password(), user.getPassword())) {
            return jwtTools.createToken(user);
        } else {
            throw new UnauthorizedException("Credenziali non valide!");
        }
    }
}
