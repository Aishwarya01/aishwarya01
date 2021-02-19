import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';


const httpoption ={
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  apiUrl = environment.apiUrl
  constructor ( private http: HttpClient) { }
  
  public login(user :User): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/autheticate', user, httpoption)
  }
}