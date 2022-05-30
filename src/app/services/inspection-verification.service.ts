import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InspectionDetails } from '../model/inspection-details';
import { Reportdetails } from '../model/reportdetails';
import { Summary } from '../model/summary';
import { Supplycharacteristics } from '../model/supplycharacteristics';
import { TestingDetails } from '../model/testing-details';
declare var require: any
const FileSaver = require('file-saver');

@Injectable({
  providedIn: 'root'
})
export class InspectionVerificationService {

  apiUrl = environment.apiUrl;
  apiUrl2= environment.apiUrl_v2;
  apiUrl5 = environment.apiUrl_Diagram;
  constructor(private http: HttpClient) { }

  public updateBasic(reportDetails: Reportdetails): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateInstalReport', reportDetails, { responseType: 'text' as 'json' })
  }
  public updateSupply(supply: Supplycharacteristics): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateCharacteristics', supply, { responseType: 'text' as 'json' })
  }
  public updateIncoming(incoming: InspectionDetails): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateInspectionDetails', incoming, { responseType: 'text' as 'json' })
  }
  public updateTesting(testing: TestingDetails): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updatePeriodicTesting', testing, { responseType: 'text' as 'json' })
  }
  public updateSummary(summary: Summary): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateSummary', summary, { responseType: 'text' as 'json' })
  }
  public downloadPDF(siteId: any,userName: any, siteName: any) {
  return   this.http.get(this.apiUrl2 + '/printFinalPDF'+'/'+userName+ '/' +siteId +'/' +siteName, { responseType: 'blob' }).subscribe(
       data =>{
         const fileName = siteName+'.pdf';
         FileSaver.saveAs(data, fileName);
       },
       err=>{
        
       }
     )
  }
  public printPDF(siteId: any,userName: any, siteName: any) {
    return   this.http.get(this.apiUrl2 + '/printFinalPDF'+'/'+userName+ '/' +siteId +'/' +siteName, { responseType: 'blob' }).subscribe(
         data =>{
           //const fileName = 'finalreport.pdf';
           var fileURL: any = URL.createObjectURL(data);
           var a = document.createElement("a");
           a.href = fileURL;
           a.target = '_blank';
           // Don't set download attribute
           // a.download = "finalreport.pdf";
           a.click();
         },
         err=>{
          
         }
       )
    }
    public mailPDF(siteId: any,userName: any, siteName: any): Observable<any> {
      return this.http.get(this.apiUrl2 + '/sendPDFinMail'+'/'+userName+ '/' +siteId+ '/'+siteName , { responseType: 'text' as 'json' })
      }

  public notificationRetrieveComments(userName: any): Observable<any> {
    return this.http.get<any>(this.apiUrl2 + '/retrieveComments'+'/'+userName, { responseType: 'text' as 'json' })
  }

  public addDiagram(diagramComponent: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/saveDiagram', diagramComponent, { responseType: 'text' as 'json' })
  }

  public updateDiagram(diagramComponent: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/updateDiagram', diagramComponent, { responseType: 'text' as 'json' })
  }

  public retriveDiagram(userName: any, fileName: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrieveDiagram'+'/'+userName+'/'+fileName, { responseType: 'text' as 'json' })
  }

  public retriveFileName(userName: any, fileName: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrievefileName'+'/'+userName+'/'+fileName, { responseType: 'text' as 'json' })
  }

  public retriveAllDiagram(userName: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrieveDiagramList'+'/'+userName, { responseType: 'text' as 'json' })
  }
  public fetchAllDiagramSymbols(): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/symbolList', { responseType: 'text' as 'json' })
  }

  public addMCB(MCB: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/saveMCB', MCB, { responseType: 'text' as 'json' })
  }

  public retriveMCB(fileName: any,nodeId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrieveMCB'+'/'+fileName+'/'+nodeId, { responseType: 'text' as 'json' })
  }
}
