package com.irrigation.analyse.controller;

import com.irrigation.analyse.entity.Modele;
import com.irrigation.analyse.entity.Recommandation;
import com.irrigation.analyse.service.AnalyseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analyse")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AnalyseController {
    private final AnalyseService analyseService;

    @PostMapping("/modeles")
    public Modele createModele(@RequestBody Modele modele) {
        return analyseService.createModele(modele);
    }

    @GetMapping("/modeles")
    public List<Modele> getAllModeles() {
        return analyseService.getAllModeles();
    }

    @GetMapping("/recommandations/{parcelleId}")
    public List<Recommandation> getRecommandations(@PathVariable Long parcelleId) {
        return analyseService.getRecommandationsByParcelle(parcelleId);
    }

    @GetMapping("/modeles/{id}")
    public Modele getModeleById(@PathVariable Long id) {
        return analyseService.getModeleById(id);
    }

    @PutMapping("/modeles/{id}")
    public Modele updateModele(@PathVariable Long id, @RequestBody Modele modele) {
        return analyseService.updateModele(id, modele);
    }

    @DeleteMapping("/modeles/{id}")
    public void deleteModele(@PathVariable Long id) {
        analyseService.deleteModele(id);
    }

    @PostMapping("/recommandations")
    public Recommandation createRecommandation(@RequestBody Recommandation recommandation) {
        return analyseService.createRecommandation(recommandation);
    }

    @GetMapping("/recommandations")
    public List<Recommandation> getAllRecommandations() {
        return analyseService.getAllRecommandations();
    }

    @GetMapping("/recommandations/detail/{id}")
    public Recommandation getRecommandationById(@PathVariable Long id) {
        return analyseService.getRecommandationById(id);
    }

    @PutMapping("/recommandations/{id}")
    public Recommandation updateRecommandation(@PathVariable Long id, @RequestBody Recommandation recommandation) {
        return analyseService.updateRecommandation(id, recommandation);
    }

    @DeleteMapping("/recommandations/{id}")
    public void deleteRecommandation(@PathVariable Long id) {
        analyseService.deleteRecommandation(id);
    }
}
