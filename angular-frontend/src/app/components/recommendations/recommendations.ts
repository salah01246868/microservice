import { Component, OnInit } from '@angular/core';
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
  recommendations: Recommandation[] = [];
  currentRecommendation: Recommandation = { id: 0, parcelleId: 1, quantiteEau: 20.0, justification: '' };
  isEditing = false;

  constructor(private irrigationService: IrrigationService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.irrigationService.getAllRecommandations().subscribe(data => {
      this.recommendations = data;
    });
  }

  saveRecommendation(): void {
    if (this.isEditing && this.currentRecommendation.id) {
      this.irrigationService.updateRecommandation(this.currentRecommendation.id, this.currentRecommendation).subscribe(() => {
        this.resetForm();
        this.refresh();
      });
    } else {
      const { id, ...newRec } = this.currentRecommendation;
      this.irrigationService.createRecommandation(newRec as Recommandation).subscribe(() => {
        this.resetForm();
        this.refresh();
      });
    }
  }

  editRecommendation(recommendation: Recommandation): void {
    this.currentRecommendation = { ...recommendation };
    this.isEditing = true;
  }

  deleteRecommendation(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette recommandation ?')) {
      this.irrigationService.deleteRecommandation(id).subscribe(() => {
        this.refresh();
      });
    }
  }

  resetForm(): void {
    this.currentRecommendation = { id: 0, parcelleId: 1, quantiteEau: 20.0, justification: '' };
    this.isEditing = false;
  }
}
