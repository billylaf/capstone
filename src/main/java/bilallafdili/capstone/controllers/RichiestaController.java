package bilallafdili.capstone.controllers;

import bilallafdili.capstone.entities.RichiestaPreventivo;
import bilallafdili.capstone.recordsDTO.RichiestaPreventivoDTO;
import bilallafdili.capstone.services.RichiestaPreventivoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/richieste")
public class RichiestaController {

    private final RichiestaPreventivoService richiestaService;

    public RichiestaController(RichiestaPreventivoService richiestaService) {
        this.richiestaService = richiestaService;
    }

    // 🔓 Pubblico - Chiunque può richiedere un preventivo
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RichiestaPreventivo createRichiesta(@RequestBody @Valid RichiestaPreventivoDTO request) {
        return richiestaService.createRichiesta(request);
    }

    // 🔒 ADMIN ONLY - Visualizza tutte le richieste
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<RichiestaPreventivo> getAllRichieste() {
        return richiestaService.getAllRichieste();
    }

    // 🔒 ADMIN ONLY - Dettaglio richiesta
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public RichiestaPreventivo getRichiestaById(@PathVariable Long id) {
        return richiestaService.getRichiestaById(id);
    }

    // 🔒 ADMIN ONLY - Aggiorna stato
    @PatchMapping("/{id}/stato")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public RichiestaPreventivo updateStato(@PathVariable Long id, @RequestParam String stato) {
        return richiestaService.updateStato(id, stato);
    }
}
