import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'src/app/globals.service';
import { BasicDetails } from 'src/app/LPS_model/basic-details';
import { LPSBasicDetailsService } from 'src/app/LPS_services/lpsbasic-details.service';
import { LpsMatstepperComponent } from '../lps-matstepper/lps-matstepper.component';

@Component({
  selector: 'app-lps-saved-report',
  templateUrl: './lps-saved-report.component.html',
  styleUrls: ['./lps-saved-report.component.css']
})
export class LpsSavedReportComponent implements OnInit {
  savedReportsLpsColumns: string[] = [ 'clientName', 'projectName', 'consultantName', 'contractorName', 'dealerContractorName' , 'address', 'createdDate', 'createdBy','continue'];
  savedReportLps_dataSource!: MatTableDataSource<BasicDetails[]>;
  @ViewChild('savedReportLpsPaginator', { static: true }) savedReportLpsPaginator!: MatPaginator;
  @ViewChild('savedReportLpsSort', {static: true}) savedReportLpsSort!: MatSort;

  // @Output("changeTab") changeTab: EventEmitter<any> = new EventEmitter();
  email: String ="";
  basicDetails = new BasicDetails();
  clientName: String="";
  clientList:any  = [];
  departmentList: any = [];
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
 
 @ViewChild('input') input!: MatInput;
 lpsData: any=[];
completedFilterData: any=[];

  constructor(private router: ActivatedRoute,
              public service: GlobalsService,
              public lpsService: LPSBasicDetailsService,
              public lpsParent: LpsMatstepperComponent,
  ) { 
    this.email = this.router.snapshot.paramMap.get('email') || '{}'

  }

  ngOnInit(): void {
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    this.retrieveLpsDetails();
   
  }

  //filter for final reports
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.savedReportLps_dataSource.filter = filterValue.trim().toLowerCase();
  }

  retrieveLpsDetails() {
    if(this.currentUser1.role == 'Inspector') {
      //
      this.lpsService.retrieveListOfBasicLps(this.email).subscribe(
        data => {
          this.lpsData=JSON.parse(data);
          for(let i of this.lpsData){
            if(i.allStepsCompleted != "AllStepCompleted"){
              this.completedFilterData.push(i);
            }
          }
          this.savedReportLps_dataSource = new MatTableDataSource(this.completedFilterData);
          this.completedFilterData = [];
          this.lpsData = [];
          this.savedReportLps_dataSource.paginator = this.savedReportLpsPaginator;
          this.savedReportLps_dataSource.sort = this.savedReportLpsSort;
        });
    }
    else { //viewer
      if(this.currentUser1.assignedBy!=null) {
        this.viewerFilterData=[];
        this.lpsService.retrieveListOfBasicLps(this.currentUser1.assignedBy).subscribe(
          data => {
            this.userData=JSON.parse(data);
            for(let i of this.lpsData){
              if(i.allStepsCompleted != "AllStepCompleted"){
                this.completedFilterData.push(i);
              }
            }
           this.savedReportLps_dataSource = new MatTableDataSource(this.completedFilterData);
           this.completedFilterData = [];
           this.lpsData = [];
           this.savedReportLps_dataSource.paginator = this.savedReportLpsPaginator;
           this.savedReportLps_dataSource.sort = this.savedReportLpsSort;
          });
      } 
    }
        
  }

  continue(basicLpsId: any,clientName: any) {
    this.lpsParent.continue(basicLpsId,clientName);
  } 
}