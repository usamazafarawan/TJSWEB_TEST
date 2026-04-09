import { NgModule } from '@angular/core';
import {
    NbButtonModule, NbCardModule,
    NbCheckboxModule, NbDatepickerModule,
    NbInputModule,
    NbMenuModule,
    NbOptionModule,
    NbRadioModule,
    NbSelectModule, NbSpinnerModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { SalesReportsComponent } from './sales-reports/sales-reports.component';
import {FormsModule} from "@angular/forms";
import { InventoryReportComponent } from './inventory-report/inventory-report.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CheckInventoryComponent } from './check-inventory/check-inventory.component';
import { ExpensesReportComponent } from './expenses-report/expenses-report.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import { ClientViewComponent } from './client-view/client-view.component';
import { GemsReportComponent } from './gems-report/gems-report.component';
import { CustomModalComponent } from './custom-modal/custom-modal.component';

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        DashboardModule,
        ECommerceModule,
        MiscellaneousModule,
        NbInputModule,
        NbOptionModule,
        NbSelectModule,
        NbCheckboxModule,
        NbRadioModule,
        NbDatepickerModule,
        FormsModule,
        NbButtonModule,
        Ng2SmartTableModule,
        NbCardModule,
        NbSpinnerModule,
    ],
  declarations: [
    PagesComponent,
    SalesReportsComponent,
    InventoryReportComponent,
    CatalogComponent,
    CheckInventoryComponent,
    ExpensesReportComponent,
    ClientViewComponent,
    GemsReportComponent,
    CustomModalComponent,
  ],
})
export class PagesModule {
}
