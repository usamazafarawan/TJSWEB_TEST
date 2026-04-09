import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'adjustments-section',
  styleUrls: ['./adjustments-section.component.scss'],
  templateUrl: './adjustments-section.component.html',
})
export class AdjustmentsSectionComponent implements OnChanges {
  @Input() adjustments: any;

  T_S_DR: any = 0;
  T_S_CR: any = 0;
  T_C_DR: any = 0;
  T_C_CR: any = 0;
  T_S_DR_Gold: any = 0;
  T_S_CR_Gold: any = 0;
  T_OA_DR: any = 0;
  T_OA_CR: any = 0;


  ngOnChanges(changes: SimpleChanges) {
    this.calculateTotals();
  }

  private calculateTotals() {
    console.log(this.adjustments);
    this.T_S_DR = this.getLocalValues(this.adjustments?.results.T_S_DR) || 0;
    this.T_S_CR = this.getLocalValues(this.adjustments?.results.T_S_CR) || 0;
    this.T_C_DR = this.getLocalValues(this.adjustments?.results.T_C_DR) || 0;
    this.T_C_CR = this.getLocalValues(this.adjustments?.results.T_C_CR) || 0;
    this.T_S_DR_Gold = this.getLocalValues(this.adjustments?.results.T_S_DR_Gold) || 0;
    this.T_S_CR_Gold = this.getLocalValues(this.adjustments?.results.T_S_CR_Gold) || 0;
    this.T_OA_DR = this.getLocalValues(this.adjustments?.results.T_OA_DR) || 0;
    this.T_OA_CR = this.getLocalValues(this.adjustments?.results.T_OA_CR) || 0;
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
