package bilallafdili.capstone.recordsDTO;

import bilallafdili.capstone.entities.Prodotto;

import java.time.LocalDateTime;
import java.util.List;

public record ProdottoResponseDTO(
        Long id,
        String nome,
        String descrizione,
        String categoria,
        Double prezzo,
        String immagine,
        String immagineThumb,
        List<String> immagini,
        String specifiche,
        Boolean disponibile,
        LocalDateTime dataCreazione
) {
    public static ProdottoResponseDTO fromEntity(Prodotto prodotto) {
        return new ProdottoResponseDTO(
                prodotto.getId(),
                prodotto.getNome(),
                prodotto.getDescrizione(),
                prodotto.getCategoria(),
                prodotto.getPrezzo(),
                prodotto.getImmagine(),
                prodotto.getImmagineThumb(),
                prodotto.getImmagini(),
                prodotto.getSpecifiche(),
                prodotto.getDisponibile(),
                prodotto.getDataCreazione()
        );
    }
}
