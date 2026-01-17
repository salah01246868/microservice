package com.irrigation.analyse.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ObservationDTO {
    private Long id;
    private Long capteurId;
    private Double valeur;
    private String unite;
    private LocalDateTime date;
}
