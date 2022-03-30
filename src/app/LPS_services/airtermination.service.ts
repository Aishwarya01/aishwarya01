import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airtermination } from '../LPS_model/airtermination';


const httpHeaders = new HttpHeaders;

httpHeaders.set( 'Content-Type', 'multipart/form-data' );
declare var require: any;

@Injectable({
  providedIn: 'root'
})

export class AirterminationService {

  apiUrl = environment.apiUrl_LPS;
  constructor(private http: HttpClient) { }

  public saveAirtermination(airtermination:Airtermination,formData:any): Observable<any> {
    return this.http.post<Airtermination>(this.apiUrl + '/addAirTerminationLps', airtermination,formData)
  }

  public updateAirtermination(airTermination: Airtermination,formData:any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateAirTerminationLps', airTermination,formData);
  }

  public retriveAirTerminationDetails(userName: String,basicLpsId: any): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/retrieveAirTerminationLps' + '/' +userName+ '/' +basicLpsId, { responseType: 'text' as 'json' })
  }
  
}
