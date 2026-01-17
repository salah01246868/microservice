import { Component, OnInit } from '@angular/core';
import { IrrigationService } from '../../services/irrigation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modele } from '../../models/interfaces';

@Component({
    selector: 'app-models',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './models.html'
})
export class ModelsComponent implements OnInit {
    models: Modele[] = [];
    currentModel: Modele = { id: 0, type: 'REGRESSION', version: '1.0', dateApprentissage: new Date().toISOString().split('T')[0], precision: 0.85 };
    isEditing = false;

    constructor(private irrigationService: IrrigationService) { }

    ngOnInit(): void {
        this.refresh();
    }

    refresh(): void {
        this.irrigationService.getModeles().subscribe(data => {
            this.models = data;
        });
    }

    saveModel(): void {
        if (this.isEditing && this.currentModel.id) {
            this.irrigationService.updateModele(this.currentModel.id, this.currentModel).subscribe(() => {
                this.resetForm();
                this.refresh();
            });
        } else {
            const { id, ...newModel } = this.currentModel;
            this.irrigationService.createModele(newModel as Modele).subscribe(() => {
                this.resetForm();
                this.refresh();
            });
        }
    }

    editModel(model: Modele): void {
        this.currentModel = { ...model };
        this.isEditing = true;
    }

    deleteModel(id: number): void {
        if (confirm('Voulez-vous vraiment supprimer ce modèle ?')) {
            this.irrigationService.deleteModele(id).subscribe(() => {
                this.refresh();
            });
        }
    }

    resetForm(): void {
        this.currentModel = { id: 0, type: 'REGRESSION', version: '1.0', dateApprentissage: new Date().toISOString().split('T')[0], precision: 0.85 };
        this.isEditing = false;
    }
}
