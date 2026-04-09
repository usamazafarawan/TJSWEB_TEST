import { NgModule } from "@angular/core";
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbTabsetModule,
    NbUserModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbInputModule, NbSpinnerModule,
} from '@nebular/theme';
import { NgxEchartsModule } from "ngx-echarts";

import { ThemeModule } from "../../@theme/theme.module";
import { DashboardComponent } from "./dashboard.component";
import { FormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { SalesSectionComponent } from "./sales-section/sales-section.component";
import { CashSectionComponent } from "./cash-section/cash-section.component";
import { ExpensesSectionComponent } from "./expenses-section/expenses-section.component";
import { RepairsSectionComponent } from "./repairs-section/repairs-section.component";
import { GoldPurchasesSectionComponent } from "./gold-puchases-section/gold-purchases-section.component";
import { AdjustmentsSectionComponent } from "./adjustments-section/adjustments-section.component";
import { ProfitLossSectionComponent } from "./profit-loss-section/profit-loss-section.component";

@NgModule({
    imports: [
        FormsModule,
        ThemeModule,
        NbCardModule,
        NbUserModule,
        NbButtonModule,
        NbTabsetModule,
        NbActionsModule,
        NbRadioModule,
        NbSelectModule,
        NbListModule,
        NbIconModule,
        NbButtonModule,
        NgxEchartsModule,
        NbActionsModule,
        NbButtonModule,
        NbCardModule,
        NbCheckboxModule,
        NbDatepickerModule,
        NbIconModule,
        NbInputModule,
        NbRadioModule,
        NbSelectModule,
        NbUserModule,
        Ng2SmartTableModule,
        NbCardModule,
        NbSpinnerModule
    ],
  declarations: [
    DashboardComponent,
    SalesSectionComponent,
    CashSectionComponent,
    ExpensesSectionComponent,
    RepairsSectionComponent,
    GoldPurchasesSectionComponent,
    AdjustmentsSectionComponent,
    ProfitLossSectionComponent
  ],
})
export class DashboardModule {}
