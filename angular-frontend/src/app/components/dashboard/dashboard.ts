import { Component, OnInit } from '@angular/core';
import { IrrigationService } from '../../services/irrigation.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  stats = {
    sensorsCount: 0,
    recommendationsCount: 0,
    observationsCount: 0,
    modelsCount: 0,
    averagePrecision: 0
  };

  constructor(private irrigationService: IrrigationService) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    forkJoin({
      sensors: this.irrigationService.getCapteurs(),
      recommendations: this.irrigationService.getAllRecommandations(),
      observations: this.irrigationService.getObservations(),
      models: this.irrigationService.getModeles()
    }).subscribe(({ sensors, recommendations, observations, models }) => {
      this.stats.sensorsCount = sensors.length;
      this.stats.recommendationsCount = recommendations.length;
      this.stats.observationsCount = observations.length;
      this.stats.modelsCount = models.length;

      if (models.length > 0) {
        const avgPrecision = models.reduce((sum, m) => sum + (m.precision || 0), 0) / models.length;
        this.stats.averagePrecision = Math.round(avgPrecision * 100);
      } else {
        this.stats.averagePrecision = 0;
      }
    });
  }
}
