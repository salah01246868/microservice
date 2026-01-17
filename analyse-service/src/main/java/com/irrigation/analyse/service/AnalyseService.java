package com.irrigation.analyse.service;

import com.irrigation.analyse.client.CollecteClient;
import com.irrigation.analyse.dto.ObservationDTO;
import com.irrigation.analyse.entity.Modele;
import com.irrigation.analyse.entity.Recommandation;
import com.irrigation.analyse.repository.ModeleRepository;
import com.irrigation.analyse.repository.RecommandationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalyseService {
    private final ModeleRepository modeleRepository;
    private final RecommandationRepository recommandationRepository;
    private final CollecteClient collecteClient;

    public Modele createModele(Modele modele) {
        return modeleRepository.save(modele);
    }

    public List<Modele> getAllModeles() {
        return modeleRepository.findAll();
    }

    public List<Recommandation> getRecommandationsByParcelle(Long parcelleId) {
        return recommandationRepository.findByParcelleId(parcelleId);
    }

    @KafkaListener(topics = "observations-topic", groupId = "analyse-group")
    public void consumeObservation(ObservationDTO observation) {
        log.info("Received observation: {}", observation);
        // Simulate IA Recommendation logic
        double quantity = calculateWaterQuantity(observation);
        
        Recommandation reco = Recommandation.builder()
                .parcelleId(1L) // Simplified for demo
                .quantiteEau(quantity)
                .justification("Basé sur la valeur " + observation.getValeur() + " du capteur " + observation.getCapteurId())
                .dateCalcul(LocalDateTime.now())
                .build();
        
        recommandationRepository.save(reco);
        log.info("Saved recommendation: {}", reco);
    }

    private double calculateWaterQuantity(ObservationDTO observation) {
        // Dummy logic: more value = less water (e.g. if value is humidity)
        if (observation.getValeur() < 30.0) {
            return 50.0;
        } else if (observation.getValeur() < 60.0) {
            return 20.0;
        } else {
            return 0.0;
        }
    }

    public Modele getModeleById(Long id) {
        return modeleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Modele not found with id: " + id));
    }

    public Modele updateModele(Long id, Modele modeleDetails) {
        Modele modele = modeleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Modele not found with id: " + id));
        modele.setType(modeleDetails.getType());
        modele.setVersion(modeleDetails.getVersion());
        modele.setDateApprentissage(modeleDetails.getDateApprentissage());
        modele.setPrecision(modeleDetails.getPrecision());
        return modeleRepository.save(modele);
    }

    public void deleteModele(Long id) {
        modeleRepository.deleteById(id);
    }

    public Recommandation createRecommandation(Recommandation recommandation) {
        recommandation.setDateCalcul(LocalDateTime.now());
        return recommandationRepository.save(recommandation);
    }

    public List<Recommandation> getAllRecommandations() {
        return recommandationRepository.findAll();
    }

    public Recommandation getRecommandationById(Long id) {
        return recommandationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recommandation not found with id: " + id));
    }

    public Recommandation updateRecommandation(Long id, Recommandation recommandationDetails) {
        Recommandation recommandation = recommandationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recommandation not found with id: " + id));
        recommandation.setParcelleId(recommandationDetails.getParcelleId());
        recommandation.setQuantiteEau(recommandationDetails.getQuantiteEau());
        recommandation.setJustification(recommandationDetails.getJustification());
        recommandation.setDateCalcul(recommandationDetails.getDateCalcul());
        return recommandationRepository.save(recommandation);
    }

    public void deleteRecommandation(Long id) {
        recommandationRepository.deleteById(id);
    }
}
