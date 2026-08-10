package bilallafdili.capstone.services;

import bilallafdili.capstone.entities.Prodotto;
import bilallafdili.capstone.entities.RichiestaPreventivo;
import bilallafdili.capstone.exceptions.NotFoundException;
import bilallafdili.capstone.recordsDTO.RichiestaPreventivoDTO;
import bilallafdili.capstone.repositories.ProdottoRepository;
import bilallafdili.capstone.repositories.RichiestaPreventivoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RichiestaPreventivoService {

    private final RichiestaPreventivoRepository richiestaRepository;
    private final ProdottoRepository prodottoRepository;

    public RichiestaPreventivoService(RichiestaPreventivoRepository richiestaRepository,
                                      ProdottoRepository prodottoRepository) {
        this.richiestaRepository = richiestaRepository;
        this.prodottoRepository = prodottoRepository;
    }

    @Transactional
    public RichiestaPreventivo createRichiesta(RichiestaPreventivoDTO request) {
        RichiestaPreventivo richiesta = request.toEntity();

        if (request.prodottoId() != null) {
            Prodotto prodotto = prodottoRepository.findById(request.prodottoId())
                    .orElseThrow(() -> new NotFoundException("Prodotto con id " + request.prodottoId() + " non trovato"));
            richiesta.setProdotto(prodotto);
        }

        return richiestaRepository.save(richiesta);
    }

    public List<RichiestaPreventivo> getAllRichieste() {
        return richiestaRepository.findAll();
    }

    public RichiestaPreventivo getRichiestaById(Long id) {
        return richiestaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Richiesta con id " + id + " non trovata"));
    }

    @Transactional
    public RichiestaPreventivo updateStato(Long id, String stato) {
        RichiestaPreventivo richiesta = getRichiestaById(id);
        richiesta.setStato(stato);
        return richiestaRepository.save(richiesta);
    }
}
