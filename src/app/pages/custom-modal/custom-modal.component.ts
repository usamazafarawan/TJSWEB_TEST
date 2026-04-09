import {Component} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {ReportService} from '../../services/report.service';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'ngx-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss'],
})
export class CustomModalComponent {
  searchQuery: string;
  searchResults: any[]; // Change the type to match your API response
  selectedResult: any;
  isLoading: boolean = false;

  constructor(protected dialogRef: NbDialogRef<CustomModalComponent>, private reportService: ReportService) {
  }

  customModalTableSettings = {
    // hideSubHeader: true,
    actions: false,
    pager: {
      perPage: 5,
    },
    columns: {
      ID: {
        title: 'Client Id',
        type: 'number',
      },
      Name: {
        title: 'Client Name',
        type: 'string',
      },
      Mobile: {
        title: 'Mobile',
        type: 'number',
      },
      Account_Balance: {
        title: 'Main Balance',
        type: 'number',
      },
    },
    selectMode: 'single',
  };

  customModalTableSources: LocalDataSource = new LocalDataSource();

  // onRowSelect(event : any) {
  //   // Implement your logic here to handle row selection
  //   console.log('Selected Row Data:', event.data);
  //   // You can pass event.data to your function or perform any other action
  // }

  closeModal() {
    this.dialogRef.close({removeOverlay: true, result: null});
  }

  search() {
    this.isLoading = true;
    const data = {
      searchText: this.searchQuery,
    };
    console.log(data, 'data');
    this.reportService.getClients(data).then((_clients: any) => {
      console.log(_clients, 'CLients list');
      this.searchResults = _clients.records;
      this.customModalTableSources.load(this.searchResults)
      this.isLoading = false;
    }).catch(error => {
      console.log(error);
      this.isLoading = false;
    });
    // Implement your API call here and populate this.searchResults
    // Example:
    // this.myApiService.search(this.searchQuery).subscribe(results => {
    //   this.searchResults = results;
    // });
  }

  onRowSelect(result: any) {
    this.selectedResult = result;
    this.dialogRef.close({removeOverlay: true, result: result.data}); // Pass selected result back to the main component
  }

}
