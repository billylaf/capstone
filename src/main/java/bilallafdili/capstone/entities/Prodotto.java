package bilallafdili.capstone.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "prodotti")
@Getter
@Setter
@NoArgsConstructor
public class Prodotto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descrizione;

    private String categoria;

    @Column(nullable = false)
    private Double prezzo;

    private String immagine;

    private String immagineThumb;

    @ElementCollection
    @CollectionTable(name = "prodotti_immagini", joinColumns = @JoinColumn(name = "prodotto_id"))
    @Column(name = "image_url")
    private List<String> immagini = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String specifiche;

    @Column(name = "disponibile")
    private Boolean disponibile = true;

    @CreationTimestamp
    @Column(name = "data_creazione", updatable = false)
    private LocalDateTime dataCreazione;
}