import { Component, OnInit } from '@angular/core';
import { IrrigationService } from '../../services/irrigation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Capteur } from '../../models/interfaces';

@Component({
  selector: 'app-sensors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sensors.html'
})
export class SensorsComponent implements OnInit {
  sensors: Capteur[] = [];
  currentSensor: Capteur = { id: 0, type: 'HUMIDITE', parcelleId: 1, emplacement: '' };
  isEditing = false;

  constructor(private irrigationService: IrrigationService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.irrigationService.getCapteurs().subscribe(data => {
      this.sensors = data;
    });
  }

  saveSensor(): void {
    if (this.isEditing && this.currentSensor.id) {
      this.irrigationService.updateCapteur(this.currentSensor.id, this.currentSensor).subscribe(() => {
        this.resetForm();
        this.refresh();
      });
    } else {
      // Remove ID for creation if it's 0 or undefined, backend handles generation
      const { id, ...newSensor } = this.currentSensor;
      this.irrigationService.createCapteur(newSensor as Capteur).subscribe(() => {
        this.resetForm();
        this.refresh();
      });
    }
  }

  editSensor(sensor: Capteur): void {
    this.currentSensor = { ...sensor };
    this.isEditing = true;
  }

  deleteSensor(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce capteur ?')) {
      this.irrigationService.deleteCapteur(id).subscribe(() => {
        this.refresh();
      });
    }
  }

  resetForm(): void {
    this.currentSensor = { id: 0, type: 'HUMIDITE', parcelleId: 1, emplacement: '' };
    this.isEditing = false;
  }
}

