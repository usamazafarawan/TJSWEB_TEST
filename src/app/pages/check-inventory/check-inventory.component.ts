import {Component, OnInit, OnDestroy} from '@angular/core';
import {ReportService} from '../../services/report.service';
import {HttpClient} from '@angular/common/http';
import {jsPDF} from 'jspdf';
import { Html5Qrcode } from 'html5-qrcode';

@Component({
  selector: 'ngx-check-inventory',
  templateUrl: './check-inventory.component.html',
  styleUrls: ['./check-inventory.component.scss'],
})
export class CheckInventoryComponent implements OnInit, OnDestroy {

  referenceNumber: string;
  externalreferenceNumber: string;
  sellingPrice: number = null;
  warehouse: any = '';
  description: string = '';
  quantity: number = null;
  details: string = '';
  rowCount: number = 0;
  systemConfiguration: any;
  exchangeRates: any;
  loadingRecord: boolean = false;
  generatingPdf: boolean = false;
  imageUrl: any;
  
  scannerOpened: boolean = false;
  html5QrCode: Html5Qrcode | null = null;

  constructor(private reportService: ReportService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadParameters();
  }

  loadParameters() {
    this.loadingRecord = true;
    this.reportService.getSystemConfiguration().then((config: any) => {
      console.log(config);
      this.systemConfiguration = {
        Currency_Control: config.Currency_Control.replace(/\s/g, ''),
        Margin_Profit: config.Margin_Profit,
        DIAMOND_ITEMS_STONE_DETAILS_FLAG: config.DIAMOND_ITEMS_STONE_DETAILS_FLAG?.trim(),
      };
    });
    this.reportService.getExchangeRate().then((rates: any) => {
      console.log(rates, 'rates');
      this.exchangeRates = rates.exchangeRates;
      this.loadingRecord = false;
    });
  }

  handleOnKeyPress(event: any) {
    if (event.key === 'Enter') {
      this.rowCount = 0;
      this.imageUrl = null;
      this.getReport();
    }
  }

  loadNext() {
    this.rowCount = this.rowCount + 1;
    this.getReport();
  }

  loadPrevious() {
    this.rowCount = this.rowCount - 1;
    this.getReport();
  }

  clearData() {
    this.rowCount = 0;
    this.referenceNumber = null;
    this.externalreferenceNumber = null;
    this.sellingPrice = null;
    this.quantity = null;
    this.details = null;
    this.description = null;
    this.warehouse = null;
    this.imageUrl = null;
  }

    startScanner() {
  if (this.scannerOpened) {
    return;
  }

  this.scannerOpened = true;

  setTimeout(() => {
    this.html5QrCode = new Html5Qrcode('qr-reader');

    this.html5QrCode.start(
      { facingMode: 'environment' },
      {
        fps: 15,
        qrbox: undefined,
        aspectRatio: 1.7778,
      },
      (decodedText: string) => {
        this.referenceNumber = decodedText;
        this.rowCount = 0;
        this.imageUrl = null;
        this.getReport();
        this.stopScanner();
      },
      (errorMessage) => {
        // ignore live scan errors
      }
    ).catch((err) => {
      console.error('Unable to start scanner', err);
      this.scannerOpened = false;
    });
  }, 200);
}

  stopScanner() {
    if (this.html5QrCode) {
      this.html5QrCode.stop()
        .then(() => {
          if (this.html5QrCode) {
            this.html5QrCode.clear();
          }
        })
        .catch((err) => {
          console.error('Unable to stop scanner', err);
        });
    }

    this.html5QrCode = null;
    this.scannerOpened = false;
  }

  ngOnDestroy(): void {
    this.stopScanner();
  }

  getReport() {
    this.loadingRecord = true;
    const data = {
      T_S_REF_NUMBER: this.referenceNumber,
      T_S_External_Ref_Number: this.externalreferenceNumber,
      systemConfiguration: this.systemConfiguration,
      exhangeRates: this.exchangeRates,
      RowCount: this.rowCount,
    };
    this.reportService.loadCheckInventory(data).then((res: any) => {
      console.log(res);
      if (res.records.ID) {
        this.sellingPrice = res.T_Selling_Price;
        this.warehouse = res.records.Warehouse;
        this.description = res.records.Description;
        this.quantity = res.records.qty;
        this.details = res.details;
        this.imageUrl = this.arrayBufferToBase64(res.records.Image_DB.data) || '';
        console.log(this.imageUrl, 'Image url');
      } else {
        console.log('No records');
        this.sellingPrice = null;
        this.warehouse = null;
        this.description = null;
        this.quantity = null;
        this.details = null;
        this.imageUrl = null;
      }
      this.loadingRecord = false;
    }).catch(error => {
      console.log(error);
      this.loadingRecord = false;
    });
  }

  async generatePDF(): Promise<void> {
    this.generatingPdf = true;
    const data = {
      // Your data goes here
      referenceNumber: this.referenceNumber,
      sellingPrice: this.sellingPrice,
      warehouse: this.warehouse,
      description: this.description,
      quantity: this.quantity,
      details: this.details,
      // ...
    };
    const doc = new jsPDF();

    // Add image to the PDF
    doc.addImage(this.imageUrl, 'JPEG', 10, 30, 100, 100); // Adjust position and dimensions as needed

    // Add text content
    doc.text('Inventory Detail:', 10, 10);
    const jsonString = JSON.stringify(data, null, 2);
    const formattedJsonString = jsonString.substring(1, jsonString.length - 1);
    doc.text(formattedJsonString, 10, 150); // Adjust position as needed

    doc.save(`${this.referenceNumber}.pdf`);
    this.generatingPdf = false;
  }

  private async fetchImage(imageUrl: string): Promise<ArrayBuffer> {
    return await this.http.get(imageUrl, {responseType: 'arraybuffer'})
      .toPromise();
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const binary = [].slice.call(new Uint8Array(buffer));
    const base64String = btoa(binary.map((item) => String.fromCharCode(item)).join(''));
    return `data:image/jpeg;base64,${base64String}`;
  }

  // private arrayBufferToBase64(buffer: ArrayBuffer): string {
  //   return Buffer.from(buffer).toString('base64');
  //   // const binary = String.fromCharCode(...new Uint8Array(buffer));
  //   // return btoa(binary);
  // }
}
