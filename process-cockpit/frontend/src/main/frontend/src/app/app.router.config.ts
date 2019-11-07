import {SettingsComponent} from './settings/settings.component';
import {Routes} from '@angular/router';
import {ProcessViewerComponent} from './process-viewer/process-viewer.component';
import {ProcessOverviewComponent} from './process-overview/process-overview.component';
import {ProcessDetailComponent} from './process-detail/process-detail.component';
import {ProcessInstanceDetailComponent} from './process-instance-detail/process-instance-detail.component';
import {HomeComponent} from './home/home.component';
import {HistoricComponent} from './historic/historic.component';

export const routerConfig: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'historic',
        component: HistoricComponent
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
        path: 'processInstanceDetail/:id',
        component: ProcessInstanceDetailComponent
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

