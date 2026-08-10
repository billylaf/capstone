package bilallafdili.capstone.controllers;

import bilallafdili.capstone.recordsDTO.ProdottoRequestDTO;
import bilallafdili.capstone.recordsDTO.ProdottoResponseDTO;
import bilallafdili.capstone.services.ProdottoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/prodotti")
public class ProdottoController {

    private final ProdottoService prodottoService;

    public ProdottoController(ProdottoService prodottoService) {
        this.prodottoService = prodottoService;
    }

    // 🔓 Pubblico
    @GetMapping
    public List<ProdottoResponseDTO> getAllProdotti() {
        return prodottoService.getAllProdotti();
    }

    // 🔓 Pubblico
    @GetMapping("/{id}")
    public ProdottoResponseDTO getProdottoById(@PathVariable Long id) {
        return prodottoService.getProdottoById(id);
    }

    // 🔓 Pubblico
    @GetMapping("/categoria/{categoria}")
    public List<ProdottoResponseDTO> getByCategoria(@PathVariable String categoria) {
        return prodottoService.getProdottiByCategoria(categoria);
    }

    // 🔒 ADMIN ONLY
    @PostMapping(consumes = "multipart/form-data")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public ProdottoResponseDTO createProdotto(
            @RequestPart("prodotto") @Valid ProdottoRequestDTO request,
            @RequestPart(value = "immagine", required = false) MultipartFile immagine,
            @RequestPart(value = "immagini", required = false) List<MultipartFile> immagini) {
        return prodottoService.createProdotto(request, immagine, immagini);
    }

    // 🔒 ADMIN ONLY
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ProdottoResponseDTO updateProdotto(
            @PathVariable Long id,
            @RequestPart("prodotto") @Valid ProdottoRequestDTO request,
            @RequestPart(value = "immagine", required = false) MultipartFile immagine) {
        return prodottoService.updateProdotto(id, request, immagine);
    }

    // 🔒 ADMIN ONLY
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProdotto(@PathVariable Long id) {
        prodottoService.deleteProdotto(id);
    }
}