import { Component, OnInit, signal } from '@angular/core';
import { IrrigationService } from '../../services/irrigation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Recommandation } from '../../models/interfaces';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recommendations.html'
})
export class RecommendationsComponent implements OnInit {
  recommendations = signal<Recommandation[]>([]);
  currentRecommendation = signal<Recommandation>({ id: 0, parcelleId: 1, quantiteEau: 20.0, justification: '' });
  isEditing = signal(false);

  constructor(private irrigationService: IrrigationService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.irrigationService.getAllRecommandations().subscribe(data => {
      this.recommendations.set(data);
    });
  }

  saveRecommendation(): void {
    const recData = this.currentRecommendation();
    if (this.isEditing() && recData.id) {
      this.irrigationService.updateRecommandation(recData.id, recData).subscribe(() => {
        this.resetForm();
        this.refresh();
      });
    } else {
      const { id, ...newRec } = recData;
      this.irrigationService.createRecommandation(newRec as Recommandation).subscribe(() => {
        this.resetForm();
        this.refresh();
      });
    }
  }

  editRecommendation(recommendation: Recommandation): void {
    this.currentRecommendation.set({ ...recommendation });
    this.isEditing.set(true);
  }

  deleteRecommendation(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette recommandation ?')) {
      this.irrigationService.deleteRecommandation(id).subscribe(() => {
        this.refresh();
      });
    }
  }

  resetForm(): void {
    this.currentRecommendation.set({ id: 0, parcelleId: 1, quantiteEau: 20.0, justification: '' });
    this.isEditing.set(false);
  }
}
