import {SettingsComponent} from "./settings/settings.component";
import { RouterModule, Routes } from '@angular/router';
import {ProcessViewerComponent} from "./process-viewer/process-viewer.component";
import {ProcessOverviewComponent} from "./process-overview/process-overview.component";
import {ProcessDetailComponent} from "./process-detail/process-detail.component";
export const routerConfig: Routes = [
  {
    path: 'home',
    component: ProcessViewerComponent
  },
  {
    path: 'processInstance',
    component: ProcessViewerComponent
  },
  {
    path: 'processDetail/:id',
    component: ProcessDetailComponent
  },
  {
    path: 'processes',
    component: ProcessOverviewComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

