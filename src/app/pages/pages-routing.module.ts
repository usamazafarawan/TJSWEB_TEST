import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { LoginComponent } from '../auth/login/login.component';
import {SalesReportsComponent} from './sales-reports/sales-reports.component';
import {InventoryReportComponent} from './inventory-report/inventory-report.component';
import {CatalogComponent} from './catalog/catalog.component';
import {ExpensesReportComponent} from './expenses-report/expenses-report.component';
import {CheckInventoryComponent} from './check-inventory/check-inventory.component';
import {ClientViewComponent} from './client-view/client-view.component';
import {GemsReportComponent} from './gems-report/gems-report.component';
import { AdminGuard } from '../auth/admin.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'sales-reports',
      component: SalesReportsComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'inventory-reports',
      component: InventoryReportComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'expenses',
      component: ExpensesReportComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'gems-reports',
      component: GemsReportComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'check-inventory',
      component: CheckInventoryComponent,
    },
    {
      path: 'client-view',
      component: ClientViewComponent,
    },
    {
      path: 'catalog',
      component: CatalogComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: LoginComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
