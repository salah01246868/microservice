import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { SensorsComponent } from './components/sensors/sensors';
import { RecommendationsComponent } from './components/recommendations/recommendations';
import { ObservationsComponent } from './components/observations/observations';
import { ModelsComponent } from './components/models/models';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'sensors', component: SensorsComponent },
    { path: 'observations', component: ObservationsComponent },
    { path: 'models', component: ModelsComponent },
    { path: 'recommendations', component: RecommendationsComponent }
];
