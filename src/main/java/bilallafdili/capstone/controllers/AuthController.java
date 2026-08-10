package bilallafdili.capstone.controllers;

import bilallafdili.capstone.recordsDTO.LoginPayloadDTO;
import bilallafdili.capstone.recordsDTO.LoginResponseDTO;
import bilallafdili.capstone.recordsDTO.RegistrazioneDTO;
import bilallafdili.capstone.services.AuthService;
import bilallafdili.capstone.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginResponseDTO login(@RequestBody @Valid LoginPayloadDTO body) {
        String token = authService.controllaCredenzialiEGeneraToken(body);
        return new LoginResponseDTO(token);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String register(@RequestBody @Valid RegistrazioneDTO body) {
        userService.registraUtente(body);
        return "Utente registrato con successo!";
    }
}
