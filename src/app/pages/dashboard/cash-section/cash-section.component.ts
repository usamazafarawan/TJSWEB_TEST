import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'cash-section',
  styleUrls: ['./cash-section.component.scss'],
  templateUrl: './cash-section.component.html',
})
export class CashSectionComponent implements OnChanges {
  @Input() cashScreen: any;
  @Input() Secondary_Currency_Feature: any;
  @Input() Secondary_Currency_Label: any;
  showFields: boolean;
  clientReceiptVouchersTableSettings = {
    hideSubHeader: true,
    actions: false,
    columns: {
      totalValueType: {
        title: '',
        type: 'string',
      },
      cash: {
        title: 'CASH',
        type: 'string',
      },
      creditCard: {
        title: 'CREDIT CARD',
        type: 'string',
      },
      cheques: {
        title: 'CHEQUES',
        type: 'string',
      },
    },
  };

  paymentVouchersTableSettings = {
    hideSubHeader: true,
    actions: false,
    columns: {
      totalValueType: {
        title: '',
        type: 'string',
      },
      cash: {
        title: 'CASH',
        type: 'string',
      },
      cheques: {
        title: 'CHEQUES',
        type: 'string',
      },
      gold995: {
        title: 'GOLD 995',
        type: 'string',
      },
    },
  };

  clientsPaymentVoucherTableSettings = {
    actions: false,
    columns: {
      Payment_Type: {
        title: 'PAYMENT TYPE',
        type: 'string',
      },
      ['Amount USD']: {
        title: 'AMOUNT USD',
        type: 'string',
      },
      // ['Amount LBP']: {
      //   title: 'AMOUNT LBP',
      //   type: 'string',
      // },
    },
  };

  clientReceiptVouchersTableSource: LocalDataSource = new LocalDataSource();
  paymentVouchersTableSource: LocalDataSource = new LocalDataSource();
  clientsPaymentVoucherTableSource: LocalDataSource = new LocalDataSource();

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.showFields = this.Secondary_Currency_Feature === '1';
    this.calculateTotals();
  }

  private calculateTotals() {
    if (this.showFields) {
      const settings  = {
        ...this.clientsPaymentVoucherTableSettings,
        columns: {
          ...this.clientsPaymentVoucherTableSettings.columns, [`Amount ${this.Secondary_Currency_Label}`]: {
            title: `AMOUNT ${this.Secondary_Currency_Label}`,
            type: 'string',
          },
        },
      };
      this.clientsPaymentVoucherTableSettings = settings;
    }
    if (this.cashScreen?.results) {
      // client reciept voucher
      const crv = this.cashScreen.results.clientReceiptVouchers;
      console.log(crv);
      if (crv) { // && crv?.Cash != null && crv?.credit != null
      const crvCashIndex = crv.findIndex(_item => _item.Payment_Type === 'Cash');
      const crvCreditIndex = crv.findIndex(_item => _item.Payment_Type === 'Credit');
      this.clientReceiptVouchersTableSource.load([
        {
          totalValueType: 'TOTAL USD',
          cash: crv[crvCashIndex]['AmountUSD'].toLocaleString(),
          creditCard: crv[crvCreditIndex]['AmountUSD'].toLocaleString(),
          cheques: '',
        },
        this.showFields && {
          totalValueType: `TOTAL ${this.Secondary_Currency_Label}`,
          cash: crv[crvCashIndex][`Amount ${this.Secondary_Currency_Label}`].toLocaleString(),
          creditCard: crv[crvCreditIndex][`Amount ${this.Secondary_Currency_Label}`].toLocaleString(),
          cheques: '',
        },
      ]);
    }
      // Client PAYMENT VOUCHERS
      const cpv = this.cashScreen.results.clientPaymentVouchers;
      this.clientsPaymentVoucherTableSource.load(cpv);
      // Payment voucher
      const pv = this.cashScreen.results.supplierVouchers;
      const pvCashIndex = pv.findIndex(_item => _item.Payment_Type === 'Cash');
      const pvChequeIndex = pv.findIndex(_item => _item.Payment_Type === 'Cheque');
      const pvGoldIndex = pv.findIndex(_item => _item.Payment_Type === 'Gold_995');
      this.paymentVouchersTableSource.load([
        {
          totalValueType: 'TOTAL USD',
          cash: pv[pvCashIndex]['AmountUSD'].toLocaleString(),
          cheques: pv[pvChequeIndex]['AmountUSD'].toLocaleString(),
          gold995: pv[pvGoldIndex]['AmountUSD'].toLocaleString(),
        },
        this.showFields && {
          totalValueType: `TOTAL ${this.Secondary_Currency_Label}`,
          cash: '',
          cheques: '',
          gold995: '',
        },
      ]);
    }
  }
}
