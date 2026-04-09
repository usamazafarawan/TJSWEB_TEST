import { Component, OnInit } from "@angular/core";
import { NbDialogService, NbDialogConfig } from "@nebular/theme";
import { CustomModalComponent } from "../custom-modal/custom-modal.component";
import { ReportService } from "../../services/report.service";
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: "ngx-client-view",
  templateUrl: "./client-view.component.html",
  styleUrls: ["./client-view.component.scss"],
})
export class ClientViewComponent implements OnInit {
  isModalOpen = false;
  fromDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  toDate = new Date();
  name: string;
  id: number;
  mobile: number;
  address: string;
  balance: number;
  email: string;
  lastTransaction: string;
  loadReport: string = null;
  excludeHiddenTrans: boolean = false;
  Client360TableSettings = {
    // hideSubHeader: true,
    actions: false,
    pager: {
      perPage: 10, // Set the number of records per page here
    },
    columns: {},
  };
  Client360TableSource: LocalDataSource = new LocalDataSource();

  constructor(
    private dialogService: NbDialogService,
    private reportService: ReportService
  ) { }

  openModal() {
    // const dialogConfig: NbDialogConfig = {
    //   hasBackdrop: false, // Disable backdrop to allow for a larger modal
    //   context: {},
    // };
    this.isModalOpen = true;
    this.dialogService
      .open(CustomModalComponent, {
        context: {},
        hasBackdrop: false,
      })
      .onClose.subscribe((response) => {
        const result = response.result;
        if (result) {
          // Handle the selected result from the modal
          console.log(result);
          this.name = result.Name;
          this.id = result.ID;
          this.mobile = result.Mobile;
          this.email = result.Email;
          this.address = result.Address;
          this.balance = result.Account_Balance;
          this.lastTransaction = result.Last_Transaction_Date;
        }
        this.isModalOpen = !response.removeOverlay;
      });
  }

  loadClientStatement() {
    this.loadReport = "statement";
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
      fromDate: localFromDate,
      toDate: localToDate,
      C_ID: this.id,
      excludeHiddenTransactionFlag: this.excludeHiddenTrans
    };
    console.log(data, "data");

    this.reportService
      .get360ClientStatement(data)
      .then((res: any) => {
        console.log(res);
        const columns = res.records[0];
        const settings = { ...this.Client360TableSettings, columns: {} };
        for (const key in columns) {
          if (columns.hasOwnProperty(key)) {
            const valueType = typeof columns[key];
            settings.columns[key] = {
              title: key,
              type: valueType,
            };
          }
        }
        this.Client360TableSettings = settings;
        this.Client360TableSource.load(res.records).then(() => {
          this.loadReport = null;
        });
      })
      .catch((error) => {
        console.log(error);
        console.log(error);
        this.loadReport = null;
      });
  }
  loadSalesDetails() {
    this.loadReport = "sales";
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
      fromDate: localFromDate,
      toDate: localToDate,
      C_ID: this.id,
      excludeHiddenTransactionFlag: this.excludeHiddenTrans

    };
    console.log(data, "data");

    this.reportService
      .get360Sales(data)
      .then((res: any) => {
        console.log(res);
        const columns = res.records[0];
        const settings = { ...this.Client360TableSettings, columns: {} };
        for (const key in columns) {
          if (columns.hasOwnProperty(key)) {
            const valueType = typeof columns[key];
            settings.columns[key] = {
              title: key,
              type: valueType,
            };
          }
        }
        this.Client360TableSettings = settings;
        this.Client360TableSource.load(res.records).then(() => {
          this.loadReport = null;
        });
      })
      .catch((error) => {
        console.log(error);
        console.log(error);
        this.loadReport = null;
      });



  }
  loadSalesSummary() {
    this.loadReport = "summary";
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
      fromDate: localFromDate,
      toDate: localToDate,
      C_ID: this.id,
      excludeHiddenTransactionFlag: this.excludeHiddenTrans
    };
    console.log(data, "data");

    this.reportService
      .get360Summary(data)
      .then((res: any) => {
        console.log(res);
        const columns = res.records[0];
        const settings = { ...this.Client360TableSettings, columns: {} };
        for (const key in columns) {
          if (columns.hasOwnProperty(key)) {
            const valueType = typeof columns[key];
            settings.columns[key] = {
              title: key,
              type: valueType,
            };
          }
        }
        this.Client360TableSettings = settings;
        this.Client360TableSource.load(res.records).then(() => {
          this.loadReport = null;
        });
      })
      .catch((error) => {
        console.log(error);
        console.log(error);
        this.loadReport = null;
      });


  }

  ngOnInit(): void {
    this.openModal();
  }
}
