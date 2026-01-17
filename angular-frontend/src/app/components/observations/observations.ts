import { Component, OnInit, signal } from '@angular/core';
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
    observations = signal<Observation[]>([]);
    capteurs = signal<Capteur[]>([]);
    currentObservation = signal<Observation>({ id: 0, capteurId: 1, valeur: 0, unite: '%', date: new Date().toISOString() });
    isEditing = signal(false);

    constructor(private irrigationService: IrrigationService) { }

    ngOnInit(): void {
        this.refresh();
        this.loadCapteurs();
    }

    refresh(): void {
        this.irrigationService.getObservations().subscribe(data => {
            this.observations.set(data);
        });
    }

    loadCapteurs(): void {
        this.irrigationService.getCapteurs().subscribe(data => {
            this.capteurs.set(data);
        });
    }

    saveObservation(): void {
        const obsData = this.currentObservation();
        if (this.isEditing() && obsData.id) {
            this.irrigationService.updateObservation(obsData.id, obsData).subscribe(() => {
                this.resetForm();
                this.refresh();
            });
        } else {
            const { id, ...newObs } = obsData;
            this.irrigationService.addObservation(newObs as Observation).subscribe(() => {
                this.resetForm();
                this.refresh();
            });
        }
    }

    editObservation(observation: Observation): void {
        this.currentObservation.set({ ...observation });
        this.isEditing.set(true);
    }

    deleteObservation(id: number): void {
        if (confirm('Voulez-vous vraiment supprimer cette observation ?')) {
            this.irrigationService.deleteObservation(id).subscribe(() => {
                this.refresh();
            });
        }
    }

    resetForm(): void {
        this.currentObservation.set({ id: 0, capteurId: 1, valeur: 0, unite: '%', date: new Date().toISOString() });
        this.isEditing.set(false);
    }

    getCapteurInfo(capteurId: number): string {
        const capteur = this.capteurs().find(c => c.id === capteurId);
        return capteur ? `${capteur.type} (${capteur.emplacement})` : `Capteur #${capteurId}`;
    }
}
