import { Component, OnInit, signal } from '@angular/core';
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
  sensors = signal<Capteur[]>([]);
  currentSensor = signal<Capteur>({ id: 0, type: 'HUMIDITE', parcelleId: 1, emplacement: '' });
  isEditing = signal(false);

  constructor(private irrigationService: IrrigationService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.irrigationService.getCapteurs().subscribe(data => {
      this.sensors.set(data);
    });
  }

  saveSensor(): void {
    const sensorData = this.currentSensor();
    if (this.isEditing() && sensorData.id) {
      this.irrigationService.updateCapteur(sensorData.id, sensorData).subscribe(() => {
        this.resetForm();
        this.refresh();
      });
    } else {
      const { id, ...newSensor } = sensorData;
      this.irrigationService.createCapteur(newSensor as Capteur).subscribe(() => {
        this.resetForm();
        this.refresh();
      });
    }
  }

  editSensor(sensor: Capteur): void {
    this.currentSensor.set({ ...sensor });
    this.isEditing.set(true);
  }

  deleteSensor(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce capteur ?')) {
      this.irrigationService.deleteCapteur(id).subscribe(() => {
        this.refresh();
      });
    }
  }

  resetForm(): void {
    this.currentSensor.set({ id: 0, type: 'HUMIDITE', parcelleId: 1, emplacement: '' });
    this.isEditing.set(false);
  }
}

