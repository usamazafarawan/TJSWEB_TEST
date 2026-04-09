import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'expenses-section',
  styleUrls: ['./expenses-section.component.scss'],
  templateUrl: './expenses-section.component.html',
})
export class ExpensesSectionComponent implements OnChanges {
  @Input() expenseData: any; // Input property to receive data from the parent
  @Input() Secondary_Currency_Label: any; // Input property to receive data from the parent

  spTotal_LBP: any = 0.00;
  spTotal_USD: any = 0.00;
  spTotal_Gold: any = 0.00;
  oeTotal_LBP: any = 0.00;
  oeTotal_USD: any = 0.00;
  oeTotal_Gold: any = 0.00;

  ngOnChanges(changes: SimpleChanges) {
    this.calculateTotals();
  }

  private calculateTotals() {
    // expense
    this.spTotal_LBP = this.getLocalValues(this.expenseData?.expensesData?.T_Supplier_Purchases_LB) || 0;
    this.spTotal_USD = this.getLocalValues(this.expenseData?.expensesData?.T_Supplier_Purchases_USD) || 0;
    this.spTotal_Gold = this.getLocalValues(this.expenseData?.expensesData?.T_Supplier_Purchases_Gold) || 0;
    // other expenses
    this.oeTotal_LBP = this.getLocalValues(this.expenseData?.otherExpensesData?.T_Expense_LBP) || 0;
    this.oeTotal_USD = this.getLocalValues(this.expenseData?.otherExpensesData?.T_Expense_USD) || 0;
    this.oeTotal_Gold = this.getLocalValues(this.expenseData?.otherExpensesData?.Total_Expenses) || 0;
  }

  private getLocalValues(value: any) {
    console.log(value);
    if (value === 0 || !value) {
      return 0;
    } else  {
      return parseFloat(value.toFixed(2)).toLocaleString();
    }
  }
}
