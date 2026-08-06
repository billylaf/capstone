package bilallafdili.capstone.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "richieste_preventivo")
@Getter
@Setter
@NoArgsConstructor
public class RichiestaPreventivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_cliente", nullable = false)
    private String nomeCliente;

    @Column(name = "email_cliente", nullable = false)
    private String emailCliente;

    private String telefono;

    @Column(columnDefinition = "TEXT")
    private String messaggio;

    private String stato = "PENDING";

    @ManyToOne
    @JoinColumn(name = "prodotto_id")
    private Prodotto prodotto;

    @CreationTimestamp
    @Column(name = "data_creazione", updatable = false)
    private LocalDateTime dataCreazione;
}
