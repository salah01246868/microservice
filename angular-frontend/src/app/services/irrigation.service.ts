import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Capteur, Observation, Modele, Recommandation } from '../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class IrrigationService {
    private apiUrl = 'http://localhost:8887/api'; // Gateway URL

    constructor(private http: HttpClient) { }

    // Collecte Service
    getCapteurs(): Observable<Capteur[]> {
        return this.http.get<Capteur[]>(`${this.apiUrl}/collecte/capteurs`);
    }

    createCapteur(capteur: Capteur): Observable<Capteur> {
        return this.http.post<Capteur>(`${this.apiUrl}/collecte/capteurs`, capteur);
    }

    updateCapteur(id: number, capteur: Capteur): Observable<Capteur> {
        return this.http.put<Capteur>(`${this.apiUrl}/collecte/capteurs/${id}`, capteur);
    }

    deleteCapteur(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/collecte/capteurs/${id}`);
    }


    addObservation(observation: Observation): Observable<Observation> {
        return this.http.post<Observation>(`${this.apiUrl}/collecte/observations`, observation);
    }

    // Analyse Service
    getModeles(): Observable<Modele[]> {
        return this.http.get<Modele[]>(`${this.apiUrl}/analyse/modeles`);
    }

    getRecommandations(parcelleId: number): Observable<Recommandation[]> {
        return this.http.get<Recommandation[]>(`${this.apiUrl}/analyse/recommandations/${parcelleId}`);
    }

    // Capteur - Additional methods
    getCapteurById(id: number): Observable<Capteur> {
        return this.http.get<Capteur>(`${this.apiUrl}/collecte/capteurs/${id}`);
    }

    // Observation - Complete CRUD
    getObservations(): Observable<Observation[]> {
        return this.http.get<Observation[]>(`${this.apiUrl}/collecte/observations`);
    }

    getObservationById(id: number): Observable<Observation> {
        return this.http.get<Observation>(`${this.apiUrl}/collecte/observations/detail/${id}`);
    }

    getObservationsByCapteurId(capteurId: number): Observable<Observation[]> {
        return this.http.get<Observation[]>(`${this.apiUrl}/collecte/observations/${capteurId}`);
    }

    updateObservation(id: number, observation: Observation): Observable<Observation> {
        return this.http.put<Observation>(`${this.apiUrl}/collecte/observations/${id}`, observation);
    }

    deleteObservation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/collecte/observations/${id}`);
    }

    // Modele - Complete CRUD
    getModeleById(id: number): Observable<Modele> {
        return this.http.get<Modele>(`${this.apiUrl}/analyse/modeles/${id}`);
    }

    createModele(modele: Modele): Observable<Modele> {
        return this.http.post<Modele>(`${this.apiUrl}/analyse/modeles`, modele);
    }

    updateModele(id: number, modele: Modele): Observable<Modele> {
        return this.http.put<Modele>(`${this.apiUrl}/analyse/modeles/${id}`, modele);
    }

    deleteModele(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/analyse/modeles/${id}`);
    }

    // Recommandation - Complete CRUD
    getAllRecommandations(): Observable<Recommandation[]> {
        return this.http.get<Recommandation[]>(`${this.apiUrl}/analyse/recommandations`);
    }

    getRecommandationById(id: number): Observable<Recommandation> {
        return this.http.get<Recommandation>(`${this.apiUrl}/analyse/recommandations/detail/${id}`);
    }

    createRecommandation(recommandation: Recommandation): Observable<Recommandation> {
        return this.http.post<Recommandation>(`${this.apiUrl}/analyse/recommandations`, recommandation);
    }

    updateRecommandation(id: number, recommandation: Recommandation): Observable<Recommandation> {
        return this.http.put<Recommandation>(`${this.apiUrl}/analyse/recommandations/${id}`, recommandation);
    }

    deleteRecommandation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/analyse/recommandations/${id}`);
    }
}
