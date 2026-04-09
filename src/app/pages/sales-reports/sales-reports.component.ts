import { Component, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'ngx-sales-reports',
  templateUrl: './sales-reports.component.html',
  styleUrls: ['./sales-reports.component.scss'],
})
export class SalesReportsComponent implements OnDestroy {
  constructor(private reportService: ReportService) {
  }

  // filters states
  loadingFilters: boolean;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  description: string;
  barcode: string;
  salesSources: string;
  model: string;
  extRefNo: string;
  invoiceNo: number;
  type: string = 'all';
  reportWithImages: boolean;
  excludeOpenOrders: boolean;
  categories: string[];
  selectedCategory: string;
  suppliers: string[];
  selectedSupplier: string;
  collections: string[];
  selectedCollection: string;
  warehouses: string[];
  selectedWarehouse: string;
  loadReport: string = null;
  // totals states
  T_Total_Gold: any = 0;
  T_TOTAL_SILVER: any = 0;
  T_TOTAL_PLATINUM: any = 0;
  T_Total_Qty: any = 0;
  T_Total_Sales: any = 0;
  T_Total_Costs: any = 0;
  T_Total_Tax: any = 0;
  T_TOTAL_SALES_AFTER_RETURNS: any = 0;
  T_Total_Revenue_Percentage: any = 0;
  T_Total_Revenue: any = 0;

  salesReportTableSettings = {
    // hideSubHeader: true,
    actions: false,
    pager: {
      perPage: 10, // Set the number of records per page here
    },
    columns: {},
  };

  salesReportTableSource: LocalDataSource = new LocalDataSource();

  ngOnInit(): void {
    // this.salesReportTableSource.load([
    //   {
    //     barcode: 'a12bhb2bhhb21',
    //     name: 'john',
    //     inv: '1',
    //     date: Date.now(),
    //     orderNo: 5,
    //     category: 'Ring',
    //     description: 'Ring',
    //     price: '123.15',
    //   },
    // ]);
    this.loadFilter();
  }

  loadFilter() {
    this.loadingFilters = true;
    this.reportService.loadFilters().then((res: any) => {
      console.log(res);
      this.warehouses = res.warehouses;
      this.categories = res.categories;
      this.collections = res.collections;
      this.suppliers = res.suppliers;
      this.loadingFilters = false;
    }).catch(error => {
      console.log(error);
      this.loadingFilters = false;
    });
  }

  loadSales() {
    this.loadReport = 'sales';
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
      Warehouse: this.selectedWarehouse,
      Collection: this.selectedCollection,
      External_Ref_Number: this.extRefNo,
      barcode: this.barcode,
      Inventory_Type: this.type,
      Model: this.model,
      allDates: false,
      fromDate: localFromDate,
      toDate: localToDate,
      CT_ID: this.selectedCategory,
      S_ID: this.selectedSupplier,
      Source: this.salesSources,
      description: this.description,
      withImagesFlag: this.reportWithImages,
      openOrdersFlag: this.excludeOpenOrders,
      T_Invoice_Number: this.invoiceNo,
    };

    this.reportService.loadSales(data).then((res: any) => {
      console.log(res);
      this.calculateTotals(res.records);
      const columns = res.records[0];
      const settings = { ...this.salesReportTableSettings, columns: {} };
      for (const key in columns) {
        if (columns.hasOwnProperty(key)) {
          const valueType = typeof columns[key];
          console.log(valueType, 'type of value');
          console.log(key, 'key of field');
          console.log(columns[key], 'value of field');
          settings.columns[key] = {
            title: key,
            type: valueType,
          };
        }
      }
      this.salesReportTableSettings = settings;
      this.salesReportTableSource.load(res.records).then(() => {
        this.loadReport = null;
      });
    }).catch(error => {
      // console.log(error);
      this.loadReport = null;
    });

  }
  loadSales2() {
    this.loadReport = 'sales2';
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
      Warehouse: this.selectedWarehouse,
      Collection: this.selectedCollection,
      barcode: this.barcode,
      Inventory_Type: this.type,
      Model: this.model,
      fromDate: localFromDate,
      toDate: localToDate,
      CT_ID: this.selectedCategory,
      S_ID: this.selectedSupplier,
      description: this.description,
      withImagesFlag: this.reportWithImages,
      T_Invoice_Number: this.invoiceNo,
    };
    this.reportService.loadSales2(data).then((res: any) => {
      console.log(res);
      const columns = res.records[0];
      const settings = { ...this.salesReportTableSettings, columns: {} };
      for (const key in columns) {
        if (columns.hasOwnProperty(key)) {
          const valueType = typeof columns[key];
          settings.columns[key] = {
            title: key,
            type: valueType,
          };
        }
      }
      this.salesReportTableSettings = settings;
      this.salesReportTableSource.load(res.records).then(() => {
        this.loadReport = null;
      });
    }).catch(error => {
      // console.log(error);
      this.loadReport = null;
    });
  }

  loadSalesPerSource() {
    this.loadReport = 'perSource';
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
      Warehouse: this.selectedWarehouse,
      Inventory_Type: this.type,
      fromDate: localFromDate,
      toDate: localToDate,
    };
    this.reportService.loadSalesPerSource(data).then((res: any) => {
      // console.log(res);
      const columns = res.records[0];
      const settings = { ...this.salesReportTableSettings, columns: {} };
      for (const key in columns) {
        if (columns.hasOwnProperty(key)) {
          const valueType = typeof columns[key];
          settings.columns[key] = {
            title: key,
            type: valueType,
          };
        }
      }
      this.salesReportTableSettings = settings;
      this.salesReportTableSource.load(res.records).then(() => {
        this.loadReport = null;
      });
    }).catch(error => {
      // console.log(error);
      this.loadReport = null;
    });
  }

  loadSalesPerSupplier() {
    this.loadReport = 'perSupplier';
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
      Warehouse: this.selectedWarehouse,
      Inventory_Type: this.type,
      fromDate: localFromDate,
      toDate: localToDate,
    };
    this.reportService.loadSalesPerSupplier(data).then((res: any) => {
      // console.log(res);
      const columns = res.records[0];
      const settings = { ...this.salesReportTableSettings, columns: {} };
      for (const key in columns) {
        if (columns.hasOwnProperty(key)) {
          const valueType = typeof columns[key];
          settings.columns[key] = {
            title: key,
            type: valueType,
          };
        }
      }
      this.salesReportTableSettings = settings;
      this.salesReportTableSource.load(res.records).then(() => {
        this.loadReport = null;
      });
    }).catch(error => {
      // console.log(error);
      this.loadReport = null;
    });
  }

  loadSalesGroupedCategory() {
    this.loadReport = 'perCategory';
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
      Warehouse: this.selectedWarehouse,
      Inventory_Type: this.type,
      fromDate: localFromDate,
      toDate: localToDate,
    };
    this.reportService.loadSalesGroupedCategory(data).then((res: any) => {
      // console.log(res);
      const columns = res.records[0];
      const settings = { ...this.salesReportTableSettings, columns: {} };
      for (const key in columns) {
        if (columns.hasOwnProperty(key)) {
          const valueType = typeof columns[key];
          settings.columns[key] = {
            title: key,
            type: valueType,
          };
        }
      }
      this.salesReportTableSettings = settings;
      this.salesReportTableSource.load(res.records).then(() => {
        this.loadReport = null;
      });
    }).catch(error => {
      // console.log(error);
      this.loadReport = null;
    });
  }

  loadSalesPerClient() {
    this.loadReport = 'perClient';
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
      Warehouse: this.selectedWarehouse,
      Inventory_Type: this.type,
      fromDate: localFromDate,
      toDate: localToDate,
    };
    this.reportService.loadSalesPerClient(data).then((res: any) => {
      // console.log(res);
      const columns = res.records[0];
      const settings = { ...this.salesReportTableSettings, columns: {} };
      for (const key in columns) {
        if (columns.hasOwnProperty(key)) {
          const valueType = typeof columns[key];
          settings.columns[key] = {
            title: key,
            type: valueType,
          };
        }
      }
      this.salesReportTableSettings = settings;
      this.salesReportTableSource.load(res.records).then(() => {
        this.loadReport = null;
      });
    }).catch(error => {
      // console.log(error);
      this.loadReport = null;
    });
  }

  calculateTotals(recordsArray: any) {
    recordsArray.forEach((item: any, index: number) => {

      let {
        Qty,
        Weight_Silver,
        Weight_Platinum,
        Final_Price,
        Total_Price,
        Vat_Amount,
      } = item;

      Weight_Platinum = Weight_Platinum ? Weight_Platinum : 0;

      this.T_Total_Qty = (parseFloat(this.T_Total_Qty) + parseFloat(Qty));
      this.T_Total_Sales = (parseFloat(this.T_Total_Sales) + parseFloat(Final_Price)).toFixed(2);

      if (parseFloat(Qty) > 0) {
        this.T_Total_Gold = (parseFloat(this.T_Total_Gold) +
          (parseFloat(item['Equiv Weight']) * parseFloat(Qty))).toFixed(2);
        this.T_TOTAL_SILVER = (parseFloat(this.T_TOTAL_SILVER) +
          (parseFloat(Weight_Silver) * parseFloat(Qty))).toFixed(2);
        this.T_TOTAL_PLATINUM = (parseFloat(this.T_TOTAL_PLATINUM) +
          (parseFloat(Weight_Platinum) * parseFloat(Qty))).toFixed(2);
      } else {
        this.T_Total_Gold = (parseFloat(this.T_Total_Gold) +
          (parseFloat(item['Equiv Weight']) * parseFloat(Qty) * -1)).toFixed(2);
        this.T_TOTAL_SILVER = (parseFloat(this.T_TOTAL_SILVER) +
          (parseFloat(Weight_Silver) * parseFloat(Qty) * -1)).toFixed(2);
        this.T_TOTAL_PLATINUM = (parseFloat(this.T_TOTAL_PLATINUM) +
          (parseFloat(Weight_Platinum) * parseFloat(Qty) * -1)).toFixed(2);
      }

      this.T_Total_Costs = (parseFloat(this.T_Total_Costs) + parseFloat(Total_Price)).toFixed(2);
      this.T_TOTAL_SALES_AFTER_RETURNS = (parseFloat(this.T_TOTAL_SALES_AFTER_RETURNS) + parseFloat(item['Final Price After Return'])).toFixed(2);
      this.T_Total_Tax = (parseFloat(this.T_Total_Tax) + parseFloat(Vat_Amount)).toFixed(2);
      this.T_Total_Revenue = (parseFloat(this.T_Total_Sales) - parseFloat(this.T_Total_Costs)).toFixed(2);
      this.T_Total_Revenue_Percentage = (parseFloat(this.T_Total_Revenue) /
        parseFloat(this.T_Total_Costs) * 100).toFixed(2);
    });
    this.T_Total_Qty = this.getLocalValues(this.T_Total_Qty);
    this.T_Total_Sales = this.getLocalValues(this.T_Total_Sales);
    this.T_Total_Gold = this.getLocalValues(this.T_Total_Gold);
    this.T_TOTAL_SILVER = this.getLocalValues(this.T_TOTAL_SILVER);
    this.T_TOTAL_PLATINUM = this.getLocalValues(this.T_TOTAL_PLATINUM);
    this.T_Total_Costs = this.getLocalValues(this.T_Total_Costs);
    this.T_TOTAL_SALES_AFTER_RETURNS = this.getLocalValues(this.T_TOTAL_SALES_AFTER_RETURNS);
    this.T_Total_Tax = this.getLocalValues(this.T_Total_Tax);
    this.T_Total_Revenue = this.getLocalValues(this.T_Total_Revenue);
    this.T_Total_Revenue_Percentage = this.getLocalValues(this.T_Total_Revenue_Percentage);
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


