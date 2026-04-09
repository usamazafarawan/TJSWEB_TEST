import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'gold-purchases-section',
  styleUrls: ['./gold-purchases-section.component.scss'],
  templateUrl: './gold-purchases-section.component.html',
})
export class GoldPurchasesSectionComponent implements OnChanges {
  @Input() goldScreenData: any;
  goldPurchasesTableSettings = {
    actions: false,
    columns: {},
  };

  goldPurchasesTableSource: LocalDataSource = new LocalDataSource();

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.calculateTotals();
  }

  private calculateTotals() {
    console.log(this.goldScreenData);
    if (this.goldScreenData?.results[0]) {
      const columns = this.goldScreenData?.results[0];
      const settings = {...this.goldPurchasesTableSettings, columns: {}};
      for (const key in columns) {
        if (columns.hasOwnProperty(key)) {
          const valueType = typeof columns[key];
          settings.columns[key] = {
            title: key,
            type: valueType,
          };
        }
      }
      this.goldPurchasesTableSettings = settings;
      this.goldPurchasesTableSource.load(this.goldScreenData?.results).then(() => {
        console.log("data loaded");
      });
    }
  }
}
