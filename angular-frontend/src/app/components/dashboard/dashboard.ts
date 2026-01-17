import { Component, OnInit, signal } from '@angular/core';
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
  stats = signal({
    sensorsCount: 0,
    recommendationsCount: 0,
    observationsCount: 0,
    modelsCount: 0,
    averagePrecision: 0
  });

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
      let avgPrecision = 0;
      if (models.length > 0) {
        avgPrecision = Math.round((models.reduce((sum, m) => sum + (m.precision || 0), 0) / models.length) * 100);
      }

      this.stats.set({
        sensorsCount: sensors.length,
        recommendationsCount: recommendations.length,
        observationsCount: observations.length,
        modelsCount: models.length,
        averagePrecision: avgPrecision
      });
    });
  }
}
