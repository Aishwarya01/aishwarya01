import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransformerServicesService {
  apiUrl5 = environment.apiUrl_Diagram;

  constructor(private http: HttpClient) { }

  public addTransformer(transformer: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/saveTransformer', transformer, { responseType: 'text' as 'json' })
  }
  public retriveTransformer(fileName: any,nodeId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrieveTransformer'+'/'+fileName+'/'+nodeId, { responseType: 'text' as 'json' })
  }
  public updateTransformer(transformer: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/updateTransformer', transformer, { responseType: 'text' as 'json' })
  }

}