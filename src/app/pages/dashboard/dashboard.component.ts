import { Component, OnDestroy } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { ReportService } from "../../services/report.service";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnDestroy {
  warehouses: string[];
  selectedWarehouse: string;
  fromDate = new Date();
  toDate = new Date();
  exchangeRates: any;
  systemConfiguration: any;
  isLoading: boolean = true;
  loadingReports: boolean = false;
  Secondary_Currency_Feature: any;
  Secondary_Currency_Label: any;
  // screens data
  expenseScreen: any;
  goldPurchaseScreen: any;
  adjustmentScreen: any;
  repairScreen: any;
  cashScreen: any;
  salesScreen: any;
  netRevenue: any = 0;
  visa: any;
  profitLoss: any;
  revenueFromGoldPurchases: any = 0;
  revenueFromRepairs: any = 0;
  totalExpenses: any = 0;
  reportsLoaded: boolean = false;

  constructor(private reportService: ReportService, private toastrService: NbToastrService) { }

  async ngOnInit() {
    await this.loadingAllReports();
    // console.log('Set time out');
    // if (localStorage.getItem('token')) {
    //   console.log('got token');
    //   await this.loadConfigs();
    //   this.isLoading = false;
    // } else {
    //   setTimeout(() => {
    //     console.log('waiting');
    //     this.loadConfigs();
    //     this.isLoading = false;
    //   }, 5000);
    // }
  }

  async loadingAllReports() {
    console.log("Loading all reports");
    const _token = localStorage.getItem("token");
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      try {
        await this.loadConfigs();
        await this.loadReports();
        this.isLoading = false;
        return;
      } catch (error) {
        this.toastrService.show(
          'Error',
          `Failed to load configuration and reports.`);
        this.isLoading = false; // Set loading to false even if an error occurs
      }

    } else {
      setTimeout(() => {
        console.log("repeat");
        this.loadingAllReports();
      }, 1000);
    }
  }

  async loadConfigs() {
    console.log("Going to get report " + localStorage.getItem("token"));
    const [er, config, filters] = await Promise.all([
      this.reportService.getExchangeRate(),
      this.reportService.getSystemConfiguration(),
      this.reportService.loadFilters(),
    ]);
    // @ts-ignore
    this.exchangeRates = er.exchangeRates;
    this.systemConfiguration = config;
    // @ts-ignore
    this.Secondary_Currency_Feature = config.Secondary_Currency_Feature.replace(
      /\s/g,
      ""
    );
    // @ts-ignore
    this.Secondary_Currency_Label = config.Secondary_Currency_Label.replace(
      /\s/g,
      ""
    );
    console.log(config, "System config");
    // @ts-ignore
    this.warehouses = filters.warehouses;

  }

  async loadReports() {
    this.loadingReports = true;
    this.isLoading = true;

    // Ensure fromDate and toDate are in local time
    this.fromDate = new Date(this.fromDate);
    this.fromDate.setHours(0, 0, 1, 0);

    // Convert back to local time if needed
    const localFromDate = new Date(
      this.fromDate.getTime() - this.fromDate.getTimezoneOffset() * 60000
    );

    // Same for toDate
    this.toDate = new Date(this.toDate);
    this.toDate.setHours(23, 59, 59, 0);

    const localToDate = new Date(
      this.toDate.getTime() - this.toDate.getTimezoneOffset() * 60000
    );

    const data = {
      fromDate: localFromDate,
      toDate: localToDate,
      warehouse: this.selectedWarehouse,
      systemConfiguration: this.systemConfiguration,
      exchangeRates: this.exchangeRates,
    };
    try {
      const [
        expenses,
        goldPurchases,
        adjustments,
        repairs,
        cash,
        sales,
        visa,
        pl,
      ] = await Promise.all([
        // const [expenses, adjustments] = await Promise.all([
        this.reportService.getDashboardExpenses(data),
        this.reportService.getDashboardGoldPurchases(data),
        this.reportService.getDashboardAdjustments(data),
        this.reportService.getDashboardRepairs(data),
        this.reportService.getDashboardCash(data),
        this.reportService.getDashboardSales(data),
        this.reportService.getDashboardVisa(data),
        this.reportService.getDashboardPL(data),
      ]);
      this.expenseScreen = expenses;
      this.goldPurchaseScreen = goldPurchases;
      this.adjustmentScreen = adjustments;
      this.repairScreen = repairs;
      this.cashScreen = cash;
      this.salesScreen = sales;
      this.visa = visa;
      // @ts-ignore
      this.profitLoss = pl.result;
      this.calculateNetRevenue(goldPurchases);
      this.fillProfitLossData();
      this.loadingReports = false;
      this.isLoading = false;
    } catch (e) {
      console.log(e);
      this.loadingReports = false;
      this.isLoading = false;
    }
  }

  calculateNetRevenue(goldPurchases: any) {
    let goldRevenue = 0;
    const T_Revenue = this.salesScreen.result.T_Revenues;
    let Revenue_PO = 0;
    const polish = 0;
    const revenueSettings = 0;
    const totalExpense = this.expenseScreen?.otherExpensesData?.T_Expense_USD;
    this.totalExpenses = this.expenseScreen?.otherExpensesData?.T_Expense_USD;
    if (this.repairScreen.result.length > 0) {
      this.repairScreen.result.forEach((_repairItem: any) => {
        Revenue_PO += _repairItem.Revenue;
      });
      this.revenueFromRepairs = Revenue_PO;
    }
    if (goldPurchases.results.length > 0) {
      goldPurchases.results.forEach((_goldItem: any) => {
        goldRevenue += _goldItem.Revenue;
      });
      this.revenueFromGoldPurchases = goldRevenue;
    }
    this.netRevenue = (
      T_Revenue +
      goldRevenue +
      polish +
      revenueSettings +
      Revenue_PO -
      this.visa.result.Total -
      totalExpense
    ).toFixed(2);
  }

  fillProfitLossData() {
    if (this.salesScreen.hasOwnProperty("result")) {
      const {
        T_Revenue_Percentage,
        T_Revenues,
        tAverageOunce,
        totalCost,
        totalGold18K,
        totalGold995Turnover,
        totalGrossSales,
        totalReturns,
        totalSalesAfterReturn,
        totalSalesDiscount,
      } = this.salesScreen.result;
      this.profitLoss = {
        ...this.profitLoss,
        GrossSale: totalGrossSales,
        Returns: totalReturns,
        SalesAfterReturns: totalSalesAfterReturn,
        Cost: totalCost,
        Revenue: T_Revenues,
        Net_Revenue: this.netRevenue,
        RevenueFromGoldPurchases: this.revenueFromGoldPurchases,
        RevenueFromRepairs: this.revenueFromRepairs,
        VisaCharges: this.visa.result.Total,
        TotalExpenses: this.totalExpenses,
        EQUIVALENT_GOLD_SOLD__995: totalGold995Turnover,
      };
    }
  }

  ngOnDestroy() { }
}
