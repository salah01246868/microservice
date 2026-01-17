package com.irrigation.collecte.controller;

import com.irrigation.collecte.entity.Capteur;
import com.irrigation.collecte.entity.Observation;
import com.irrigation.collecte.service.CollecteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collecte")
@RequiredArgsConstructor
public class CollecteController {
    private final CollecteService collecteService;

    @PostMapping("/capteurs")
    public Capteur createCapteur(@RequestBody Capteur capteur) {
        return collecteService.createCapteur(capteur);
    }

    @GetMapping("/capteurs")
    public List<Capteur> getAllCapteurs() {
        return collecteService.getAllCapteurs();
    }

    @PostMapping("/observations")
    public Observation addObservation(@RequestBody Observation observation) {
        return collecteService.addObservation(observation);
    }

    @GetMapping("/observations/{capteurId}")
    public List<Observation> getObservations(@PathVariable Long capteurId) {
        return collecteService.getObservationsByCapteur(capteurId);
    }

    @PutMapping("/capteurs/{id}")
    public Capteur updateCapteur(@PathVariable Long id, @RequestBody Capteur capteur) {
        return collecteService.updateCapteur(id, capteur);
    }

    @DeleteMapping("/capteurs/{id}")
    public void deleteCapteur(@PathVariable Long id) {
        collecteService.deleteCapteur(id);
    }

    @GetMapping("/capteurs/{id}")
    public Capteur getCapteurById(@PathVariable Long id) {
        return collecteService.getCapteurById(id);
    }

    @GetMapping("/observations")
    public List<Observation> getAllObservations() {
        return collecteService.getAllObservations();
    }

    @GetMapping("/observations/detail/{id}")
    public Observation getObservationById(@PathVariable Long id) {
        return collecteService.getObservationById(id);
    }

    @PutMapping("/observations/{id}")
    public Observation updateObservation(@PathVariable Long id, @RequestBody Observation observation) {
        return collecteService.updateObservation(id, observation);
    }

    @DeleteMapping("/observations/{id}")
    public void deleteObservation(@PathVariable Long id) {
        collecteService.deleteObservation(id);
    }
}
