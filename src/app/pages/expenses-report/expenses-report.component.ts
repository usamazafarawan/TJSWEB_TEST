import {Component, OnDestroy} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ReportService} from '../../services/report.service';

@Component({
  selector: 'ngx-expenses-report',
  templateUrl: './expenses-report.component.html',
  styleUrls: ['./expenses-report.component.scss'],
})
export class ExpensesReportComponent implements OnDestroy {

  constructor(private reportService: ReportService) {
  }

  fromDate: Date = new Date();
  toDate: Date = new Date();
  categories: string[];
  expenseTypes: string[];
  warehouses: string[];
  isLoading: boolean = false;
  selectedWareHouse: string;
  selectedType: string;
  selectedCategory: string;
  loadData: boolean = false;
  total: any = 0;

  expensesReportTableSettings = {
    // hideSubHeader: true,
    actions: false,
    columns: {},
    pager: {
      perPage: 10, // Set the number of records per page here
    },
  };

  expensesReportTableSources: LocalDataSource = new LocalDataSource();

  ngOnInit(): void {
    this.reportService.loadExpenseData().then((res: any) => {
      this.warehouses = res.warehouses;
      this.categories = res.categories.filter(_item => _item !== '');
      this.expenseTypes = res.expenses;
      this.loadData = true;
    });
  }

  loadExpensesReport() {
    this.isLoading = true;
    // Ensure fromDate and toDate are in local time
    this.fromDate = new Date(this.fromDate);
    this.fromDate.setHours(0, 0, 0, 0);

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
      warehouse: this.selectedWareHouse,
      category: this.selectedCategory,
      expense_type: this.selectedType,
    };
    this.reportService.loadExpenseReport(data).then((res: any) => {
      console.log(res);
      const columns = res['resultsArray'][0];
      res['resultsArray'].forEach((obj: any) => {
        this.total += obj.Total;
      });
      this.total = this.getLocalValues(this.total);
      const settings = {...this.expensesReportTableSettings, columns: {}};
      for (const key in columns) {
        if (columns.hasOwnProperty(key)) {
          const valueType = typeof columns[key];
          settings.columns[key] = {
            title: key,
            type: valueType,
          };
        }
      }
      this.expensesReportTableSettings = settings;
      this.expensesReportTableSources.load(res['resultsArray']).then(() => {
        this.isLoading = false;
      });
    }).catch(error => {
      console.log(error);
      this.isLoading = false;
    });
  }

  clearFilters() {
    this.selectedType = null;
    this.selectedWareHouse = null;
    this.selectedCategory = null;
    this.fromDate = null;
    this.toDate = null;
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

