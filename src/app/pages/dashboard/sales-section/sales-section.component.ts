import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'sales-section',
  styleUrls: ['./sales-section.component.scss'],
  templateUrl: './sales-section.component.html',
})
export class SalesSectionComponent implements OnChanges {
  @Input() salesScreen: any;
  @Input() netRevenue: any = 0;
  T_Revenue_Percentage: any = 0;
  T_Revenues: any = 0;
  tAverageOunce: any = 0;
  totalCost: any = 0;
  totalGold18K: any = 0;
  totalGold995Turnover: any = 0;
  totalGrossSales: any = 0;
  totalReturns: any = 0;
  totalSalesAfterReturn: any = 0;
  totalSalesDiscount: any = 0;
  // netRevenueLocal: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    // this.calculateTotals();
    console.log(this.salesScreen);
    console.log(this.salesScreen?.result?.totalGrossSales.toFixed(1).toLocaleString());
    if (this.salesScreen?.result) {
      this.T_Revenue_Percentage = parseFloat(this.salesScreen.result.T_Revenue_Percentage?.toFixed(2)).toLocaleString() || 0;
      this.T_Revenues = parseFloat(this.salesScreen.result.T_Revenues?.toFixed(2)).toLocaleString() || 0;
      this.tAverageOunce = parseFloat(this.salesScreen.result.tAverageOunce?.toFixed(2)).toLocaleString() || 0;
      this.totalCost = parseFloat(this.salesScreen.result.totalCost?.toFixed(2)).toLocaleString() || 0;
      this.totalGold18K = parseFloat(this.salesScreen.result.totalGold18K?.toFixed(2)).toLocaleString() || 0;
      this.totalGold995Turnover = parseFloat(this.salesScreen.result.totalGold995Turnover?.toFixed(2)).toLocaleString() || 0;
      this.totalGrossSales = parseFloat(this.salesScreen.result.totalGrossSales?.toFixed(2)).toLocaleString() || 0;
      this.totalReturns = parseFloat(this.salesScreen.result.totalReturns?.toFixed(2)).toLocaleString() || 0;
      this.totalSalesAfterReturn = parseFloat(this.salesScreen.result.totalSalesAfterReturn?.toFixed(2)).toLocaleString() || 0;
      this.totalSalesDiscount = parseFloat(this.salesScreen.result.totalSalesDiscount?.toFixed(2)).toLocaleString() || 0;
    }
  }
}
