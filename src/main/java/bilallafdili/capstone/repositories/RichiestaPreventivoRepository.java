package bilallafdili.capstone.repositories;

import bilallafdili.capstone.entities.RichiestaPreventivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RichiestaPreventivoRepository extends JpaRepository<RichiestaPreventivo, Long> {
    List<RichiestaPreventivo> findByStato(String stato);

    List<RichiestaPreventivo> findByProdottoId(Long id);
}
