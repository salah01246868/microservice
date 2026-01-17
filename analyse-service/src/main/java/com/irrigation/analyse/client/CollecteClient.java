package com.irrigation.analyse.client;

import com.irrigation.analyse.dto.ObservationDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "collecte-service")
public interface CollecteClient {
    @GetMapping("/api/collecte/observations/{capteurId}")
    List<ObservationDTO> getObservations(@PathVariable Long capteurId);
}
