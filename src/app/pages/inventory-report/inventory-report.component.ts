import {Component, OnDestroy} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ReportService} from '../../services/report.service';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'ngx-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.scss'],
})
export class InventoryReportComponent implements OnDestroy {

  constructor(private reportService: ReportService) {

  }

  fromDate = new Date();
  toDate = new Date();
  categories: string[];
  selectedCategory: string;
  suppliers: string[];
  selectedSupplier: string;
  collections: string[];
  selectedCollection: string;
  warehouses: string[];
  selectedWarehouse: string;
  filtersLoaded: boolean = false;
  allDates: boolean = true;
  description: string;
  barcode: string;
  model: string;
  extRefNo: string;
  quantity: string = 'greaterThanZero';
  quantityLessThan: number;
  type: string = 'all';
  currency: string = 'all';
  loadingReports: boolean = null;
  loadingCategories: boolean = null;
  excludeOthers: boolean = false;
  exchangeRates: Object = {};
  tableType: string = null;
  // totals field
  T_Equivalent_Platinum: any = 0;
  T_Equivalent_18: any = 0;
  T_Equivalent_Silver: any = 0;
  T_Total_Labor_Cost_Price: any = 0;
  T_Total_Stones_Cost_Price: any = 0;
  T_Total_Cost: any = 0;
  T_Total_Selling_Price: any = 0;
  T_Total_Qty: any = 0;
  T_Total_Carats: any = 0;
  T_Equivalent_995: any = 0;


  inventoryReportTableSettings = {
    // hideSubHeader: true,
    actions: false,
    pager: {
      perPage: 10, // Set the number of records per page here
    },
    columns: {},
    filters: {},
  };

  inventoryReportTableSources: LocalDataSource = new LocalDataSource();

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters() {
    this.reportService.loadFilters().then((res: any) => {
      this.categories = res.categories;
      this.suppliers = res.suppliers;
      this.collections = res.collections;
      this.warehouses = res.warehouses;
      this.filtersLoaded = true;
      this.exchangeRates = res.exchangeRates;
      this.reportService.setExchangeRate(this.exchangeRates);
      console.log(res);
    })
      .catch(error => {
        // console.log(error);
        this.filtersLoaded = true;
      });
  }

  loadReports() {
    this.loadingReports = true;
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
    this.reportService.getSystemConfiguration().then((systemConfiguration: any) => {
      const data = {
        warehouse: this.selectedWarehouse,
        Collection: this.selectedCollection,
        External_Ref_Number: this.extRefNo,
        Barcode: this.barcode,
        Inventory_Type: this.type,
        exludeOthers: this.excludeOthers,
        Model: this.model,
        allDates: this.allDates,
        fromDate: localFromDate,
        toDate: localToDate,
        CT_ID: this.selectedCategory,
        S_ID: this.selectedSupplier,
        quantity: this.quantity,
        quantityLessThan: this.quantityLessThan,
        Description: this.description,
        currency: this.currency,
        // systemConfiguration
        systemConfiguration: systemConfiguration.Currency_Control.replace(/\s/g, ''),
        exchangeRates: this.exchangeRates,
      };
      this.reportService.loadIventoryReport(data).then((res: any) => {
        console.log(res);
        this.calculateTotals(res.records);
        const columns = res.records[0];
        const settings = {...this.inventoryReportTableSettings, columns: {}};
        for (const key in columns) {
          if (columns.hasOwnProperty(key)) {
            const valueType = typeof columns[key];
            settings.columns[key] = {
              title: key,
              type: valueType,
            };
          }
        }
        this.inventoryReportTableSettings = settings;
        this.tableType = 'reports';
        this.inventoryReportTableSources.load(res.records).then(() => {
          this.loadingReports = false;
        });
      }).
      catch(error => {
        console.log(error);
        this.loadingReports = false;
      });
    });
  }

  loadReportPerCategory() {
    this.loadingCategories = true;
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
    this.reportService.getSystemConfiguration().then((systemConfiguration: any) => {
    const data = {
      warehouse: this.selectedWarehouse,
      Collection: this.selectedCollection,
      External_Ref_Number: this.extRefNo,
      Barcode: this.barcode,
      Inventory_Type: this.type,
      exludeOthers: this.excludeOthers,
      Model: this.model,
      allDates: this.allDates,
      fromDate: localFromDate,
      toDate: localToDate,
      CT_ID: this.selectedCategory,
      S_ID: this.selectedSupplier,
      quantity: this.quantity,
      quantityLessThan: this.quantityLessThan,
      Description: this.description,
      currency: this.currency,
      // systemConfiguration
      systemConfiguration: systemConfiguration.Currency_Control.replace(/\s/g, ''),
      exchangeRates: this.exchangeRates,
    };
    this.reportService.loadIventoryReportPerCategory(data).then((res: any) => {
      const columns = res.records[0];
      const settings = {...this.inventoryReportTableSettings, columns: {}};
      for (const key in columns) {
        if (columns.hasOwnProperty(key)) {
          const valueType = typeof columns[key];
          settings.columns[key] = {
            title: key,
            type: valueType,
          };
        }
      }
      this.inventoryReportTableSettings = settings;
      this.tableType = 'category';
      this.inventoryReportTableSources.load(res.records).then(() => {
        this.loadingCategories = false;
      });
      console.log(settings);
    }).
    catch(error => {
      console.log(error);
    });
    });
  }

  clearFilters() {
    this.selectedSupplier = '';
    this.fromDate = null;
    this.toDate = null;
    this.selectedCategory = '';
    this.selectedSupplier = '';
    this.selectedCollection = '';
    this.selectedWarehouse = '';
    this.description = '';
    this.barcode = '';
    this.model = '';
    this.extRefNo = '';
    this.type = '';
    this.currency = '';
    this.quantity = '';
    this.quantityLessThan = null;
    this.excludeOthers = false;
    this.allDates = true;
  }

  calculateTotals(recordsArray: any) {
    if (recordsArray.length < 1) {
      return;
    }
    recordsArray.forEach((element: any, index: number) => {
      const {
        Equivalent_Platinum,
        Equivalent_18K,
        Equivalent_Silver,
        Total_Labor,
        Total_DiamondsOrStones,
        Total_Cost,
        Total_Selling,
        Qty,
        Carat_Part1,
        Carat_Part2,
        Carat_Part3,
      } = element;


      console.log(Equivalent_Platinum, 'Equivalent_Platinum');
      if (Equivalent_Platinum.toString() !== '') {
        this.T_Equivalent_Platinum = (parseFloat(this.T_Equivalent_Platinum) + parseFloat(Equivalent_Platinum));
        this.T_Equivalent_Platinum = parseFloat(this.T_Equivalent_Platinum).toFixed(2);
        console.log(this.T_Equivalent_Platinum);
      }

      if (Equivalent_18K.toString() !== '') {
        this.T_Equivalent_18 = (parseFloat(this.T_Equivalent_18) + parseFloat(Equivalent_18K));
        this.T_Equivalent_18 = parseFloat(this.T_Equivalent_18).toFixed(2);
      }

      if (Equivalent_Silver.toString() !== '') {
        this.T_Equivalent_Silver = (parseFloat(this.T_Equivalent_Silver) + parseFloat(Equivalent_Silver));
        this.T_Equivalent_Silver = parseFloat(this.T_Equivalent_Silver).toFixed(2);
      }

      if (Total_Labor.toString() !== '') {
        this.T_Total_Labor_Cost_Price = (parseFloat(this.T_Total_Labor_Cost_Price) + parseFloat(Total_Labor));
        this.T_Total_Labor_Cost_Price = parseFloat(this.T_Total_Labor_Cost_Price).toFixed(2);
      }

      if (Total_DiamondsOrStones.toString() !== '') {
        this.T_Total_Stones_Cost_Price = (parseFloat(this.T_Total_Stones_Cost_Price) + parseFloat(Total_DiamondsOrStones)).toFixed(2);
      }

      if (Total_Cost.toString() !== '') {
        this.T_Total_Cost = (parseFloat(this.T_Total_Cost) + parseFloat(Total_Cost));
        this.T_Total_Cost = parseFloat(this.T_Total_Cost).toFixed(2);
      }

      if (Total_Selling.toString() !== '') {
        this.T_Total_Selling_Price = (parseFloat(this.T_Total_Selling_Price) + parseFloat(Total_Selling));
        this.T_Total_Selling_Price = parseFloat(this.T_Total_Selling_Price).toFixed(2);
      }

      if (Qty.toString() !== '') {
        this.T_Total_Qty = (parseFloat(this.T_Total_Qty) + parseFloat(Qty));
      }

      if (Carat_Part1 && Carat_Part1.toString() !== '') {
        this.T_Total_Carats = ((parseFloat(this.T_Total_Carats) + parseFloat(Carat_Part1)) * parseFloat(Qty)).toFixed(2);
      }

      if (Carat_Part2.toString() !== '') {
        this.T_Total_Carats = ((parseFloat(this.T_Total_Carats) + parseFloat(Carat_Part2)) * parseFloat(Qty)).toFixed(2);
      }

      if (Carat_Part3.toString() !== '') {
        this.T_Total_Carats = (parseFloat(this.T_Total_Carats) + parseFloat(Carat_Part3)) * parseFloat(Qty);
      }
      this.T_Total_Carats = parseFloat(this.T_Total_Carats).toFixed(2);

      this.T_Equivalent_995 = (parseFloat(Equivalent_18K) * 750 / 995).toFixed(2);
    });
    this.T_Equivalent_Platinum = this.getLocalValues(this.T_Equivalent_Platinum);
    this.T_Equivalent_18 = this.getLocalValues(this.T_Equivalent_18);
    this.T_Equivalent_Silver = this.getLocalValues(this.T_Equivalent_Silver);
    this.T_Total_Labor_Cost_Price = this.getLocalValues(this.T_Total_Labor_Cost_Price);
    this.T_Total_Stones_Cost_Price = this.getLocalValues(this.T_Total_Stones_Cost_Price);
    this.T_Total_Cost = this.getLocalValues(this.T_Total_Cost);
    this.T_Total_Selling_Price = this.getLocalValues(this.T_Total_Selling_Price);
    this.T_Total_Qty = this.getLocalValues(this.T_Total_Qty);
    this.T_Total_Carats = this.getLocalValues(this.T_Total_Carats);
    this.T_Equivalent_995 = this.getLocalValues(this.T_Equivalent_995);
  }
  private getLocalValues(value: any) {
    if (value === 0 || !value) {
      return 0;
    } else {
      return parseFloat(parseFloat(value).toFixed(2)).toLocaleString();
    }
  }
  ngOnDestroy() {
  }
}
