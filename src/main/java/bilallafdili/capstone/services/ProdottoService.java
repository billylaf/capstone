package bilallafdili.capstone.services;

import bilallafdili.capstone.entities.Prodotto;
import bilallafdili.capstone.entities.RichiestaPreventivo;
import bilallafdili.capstone.exceptions.NotFoundException;
import bilallafdili.capstone.recordsDTO.ProdottoRequestDTO;
import bilallafdili.capstone.recordsDTO.ProdottoResponseDTO;
import bilallafdili.capstone.repositories.ProdottoRepository;
import bilallafdili.capstone.repositories.RichiestaPreventivoRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ProdottoService {

    private final ProdottoRepository prodottoRepository;
    private final RichiestaPreventivoRepository richiestaRepository; // AGGIUNTO
    private final Cloudinary cloudinary;

    @Value("${cloudinary.upload-folder:sollevamenti/prodotti}")
    private String uploadFolder;


    public ProdottoService(ProdottoRepository prodottoRepository,
                           RichiestaPreventivoRepository richiestaRepository,
                           Cloudinary cloudinary) {
        this.prodottoRepository = prodottoRepository;
        this.richiestaRepository = richiestaRepository;
        this.cloudinary = cloudinary;
    }

    public List<ProdottoResponseDTO> getAllProdotti() {
        return prodottoRepository.findAll().stream()
                .map(ProdottoResponseDTO::fromEntity)
                .toList();
    }

    public ProdottoResponseDTO getProdottoById(Long id) {
        Prodotto prodotto = prodottoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Prodotto con id " + id + " non trovato"));
        return ProdottoResponseDTO.fromEntity(prodotto);
    }

    public List<ProdottoResponseDTO> getProdottiByCategoria(String categoria) {
        return prodottoRepository.findByCategoria(categoria).stream()
                .map(ProdottoResponseDTO::fromEntity)
                .toList();
    }

    @Transactional
    public ProdottoResponseDTO createProdotto(ProdottoRequestDTO request,
                                              MultipartFile immagine,
                                              List<MultipartFile> immagini) {
        Prodotto prodotto = request.toProdotto();

        // Carica immagine principale
        if (immagine != null && !immagine.isEmpty()) {
            Map<String, String> result = uploadImageWithThumbnail(immagine);
            prodotto.setImmagine(result.get("original"));
            prodotto.setImmagineThumb(result.get("thumbnail"));
        }

        // Carica immagini multiple
        if (immagini != null && !immagini.isEmpty()) {
            List<String> urls = uploadMultipleImages(immagini);
            prodotto.setImmagini(urls);
        }

        Prodotto saved = prodottoRepository.save(prodotto);
        return ProdottoResponseDTO.fromEntity(saved);
    }

    @Transactional
    public ProdottoResponseDTO updateProdotto(Long id, ProdottoRequestDTO request, MultipartFile immagine) {
        Prodotto prodotto = prodottoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Prodotto con id " + id + " non trovato"));

        prodotto.setNome(request.nome());
        prodotto.setDescrizione(request.descrizione());
        prodotto.setCategoria(request.categoria());
        prodotto.setPrezzo(request.prezzo());
        prodotto.setSpecifiche(request.specifiche());
        prodotto.setDisponibile(request.disponibile() != null ? request.disponibile() : prodotto.getDisponibile());

        // Se c'è una nuova immagine, caricala
        if (immagine != null && !immagine.isEmpty()) {
            Map<String, String> result = uploadImageWithThumbnail(immagine);
            prodotto.setImmagine(result.get("original"));
            prodotto.setImmagineThumb(result.get("thumbnail"));
        }

        Prodotto updated = prodottoRepository.save(prodotto);
        return ProdottoResponseDTO.fromEntity(updated);
    }

    @Transactional
    public void deleteProdotto(Long id) {
        Prodotto prodotto = prodottoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Prodotto con id " + id + " non trovato"));

        // 🔥 LOGICA AGGIUNTA: Scollega il prodotto dalle richieste di preventivo
        List<RichiestaPreventivo> richiesteCollegate = richiestaRepository.findByProdottoId(id);
        for (RichiestaPreventivo r : richiesteCollegate) {
            r.setProdotto(null); // Imposta il prodotto a null
            richiestaRepository.save(r); // Salva la modifica nel database
        }

        // Ora puoi eliminare il prodotto in sicurezza
        prodottoRepository.delete(prodotto);
    }

    // Metodi privati per Cloudinary
    private Map<String, String> uploadImageWithThumbnail(MultipartFile file) {
        try {
            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", uploadFolder,
                            "public_id", System.currentTimeMillis() + "_" + file.getOriginalFilename()
                    )
            );

            String originalUrl = uploadResult.get("secure_url").toString();
            String publicId = uploadResult.get("public_id").toString();

            String thumbnailUrl = cloudinary.url()
                    .transformation(new com.cloudinary.Transformation()
                            .width(300)
                            .height(300)
                            .crop("fill")
                            .gravity("center"))
                    .publicId(publicId)
                    .generate();

            Map<String, String> result = new java.util.HashMap<>();
            result.put("original", originalUrl);
            result.put("thumbnail", thumbnailUrl);
            return result;
        } catch (IOException e) {
            throw new RuntimeException("Errore durante il caricamento dell'immagine: " + e.getMessage());
        }
    }

    private List<String> uploadMultipleImages(List<MultipartFile> files) {
        List<String> urls = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                Map result = cloudinary.uploader().upload(
                        file.getBytes(),
                        ObjectUtils.asMap("folder", uploadFolder)
                );
                urls.add(result.get("secure_url").toString());
            } catch (IOException e) {
                throw new RuntimeException("Errore durante il caricamento delle immagini: " + e.getMessage());
            }
        }
        return urls;
    }
}