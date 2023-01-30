import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'src/app/globals.service';
import { LicenselistComponent } from 'src/app/licenselist/licenselist.component';
import { SuperAdminDev } from 'src/environments/environment.dev';
import { SuperAdminProd } from 'src/environments/environment.prod';
import { CustomerDetails } from '../../Risk Assesment Model/customer-details';
import { CustomerDetailsServiceService } from '../../Risk Assessment Services/customer-details-service.service';

@Component({
  selector: 'app-risk-saved-reports',
  templateUrl: './risk-saved-reports.component.html',
  styleUrls: ['./risk-saved-reports.component.css']
})
export class RiskSavedReportsComponent implements OnInit {
  savedReportsRiskAssessmentColumns: string[] = [ 
                                       'organisationName', 
                                       'projectName', 
                                       'contactPersonName',
                                       'address',
                                       'updatedDate', 
                                       'updatedBy',
                                       'continue'];

  savedReportRisk_dataSource!: MatTableDataSource<[]>;
  @ViewChild('savedReportRiskPaginator', { static: false }) savedReportRiskPaginator!: MatPaginator;
  @ViewChild('savedReportRiskSort', {static: false}) savedReportRiskSort!: MatSort;
  
  // @Output("changeTab") changeTab: EventEmitter<any> = new EventEmitter();
  @Output() callSavedMethod: EventEmitter<any> = new EventEmitter();
  email: String ="";
  customerDetailsModel = new CustomerDetails;
  @ViewChild('input') input!: MatInput;
  savedReportSpinner: boolean = false;
  savedReportBody: boolean = true;
  customerData: any=[];
  completedFilterData: any=[];
  filteredData: any = [];
  superAdminArr: any = [];
  superAdminFlag: boolean = false;
  currentUser: any = [];
  currentUser1: any = [];
  selectedIndex: number=0;
  userData: any=[];
  upDateBasic: any=[]
  deleteSuccess: boolean = false;
  deleteSuccessMsg: String = '';
  spinner: boolean=false;
  spinnerValue: String = '';
  noDetailsRec: boolean=false;
  noDetailsRecMsg:String="";
  disablepage: boolean=true;
  enableDelete: boolean = false;
  superAdminDev = new SuperAdminDev();
  superAdminProd = new SuperAdminProd();
  mode: any= 'indeterminate';
  globalError: boolean=false;
  globalErrorMsg: string="";
    
  constructor(
    private router: ActivatedRoute,
    public service: GlobalsService,
    private customerDetailsService :CustomerDetailsServiceService,
    public licenselist: LicenselistComponent
  ) { 
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
   }

  ngOnInit(): void {
    //this.superAdminArr = [];
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    this.retrieveCustomerDetails();
  }

    //filter for final reports
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.savedReportRisk_dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    retrieveCustomerDetails() {
      this.filteredData = [];
      this.completedFilterData=[];
      
      for(let i of this.superAdminDev.riskAdminEmail) {
        if(this.email == i) {
          this.superAdminFlag = true;
          this.enableDelete = true;
        }
      }
  
      for(let i of this.superAdminProd.riskAdminEmail) {
        if(this.email == i) {
          this.superAdminFlag = true;
          this.enableDelete = true;
        }
      }
  
      if(this.superAdminFlag) {
        this.customerDetailsService.retriveAllCustomerDetails().subscribe(
          data => {
            this.customerData=JSON.parse(data);
            for(let i of this.customerData){
              if(i.allStepsCompleted != "AllStepCompleted" && i.status != 'InActive'){
                this.filteredData.push(i);
              }
            }
            this.savedReportRisk_dataSource = new MatTableDataSource(this.filteredData);
            this.filteredData = [];
            this.customerData = [];
            this.savedReportRisk_dataSource.paginator = this.savedReportRiskPaginator;
            this.savedReportRisk_dataSource.sort = this.savedReportRiskSort;
          },
          error=>{
            this.globalError=true;
            this.globalErrorMsg=this.service.globalErrorMsg;
            setTimeout(() => {
              this.globalError=false;
              this.globalErrorMsg="";
            }, 10000);
          });
          this.superAdminFlag = false;
      }
      else {
        this.customerDetailsService.retrieveCustomerDetailsBasedOnUserName(this.email).subscribe(
          data => {
            this.customerData=JSON.parse(data);
            for(let i of this.customerData){
              if(i.allStepsCompleted != "AllStepCompleted" && i.status != 'InActive'){
                this.completedFilterData.push(i);
              }
            }
            this.savedReportRisk_dataSource = new MatTableDataSource(this.completedFilterData);
            this.completedFilterData = [];
            this.customerData = [];
            this.savedReportRisk_dataSource.paginator = this.savedReportRiskPaginator;
            this.savedReportRisk_dataSource.sort = this.savedReportRiskSort;
          },
          error=>{
            this.globalError=true;
            this.globalErrorMsg=this.service.globalErrorMsg;
            setTimeout(() => {
              this.globalError=false;
              this.globalErrorMsg="";
            }, 10000);
          });
      }
    }
  
    continue(riskId: any) {
      if(this.service.triggerMsgForLicense=='riskPage'){
        this.licenselist.editRiskData(riskId);
      }
      else{
        this.spinner=true;
        this.disablepage=false;
        this.spinnerValue = "Please wait, the details are loading!";
        this.callSavedMethod.emit(riskId);
      }
    } 

    deleteBasicRisk(riskId: any) {  
      this.customerDetailsModel.riskId = riskId;
      this.customerDetailsModel.userName = this.email;  
      this.spinner=true;
      this.disablepage=false;
      this.spinnerValue = "Please wait, the details are loading!";
      this.customerDetailsService.deleteCustomerDetails(this.customerDetailsModel).subscribe(
        data => {
          this.deleteSuccess = true;
          this.deleteSuccessMsg = data;
          this.ngOnInit();
          this.spinner=false;
          this.disablepage=true;
          setTimeout(() => {
            this.deleteSuccess = false;
            this.deleteSuccessMsg = '';
            }, 2000);
        },
        error=>{
          this.globalError=true;
          this.globalErrorMsg=this.service.globalErrorMsg;
          setTimeout(() => {
            this.globalError=false;
            this.globalErrorMsg="";
          }, 10000);
        })
    } 

}