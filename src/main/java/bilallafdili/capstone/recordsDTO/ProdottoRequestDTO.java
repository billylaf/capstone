package bilallafdili.capstone.recordsDTO;

import bilallafdili.capstone.entities.Prodotto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProdottoRequestDTO(
        @NotBlank(message = "Il nome è obbligatorio")
        String nome,

        String descrizione,

        @NotBlank(message = "La categoria è obbligatoria")
        String categoria,

        @NotNull(message = "Il prezzo è obbligatorio")
        @Positive(message = "Il prezzo deve essere positivo")
        Double prezzo,

        String specifiche,

        Boolean disponibile
) {
    public Prodotto toProdotto() {
        Prodotto prodotto = new Prodotto();
        prodotto.setNome(this.nome);
        prodotto.setDescrizione(this.descrizione);
        prodotto.setCategoria(this.categoria);
        prodotto.setPrezzo(this.prezzo);
        prodotto.setSpecifiche(this.specifiche);
        prodotto.setDisponibile(this.disponibile != null ? this.disponibile : true);
        return prodotto;
    }
}
