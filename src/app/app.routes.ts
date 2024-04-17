import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PointCreationComponent } from './pages/point-creation/point-creation.component';

export const routes: Routes = [
    {
        path: '',
        component: MainPageComponent,
        // loadChildren: () => import('./pages/main-page/main-page.module').then((m) => m.MainPageModule)
    },
    {
        path: 'point-creation',
        component: PointCreationComponent,
        // loadChildren: () => import('./pages/main-page/main-page.module').then((m) => m.MainPageModule)
    },
];