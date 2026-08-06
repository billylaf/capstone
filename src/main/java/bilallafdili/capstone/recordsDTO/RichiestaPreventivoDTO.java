package bilallafdili.capstone.recordsDTO;

import bilallafdili.capstone.entities.RichiestaPreventivo;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RichiestaPreventivoDTO(
        @NotBlank(message = "Il nome è obbligatorio")
        String nomeCliente,

        @NotBlank(message = "L'email è obbligatoria")
        @Email(message = "Inserisci un'email valida")
        String emailCliente,

        String telefono,

        String messaggio,

        Long prodottoId
) {
    public RichiestaPreventivo toEntity() {
        RichiestaPreventivo richiesta = new RichiestaPreventivo();
        richiesta.setNomeCliente(this.nomeCliente);
        richiesta.setEmailCliente(this.emailCliente);
        richiesta.setTelefono(this.telefono);
        richiesta.setMessaggio(this.messaggio);
        richiesta.setStato("PENDING");
        return richiesta;
    }
}
