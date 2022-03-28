import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmcClientDetails } from '../EMC_Model/emc-client-details';

@Injectable({
  providedIn: 'root'
})
export class EmcSavedReportService {
  
  apiUrl_EMC = environment.apiUrl_EMC;
  constructor(private http: HttpClient) { }

  public retrieveListOfClientDetails(userName: any): Observable<any> { 
    return this.http.get<EmcClientDetails>(this.apiUrl_EMC + '/retrieveListOfClientDetails' + '/' + userName , { responseType: 'text' as 'json' })
  }

  public retrieveAllCLientDetails(): Observable<any> { 
    return this.http.get<EmcClientDetails>(this.apiUrl_EMC + '/retrieveAllClients', { responseType: 'text' as 'json' })
  }

  public retrieveFinalEmcReport(userName: String,emcId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl_EMC + '/retrieveEmcReport' + '/' +userName+ '/' +emcId, { responseType: 'text' as 'json' })
  } 
}