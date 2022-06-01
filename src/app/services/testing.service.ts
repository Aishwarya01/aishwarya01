import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TestingDetails} from '../model/testing-details';
import { CommentsSection } from '../model/comments-section';

@Injectable({
  providedIn: 'root'
})
export class TestingService {
  
  apiUrl = environment.apiUrl_v2;
  constructor(private http: HttpClient) { }

  public savePeriodicTesting(testing: TestingDetails): Observable<any> {
   return this.http.post<any>(this.apiUrl + '/savePeriodicTesting', testing, { responseType: 'text' as 'json' })
  }
  public sendComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/sendTestingComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }
  public replyComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/replyTestingComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }
  public approveRejectComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/approveTestingComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }
  public retrieveTesting(siteId: any,userName:any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/retrievePeriodicTesting'+'/'+userName+ '/' +siteId, { responseType: 'text' as 'json' })
  }
}