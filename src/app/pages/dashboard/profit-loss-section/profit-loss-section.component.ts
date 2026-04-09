import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'profit-loss-section',
  styleUrls: ['./profit-loss-section.component.scss'],
  templateUrl: './profit-loss-section.component.html',
})
export class ProfitLossSectionComponent implements OnChanges {
  @Input() profitLoss: any;
  section5value1: any = 0;
  section5value2: any = 0;
  section5value3: any = 0;
  section5value4: any = 0;


  profitAndLossFirstSection: string[] = [
    'GROSS SALES : 0.00',
    'TOTAL RETURNS : 0.00',
    'SALES AFTER RETURNS : 0.00',
    'TOTAL COST : 0.00',
    'SALES REVENUES : 0.00',
  ];

  profitAndLossSecondSection: string[] = [
    'REVENUES FROM GOLD PURCHASES : 0.00',
    'REVENUES FROM REPAIRS : 0.00',
    // 'REVENUES FROM SERVICES : 50.00',
  ];

  profitAndLossThirdSection: string[] = [
    'TOTAL VISA CHARGES : 0.00',
    'TOTAL EXPENSES : 0.00',
    'NET REVENUE : 0.00',
  ];

  profitAndLossFourthSection: string[] = [
    'EQUIVALENT GOLD SOLD (g) 995 : 0.00',
    'EQUIVALENT GOLD IN STOCK (g) 995 : 0.00',
    'STOCK VALUE USD : 0.00',
  ];

  profitAndLossFifthSection: string[] = [
    `CLIENTS PENDING BALANCES : 0.00`,
    `SUPPLIERS PENDING BALANCES MONEY : 0.00`,
    `SUPPLIERS PENDING BALANCES GOLD : 0.00`,
    `EXPENSE ACCOUNT PENDING BALANCES : 0.00`,
  ];

  ngOnChanges(changes: SimpleChanges) {
    // this.calculateTotals();
    console.log(this.profitLoss);
    // if (this.profitLoss) {
    this.profitAndLossFirstSection = [
      `GROSS SALES : ${this.getLocalValues(this.profitLoss?.GrossSale)}`,
      `TOTAL RETURNS : ${this.getLocalValues(this.profitLoss?.Returns)}`,
      `SALES AFTER RETURNS : ${this.getLocalValues(this.profitLoss?.SalesAfterReturns)}`,
      `TOTAL COST : ${this.getLocalValues(this.profitLoss?.Cost)}`,
      `SALES REVENUES : ${this.getLocalValues(this.profitLoss?.Revenue)}`,
    ];
    this.profitAndLossSecondSection = [
      `REVENUES FROM GOLD PURCHASES : ${this.getLocalValues(this.profitLoss?.RevenueFromGoldPurchases)}`,
      `REVENUES FROM REPAIRS :${this.getLocalValues(this.profitLoss?.RevenueFromRepairs)}`,
      // `REVENUES FROM SERVICES :${this.profitLoss?.}`,
    ];
    this.profitAndLossThirdSection = [
      `TOTAL VISA CHARGES : ${this.getLocalValues(this.profitLoss?.VisaCharges)}`,
      `TOTAL EXPENSES : ${this.getLocalValues(this.profitLoss?.TotalExpenses)}`,
      `NET REVENUE : ${this.getLocalValues(this.profitLoss?.Net_Revenue)}`,
    ];
    this.profitAndLossFourthSection = [
      `EQUIVALENT GOLD SOLD (g) 995 : ${this.getLocalValues(this.profitLoss?.EQUIVALENT_GOLD_SOLD__995)}`,
      `EQUIVALENT GOLD IN STOCK (g) 995 : ${this.getLocalValues(this.profitLoss?.L_PL_GOLD_IN_STOCK)}`,
      `STOCK VALUE USD : ${this.getLocalValues(this.profitLoss?.L_PL_STOCK_VALUE)}`,
    ];
    this.profitAndLossFifthSection = [
      `CLIENTS PENDING BALANCES : ${this.getLocalValues(this.profitLoss?.L_PL_CLIENTS_PENDING_BALANCE)}`,
      `SUPPLIERS PENDING BALANCES MONEY : ${this.getLocalValues(this.profitLoss?.L_PL_SUPPLIERS_PENDING_BALANCES_MONEY)}`,
      `SUPPLIERS PENDING BALANCES GOLD : ${this.getLocalValues(this.profitLoss?.L_PL_SUPPLIERS_PENDING_BALANCES_GOLD)}`,
      `EXPENSE ACCOUNT PENDING BALANCES : ${this.getLocalValues(this.profitLoss?.L_PL_EXPENSE_ACCOUNTS_PENDING_BALANCES)}`,
    ];
    // }
  }

  private getLocalValues(value: any) {
    if (value === 0 || !value) {
      return 0;
    } else {
      return parseFloat(parseFloat(value).toFixed(2)).toLocaleString();
    }
  }
}
