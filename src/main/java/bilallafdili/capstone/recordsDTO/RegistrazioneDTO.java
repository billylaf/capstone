package bilallafdili.capstone.recordsDTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegistrazioneDTO(
        @NotBlank(message = "Lo username è obbligatorio")
        String username,

        @NotBlank(message = "L'email è obbligatoria")
        @Email(message = "Inserisci un'email valida")
        String email,

        @NotBlank(message = "La password è obbligatoria")
        String password
) {
}
