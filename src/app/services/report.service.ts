import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {

  exchangeRates: any;
  token: any = localStorage.getItem('token');

  constructor(private userService: UserService, private http: HttpClient) {
  }

  // Function to update authHeader with the latest token from localStorage
  private updateAuthHeader(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    } else {
      console.error('No token found');
    }
  }

  // Method to return the current authHeader
  private getAuthHeader() {
    this.updateAuthHeader(); // Ensure the token is up-to-date
    if (!this.token) {
      throw new Error('Token is missing');
    }
    return { headers: new HttpHeaders({ 'Information': this.token }) };
  }

  getExchangeRate() {
    return this.http.get(`${environment.api_base_url}/getExchangeRate`, this.getAuthHeader() ).toPromise();
  }

  setExchangeRate(_rates: any) {
    this.exchangeRates = _rates;
  }

  getSystemConfiguration() {
    return this.http.get(`${environment.api_base_url}/getConfig`, this.getAuthHeader() ).toPromise();
  } // it's getting the value Multiply or divide

  // apis
  loadExpenseData() {
    return this.http.get(`${environment.api_base_url}/loadExpenses`, this.getAuthHeader() ).toPromise();
  }

  loadExpenseReport(data: any) {
    return this.http.post(`${environment.api_base_url}/getExpenseReport`, data, this.getAuthHeader() ).toPromise();
  }

  loadFilters() {
    return this.http.get(`${environment.api_base_url}/loadFilters`, this.getAuthHeader() ).toPromise();
  }

  loadIventoryReport(data: any) {
    return this.http.post(`${environment.api_base_url}/getInventoryReport`, data, this.getAuthHeader() ).toPromise();
  }

  loadIventoryReportPerCategory(data: any) {
    const endpoint = 'getInventoryReportPerCategory';
    return this.http.post(`${environment.api_base_url}/${endpoint}`, data, this.getAuthHeader() ).toPromise();
  }

  loadSalesPerSource(data: any) {
    return this.http.post(`${environment.api_base_url}/getSalesPerSource`, data, this.getAuthHeader() ).toPromise();
  }

  loadSalesPerSupplier(data: any) {
    return this.http.post(`${environment.api_base_url}/getSalesPerSupplier`, data, this.getAuthHeader() ).toPromise();
  }

  loadSalesGroupedCategory(data: any) {
    return this.http.post(`${environment.api_base_url}/getSalesByCategory`, data, this.getAuthHeader() ).toPromise();
  }

  loadSalesPerClient(data: any) {
    return this.http.post(`${environment.api_base_url}/getSalesReportByClient`, data, this.getAuthHeader() ).toPromise();
  }

  loadSales2(data: any) {
    return this.http.post(`${environment.api_base_url}/getSalesReport2`, data, this.getAuthHeader() ).toPromise();
  }

  loadSales(data: any) {
    return this.http.post(`${environment.api_base_url}/getSalesReport`, data, this.getAuthHeader() ).toPromise();
  }

  loadGemsFilters() {
    return this.http.get(`${environment.api_base_url}/loadGemsFilters`, this.getAuthHeader() ).toPromise();
  }

  loadGemsReport(data: any) {
    return this.http.post(`${environment.api_base_url}/getGemsInventoryReport`, data, this.getAuthHeader() ).toPromise();
  }

  loadCatalogReport(data: any) {
    return this.http.post(`${environment.api_base_url}/getCatalogReport`, data, this.getAuthHeader() ).toPromise();
  }

  loadCheckInventory(data: any) {
    return this.http.post(`${environment.api_base_url}/getInventoryItem`, data, this.getAuthHeader() ).toPromise();
  }

  getClients(data: any) {
    return this.http.post(`${environment.api_base_url}/getClientsInfo`, data, this.getAuthHeader() ).toPromise();
  }

  get360ClientStatement(data: any) {
    return this.http.post(`${environment.api_base_url}/getClientStatement`, data, this.getAuthHeader() ).toPromise();
  }

  get360Sales(data: any) {
    return this.http.post(`${environment.api_base_url}/getClientSaleDetail`, data, this.getAuthHeader() ).toPromise();
  }

  get360Summary(data: any) {
    return this.http.post(`${environment.api_base_url}/getClientSaleSummary`, data, this.getAuthHeader() ).toPromise();
  }

  getDashboardExpenses(data: any) {
    return this.http.post(`${environment.api_base_url}/dashboard/loadExpenses`, data, this.getAuthHeader() ).toPromise();
  }

  getDashboardGoldPurchases(data: any) {
    const endpoint = `/dashboard/loadGoldDataPurchases`;
    return this.http.post(`${environment.api_base_url}${endpoint}`, data, this.getAuthHeader() ).toPromise();
  }

  getDashboardAdjustments(data: any) {
    return this.http.post(`${environment.api_base_url}/dashboard/loadAdjustments`, data, this.getAuthHeader() ).toPromise();
  }

  getDashboardRepairs(data: any) {
    return this.http.post(`${environment.api_base_url}/dashboard/loadRepairData`, data, this.getAuthHeader() ).toPromise();
  }

  getDashboardCash(data: any) {
    return this.http.post(`${environment.api_base_url}/dashboard/loadCashData`, data, this.getAuthHeader() ).toPromise();
  }

  getDashboardSales(data: any) {
    return this.http.post(`${environment.api_base_url}/dashboard/loadSalesData`, data, this.getAuthHeader() ).toPromise();
  }

  getDashboardVisa(data: any) {
    return this.http.post(`${environment.api_base_url}/dashboard/loadVisaCharges`, data, this.getAuthHeader() ).toPromise();
  }

  getDashboardPL(data: any) {
    return this.http.post(`${environment.api_base_url}/dashboard/fillUpPLData`, data, this.getAuthHeader() ).toPromise();
  }
}
