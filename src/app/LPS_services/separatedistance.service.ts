import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SeperationDistanceReport } from '../LPS_model/SeperationDistanceReport';

@Injectable({
  providedIn: 'root'
})
export class SeparatedistanceService {
  apiUrl = environment.apiUrl_LPS;
  constructor(private http: HttpClient) { }

  public saveSeparateDistance(separatedistance: SeperationDistanceReport): Observable<any> {
    return this.http.post<SeperationDistanceReport>(this.apiUrl + '/addSeperationDistance', separatedistance, { responseType: 'text' as 'json' })
  }

  public updateSeparateDistance(separatedistance: SeperationDistanceReport): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateSeperationDistance', separatedistance, { responseType: 'text' as 'json' })
  }

  public retriveSeperationDistance(userName: String, basicLpsId: number): Observable<any> {
    return this.http.get<SeperationDistanceReport>(this.apiUrl + '/retrieveSeperationDistance' + '/' + userName + '/' + basicLpsId, { responseType: 'text' as 'json' })
}
}