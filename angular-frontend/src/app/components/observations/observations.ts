import { Component, OnInit } from '@angular/core';
import { IrrigationService } from '../../services/irrigation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observation, Capteur } from '../../models/interfaces';

@Component({
    selector: 'app-observations',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './observations.html'
})
export class ObservationsComponent implements OnInit {
    observations: Observation[] = [];
    capteurs: Capteur[] = [];
    currentObservation: Observation = { id: 0, capteurId: 1, valeur: 0, unite: '%', date: new Date().toISOString() };
    isEditing = false;

    constructor(private irrigationService: IrrigationService) { }

    ngOnInit(): void {
        this.refresh();
        this.loadCapteurs();
    }

    refresh(): void {
        this.irrigationService.getObservations().subscribe(data => {
            this.observations = data;
        });
    }

    loadCapteurs(): void {
        this.irrigationService.getCapteurs().subscribe(data => {
            this.capteurs = data;
        });
    }

    saveObservation(): void {
        if (this.isEditing && this.currentObservation.id) {
            this.irrigationService.updateObservation(this.currentObservation.id, this.currentObservation).subscribe(() => {
                this.resetForm();
                this.refresh();
            });
        } else {
            const { id, ...newObs } = this.currentObservation;
            this.irrigationService.addObservation(newObs as Observation).subscribe(() => {
                this.resetForm();
                this.refresh();
            });
        }
    }

    editObservation(observation: Observation): void {
        this.currentObservation = { ...observation };
        this.isEditing = true;
    }

    deleteObservation(id: number): void {
        if (confirm('Voulez-vous vraiment supprimer cette observation ?')) {
            this.irrigationService.deleteObservation(id).subscribe(() => {
                this.refresh();
            });
        }
    }

    resetForm(): void {
        this.currentObservation = { id: 0, capteurId: 1, valeur: 0, unite: '%', date: new Date().toISOString() };
        this.isEditing = false;
    }

    getCapteurInfo(capteurId: number): string {
        const capteur = this.capteurs.find(c => c.id === capteurId);
        return capteur ? `${capteur.type} (${capteur.emplacement})` : `Capteur #${capteurId}`;
    }
}
