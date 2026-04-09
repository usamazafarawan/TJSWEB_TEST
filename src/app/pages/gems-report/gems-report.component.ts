import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReportService} from '../../services/report.service';
import {LocalDataSource} from 'ng2-smart-table';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'ngx-gems-report',
  templateUrl: './gems-report.component.html',
  styleUrls: ['./gems-report.component.scss'],
})
export class GemsReportComponent implements OnDestroy {

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
  extRefNo: string;
  quantity: string = 'all';
  quantityLessThan: number;
  loadingReports: boolean = null;
  exchangeRates: Object = {};
  stoneNames: string[];
  clarity: string[];
  colors: string[];
  shapes: string[];
  selectedStoneName: string;
  selectedClarity: string;
  selectedColor: string;
  selectedShape: string;
  withCerteficates: boolean;
  isCaratRange: boolean;
  caratRangeFrom: number;
  caratRangeTo: number;
  // total states
  T_Total_Stones_Cost_Price: any = 0;
  T_Total_Carats: any = 0;
  T_Total_Stones: any = 0;
  T_Total_Estimate_Selling: any = 0;


  gemsReportTableSettings = {
    // hideSubHeader: true,
    actions: false,
    pager: {
      perPage: 10, // Set the number of records per page here
    },
    columns: {},
  };

  gemsReportTableSources: LocalDataSource = new LocalDataSource();

  ngOnInit(): void {
    this.loadGemsFilters();
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
    // setTimeout(() => {
    //   this.loadingReports = false;
    // }, 2000);
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
      T_S_REF_NUMBER: this.extRefNo, // Barcode
      Certificate_Flag: this.withCerteficates, // certificate checked
      CT_ID: this.selectedCategory, // Category
      description: this.description,
      allDates: this.allDates,
      fromDate: localFromDate,
      toDate: localToDate,
      // Secondary_Currency_Flag,
      S_ID: this.selectedSupplier,
      Warehouse: this.selectedWarehouse,
      Collection: this.selectedCollection,
      Clarity: this.selectedClarity,
      Color: this.selectedColor,
      Cut: this.selectedShape,
      CB_STONE_NAME: this.selectedStoneName, // Stone Name
      RB_QTY_Greater_Zero: this.quantity === 'greaterThanZero', // Greater than Zero Checkbox (true/false)
      RB_QTY_Less_1: this.quantity === 'lessThanNumber', // Less then Checkbox (true/false)
      T_NUM: this.quantityLessThan, // Less than text field value
      RB_Carat_Between: this.isCaratRange, // Carat Range Checkbox
      T_Range_Min: this.caratRangeFrom, // Min Range Value
      T_Range_Max: this.caratRangeTo, // Max Range Value,
      // imageLocation
    };
    this.reportService.loadGemsReport(data).then((res: any) => {
      console.log(res);
      this.calculateTotals(res.records);
      const columns = res.records[0];
      const settings = {...this.gemsReportTableSettings, columns: {}};
      for (const key in columns) {
        if (columns.hasOwnProperty(key)) {
          const valueType = typeof columns[key];
          settings.columns[key] = {
            title: key,
            type: valueType,
          };
        }
      }
      this.gemsReportTableSettings = settings;
      this.gemsReportTableSources.load(res.records).then(() => {
        this.loadingReports = false;
      });
    }).catch(error => {
      // console.log(error);
      this.loadingReports = false;
    });
  }


  loadGemsFilters() {
    this.reportService.loadGemsFilters().then((res: any) => {
      this.stoneNames = res.stoneNames;
      this.colors = res.colors;
      this.clarity = res.clarity;
      this.shapes = res.shapes;
    });
  }

  clearFilters() {
    this.fromDate = null;
    this.toDate = null;
    this.selectedCategory = '';
    this.selectedSupplier = '';
    this.selectedCollection = '';
    this.selectedWarehouse = '';
    this.description = '';
    this.extRefNo = '';
    this.quantity = '';
    this.quantityLessThan = null;
    this.allDates = true;
    this.selectedStoneName = '';
    this.selectedColor = '';
    this.selectedShape = '';
    this.selectedClarity = '';
    this.withCerteficates = false;
    this.isCaratRange = false;
    this.caratRangeFrom = null;
    this.caratRangeTo = null;
  }

  calculateTotals(recordsArray: any) {
    recordsArray.forEach((item: any, index: any) => {

      let {
        Sell_Stone_Per_Piece,
        Stones_Qty,
        Carat,
        Selling_Price_Carat_After_Discount,
        Selling_Price_Carat,
        Discount_Selling
      } = item;


      if (Carat.toString() !== '') {
        if (Sell_Stone_Per_Piece.toString().trim() !== '1') {
          this.T_Total_Carats = (parseFloat(this.T_Total_Carats) + parseFloat(Carat)).toFixed(2);
        } else {
          this.T_Total_Carats = (parseFloat(this.T_Total_Carats) + parseFloat(Carat) * parseFloat(Stones_Qty)).toFixed(2);
        }
      }

      try {
        if (Stones_Qty.toString() !== '') {
          this.T_Total_Stones = (parseFloat(this.T_Total_Stones) + parseFloat(Stones_Qty)).toFixed(2);
        }
      } catch (error) {
        // Handle any errors that occur within the try block
        console.error(error);
      }

      if (Selling_Price_Carat !== '' && Carat.toString() !== '') {
        if (Sell_Stone_Per_Piece.toString().trim() !== '1') {
          this.T_Total_Stones_Cost_Price = (parseFloat(this.T_Total_Stones_Cost_Price) + parseFloat(Selling_Price_Carat) * parseFloat(Carat)).toFixed(2);
        } else {
          this.T_Total_Stones_Cost_Price = (parseFloat(this.T_Total_Stones_Cost_Price) + parseFloat(Selling_Price_Carat) * parseFloat(Stones_Qty)).toFixed(2);
        }
      }

      if (Selling_Price_Carat_After_Discount.toString() !== '') {
        if (Sell_Stone_Per_Piece.toString().trim() !== '1') {
          this.T_Total_Estimate_Selling = (parseFloat(this.T_Total_Estimate_Selling) + parseFloat(Discount_Selling) * parseFloat(Carat)).toFixed(2);
        } else {
          this.T_Total_Estimate_Selling = (parseFloat(this.T_Total_Estimate_Selling) + parseFloat(Discount_Selling) * parseFloat(Stones_Qty)).toFixed(2);
        }
      }
    });
    this.T_Total_Carats = this.getLocalValues(this.T_Total_Carats);
    this.T_Total_Stones = this.getLocalValues(this.T_Total_Stones);
    this.T_Total_Stones_Cost_Price = this.getLocalValues(this.T_Total_Stones_Cost_Price);
    this.T_Total_Estimate_Selling = this.getLocalValues(this.T_Total_Estimate_Selling);
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
