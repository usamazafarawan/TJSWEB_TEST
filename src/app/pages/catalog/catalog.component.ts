import {Component, OnDestroy} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ReportService} from '../../services/report.service';

@Component({
  selector: 'ngx-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnDestroy {

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
  systemConfiguration: string;
  exchangeRates: any;
  quantity: string = 'greaterThanZero';
  quantityLessThan: number;
  type: string = 'all';
  currency: string = 'all';
  isLabourSelling: boolean = true;
  priceGreaterThan: number;
  priceLessThan: number;
  selectedPriceRadio: string;
  loadingReports: boolean = null;

  catalogReportTableSettings = {
    // hideSubHeader: true,
    actions: false,
    pager: {
      perPage: 10, // Set the number of records per page here
    },
    columns: {},
  };

  catalogReportTableSources: LocalDataSource = new LocalDataSource();

  ngOnInit(): void {
    this.loadFilters();
  }

  loadReports() {
    this.loadingReports = true;
    const data = {
      warehouse : this.selectedWarehouse,
      Collection : this.selectedCollection,
      Barcode : this.barcode,
      Inventory_Type : this.type,
      allDates : this.allDates,
      fromDate : this.fromDate,
      toDate : this.toDate,
      CT_ID : this.selectedCategory,
      S_ID : this.selectedSupplier,
      quantity : this.quantity,
      quantityLessThan :  this.quantityLessThan,
      T_PRICE_MAX : this.priceLessThan,
      T_PRICE_MIN : this.priceGreaterThan,
      CB_Labor_Selling : this.isLabourSelling,
      Description : this.description,
      currency : this.currency,
      systemConfiguration : this.systemConfiguration,
      exchangeRates : this.exchangeRates,
    };
    this.reportService.loadCatalogReport(data).then((res: any) => {
      console.log(res);
      const columns = res.records[0];
      const settings = {...this.catalogReportTableSettings, columns: {}};
      for (const key in columns) {
        if (columns.hasOwnProperty(key)) {
          const valueType = typeof columns[key];
          if (key === 'Image_DB')
          {
            settings.columns[key] = {
              title: key,
              type: 'html',
              valuePrepareFunction: (imageData) => {
                return `<img src="data:image/jpeg;base64,${imageData}" width="100" height="100" />`;
              }
            };
          }
          else
          {
            settings.columns[key] = {
              title: key,
              type: valueType,
            };
          }
        }
      }
      this.catalogReportTableSettings = settings;
      this.catalogReportTableSources.load(res.records).then(() => {
        this.loadingReports = false;
      });
    }).catch(error => {
      console.log(error);
      this.loadingReports = false;
    });
  }

  loadFilters() {
    this.reportService.loadFilters().then((res: any) => {
      this.categories = res.categories;
      this.suppliers = res.suppliers;
      this.collections = res.collections;
      this.warehouses = res.warehouses;
      this.exchangeRates = res.exchangeRates;
      this.reportService.setExchangeRate(this.exchangeRates);
      console.log(res);
      this.reportService.getSystemConfiguration().then((response: any) => {
        console.log(response);
        this.systemConfiguration = response.Currency_Control?.replace(/\s/g, '');
        this.filtersLoaded = true;
      });
    })
      .catch(error => {
        // console.log(error);
        this.filtersLoaded = true;
      });
  }

  ngOnDestroy() {
  }
}




