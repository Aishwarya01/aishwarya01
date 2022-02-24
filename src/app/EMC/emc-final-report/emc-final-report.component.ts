import { Component, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmcClientDetails } from 'src/app/EMC_Model/emc-client-details';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { EmcClientDetailsService } from 'src/app/EMC_Services/emc-client-details.service';
import { EmcMatstepperComponent } from '../emc-matstepper/emc-matstepper.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmcSavedReportService } from 'src/app/EMC_Services/emc-saved-report.service';

@Component({
  selector: 'app-emc-final-report',
  templateUrl: './emc-final-report.component.html',
  styleUrls: ['./emc-final-report.component.css']
})
export class EmcFinalReportComponent implements OnInit {

  finalReportsColumns: string[] = [ 'clientName', 'contactPerson', 'clientLocation', 'clientAddress', 'createdDate', 'createdBy','action'];
  finalReport_dataSource!: MatTableDataSource<EmcClientDetails[]>;

  @ViewChild('finalReportPaginator', { static: true }) finalReportPaginator!: MatPaginator;
  @ViewChild('finalReportSort', {static: true}) finalReportSort!: MatSort;

  email: String ="";
  emcClientDetails = new EmcClientDetails();
  clientName: String="";
  clientList:any  = [];
  noDetails: boolean=false;
  noDetailsRec: boolean=false;
  noDetailsRecMsg:String="";
  showTIC: boolean = false;
  showREP: boolean = false;
  currentUser: any = [];
  currentUser1: any = [];
  userData: any=[];
  viewerFilterData:any=[];
  selectedIndex: number=0;

  successMsg: string="";
  success: boolean=false;
  Error: boolean=false;
  errorMsg: string="";
  errorArr: any=[];
  disable: boolean=false;

  @ViewChild('input') input!: MatInput;
  clientService: any;
  emcData: any=[];
  completedFilterData: any=[];

  constructor(private router: ActivatedRoute,
              private emcSavedReportService: EmcSavedReportService,
              private ChangeDetectorRef: ChangeDetectorRef,
              // private finalpdf: FinalPdfServiceService,
              private emcmatstepper:EmcMatstepperComponent,
              private modalService: NgbModal) { 
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  ngOnInit(): void {
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    this.retrieveEmcDetails();
  }

  //filter for final reports
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finalReport_dataSource.filter = filterValue.trim().toLowerCase();
  }

  retrieveEmcDetails() {
    this.emcSavedReportService.retrieveListOfClientDetails(this.email).subscribe(
      data => {
        // this.myfunction(data);
        this.emcData=JSON.parse(data);
        for(let i of this.emcData){
          if(i.allStepsCompleted=="AllStepCompleted"){
            this.completedFilterData.push(i);
          }
        }
        this.finalReport_dataSource = new MatTableDataSource(this.completedFilterData);
        this.completedFilterData = [];
        this.emcData = [];
        this.finalReport_dataSource.paginator = this.finalReportPaginator;
        this.finalReport_dataSource.sort = this.finalReportSort;
      });
}

closeModalDialog() {
  
  if (this.errorMsg != '') {
    this.Error = false;
    this.modalService.dismissAll((this.errorMsg = ''));
  } else {
    this.success = false;
    this.modalService.dismissAll((this.successMsg = ''));
  }
}

refresh() {
  this.ChangeDetectorRef.detectChanges();
}

userName=this.router.snapshot.paramMap.get('email') || '{}';

// downloadPdf(basicLpsId: any): any {
//    this.finalpdf.downloadPDF(basicLpsId,this.userName)
//  }

// priviewPdf(basicLpsId:any,clientName:any){
   
//    this.matstepper.preview(basicLpsId,clientName);
//  }

// emailPDF(basicLpsId:any,userName:any){
//   this.disable=false;
//   this.finalpdf.mailPDF(basicLpsId,userName).subscribe(
//   data => {
//   this.success = true;
//   this.successMsg = data;
//   setTimeout(()=>{
//     this.success=false;
//       },5000);
//   },
//   error => {
//     this.Error = true;
//     this.errorArr = [];
//     this.errorArr = JSON.parse(error.error);
//     this.errorMsg = this.errorArr.message;
//     setTimeout(()=>{
//       this.Error = false;
//       },5000);
//   });
// }

// printPDF(basicLpsId:any,userName:any){
  
//   this.disable=false;
//   this.finalpdf.printPDF(basicLpsId,userName)
// }

}