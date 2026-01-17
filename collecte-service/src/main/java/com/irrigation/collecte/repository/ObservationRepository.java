package com.irrigation.collecte.repository;

import com.irrigation.collecte.entity.Observation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ObservationRepository extends JpaRepository<Observation, Long> {
    List<Observation> findByCapteurId(Long capteurId);
}
