import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'repairs-section',
  styleUrls: ['./repairs-section.component.scss'],
  templateUrl: './repairs-section.component.html',
})
export class RepairsSectionComponent implements OnChanges {
  @Input() repairScreen: any;
  repairsTableSettings = {
    actions: false,
    columns: {},
  };

  repairsTableSource: LocalDataSource = new LocalDataSource();

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.calculateTotals();
  }

  private calculateTotals() {
    console.log(this.repairScreen);
    if (this.repairScreen?.result[0]) {
      const columns = this.repairScreen?.result[0];
      const settings = {...this.repairsTableSettings, columns: {}};
      for (const key in columns) {
        if (columns.hasOwnProperty(key)) {
          const valueType = typeof columns[key];
          settings.columns[key] = {
            title: key,
            type: valueType,
          };
        }
      }
      this.repairsTableSettings = settings;
      this.repairsTableSource.load(this.repairScreen?.result).then(() => {
        console.log("data loaded");
      });
    }
  }

}
