package com.irrigation.analyse.repository;

import com.irrigation.analyse.entity.Recommandation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecommandationRepository extends JpaRepository<Recommandation, Long> {
    List<Recommandation> findByParcelleId(Long parcelleId);
}
