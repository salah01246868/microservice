package com.irrigation.collecte.repository;

import com.irrigation.collecte.entity.Capteur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CapteurRepository extends JpaRepository<Capteur, Long> {
}
