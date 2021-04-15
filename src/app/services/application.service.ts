import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationType } from '../model/applicationtype';

@Injectable({
  providedIn: 'root'
})
export class ApplicationTypeService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  public addApplicationType(applicationTypes: ApplicationType): Observable<any>{
    return this.http.post<any>(this.apiUrl + '/addApplicationTypes', applicationTypes )
  }

  public updateApplicationType(applicationType: ApplicationType): Observable<any>{
    return this.http.put<any>(this.apiUrl + '/updateApplicationTypes', applicationType, { responseType: 'text' as 'json' })
  }

  public retrieveApplicationTypes(): Observable<any>{
    return this.http.get<ApplicationType>(this.apiUrl+'/retrieveApplicationTypes')
  }

  public deleteApplicationType(id: number): Observable<any>{
    return this.http.delete(this.apiUrl+ '/deleteApplicationType'+'/'+ id)
  }
}