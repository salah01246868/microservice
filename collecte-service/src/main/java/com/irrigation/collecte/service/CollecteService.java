package com.irrigation.collecte.service;

import com.irrigation.collecte.entity.Capteur;
import com.irrigation.collecte.entity.Observation;
import com.irrigation.collecte.repository.CapteurRepository;
import com.irrigation.collecte.repository.ObservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CollecteService {
    private final CapteurRepository capteurRepository;
    private final ObservationRepository observationRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    private static final String TOPIC = "observations-topic";

    public Capteur createCapteur(Capteur capteur) {
        return capteurRepository.save(capteur);
    }

    public List<Capteur> getAllCapteurs() {
        return capteurRepository.findAll();
    }

    public Observation addObservation(Observation observation) {
        observation.setDate(LocalDateTime.now());
        Observation saved = observationRepository.save(observation);
        kafkaTemplate.send(TOPIC, saved);
        return saved;
    }

    public List<Observation> getObservationsByCapteur(Long capteurId) {
        return observationRepository.findByCapteurId(capteurId);
    }

    public Capteur updateCapteur(Long id, Capteur capteurDetails) {
        Capteur capteur = capteurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Capteur not found with id: " + id));
        capteur.setType(capteurDetails.getType());
        capteur.setParcelleId(capteurDetails.getParcelleId());
        capteur.setEmplacement(capteurDetails.getEmplacement());
        return capteurRepository.save(capteur);
    }

    public void deleteCapteur(Long id) {
        capteurRepository.deleteById(id);
    }

    public Capteur getCapteurById(Long id) {
        return capteurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Capteur not found with id: " + id));
    }

    public List<Observation> getAllObservations() {
        return observationRepository.findAll();
    }

    public Observation getObservationById(Long id) {
        return observationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Observation not found with id: " + id));
    }

    public Observation updateObservation(Long id, Observation observationDetails) {
        Observation observation = observationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Observation not found with id: " + id));
        observation.setCapteurId(observationDetails.getCapteurId());
        observation.setValeur(observationDetails.getValeur());
        observation.setUnite(observationDetails.getUnite());
        observation.setDate(observationDetails.getDate());
        return observationRepository.save(observation);
    }

    public void deleteObservation(Long id) {
        observationRepository.deleteById(id);
    }
}

