import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentaddComponent } from '../Company/departmentadd/departmentadd.component';
import { SiteaddComponent } from '../Company/siteadd/siteadd.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientaddComponent } from '../Company/client/clientadd/clientadd.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../model/company';
import { ClientupdateComponent } from '../Company/client/clientupdate/clientupdate/clientupdate.component';
import { User } from '../model/user';
import { ClientService } from '../services/client.service';




@Component({
  selector: 'app-verificationlv',
  templateUrl: './verificationlv.component.html',
  styleUrls: ['./verificationlv.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class VerificationlvComponent implements OnInit {
  displayedColumns1: string[] = ['action', 'clientName', 'inActive', 'createdDate', 'createdBy', 'updatedDate', 'updatedBy'];
  displayedColumns2: string[] = ['action', 'clientName', 'inActive', 'createdDate', 'createdBy', 'updatedDate', 'updatedBy'];
  displayedColumns3: string[] = ['action', 'clientName', 'inActive', 'createdDate', 'createdBy', 'updatedDate', 'updatedBy'];
  dataSource!: MatTableDataSource<Company[]>;
  clientList: any = ['User', 'Viewer', 'Admin'];

  email: String = '';
  clientName: String = '';
  inActive: boolean = false;
  user = new User;


  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  // ThirdFormGroup: FormGroup;
  // fourthFormGroup: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private clientService: ClientService,
    private ChangeDetectorRef: ChangeDetectorRef) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.refresh();
    this.retrieveClientDetails();
  }

  private retrieveClientDetails() {
    this.clientService.retrieveClient(this.email).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(JSON.parse(data));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(clientname: String) {
    this.clientService.deleteClient(this.email, clientname).subscribe(
      data => {
        this.retrieveClientDetails();
      }
    )
    this.refresh();
  }

  addClient() {
    const dialogRef = this.dialog.open(ClientaddComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.email = this.email,
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        this.refresh();
        this.retrieveClientDetails();
      });
  }

  updateClient(clientName: String, inActive: boolean) {
    const dialogRef = this.dialog.open(ClientupdateComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.clientName = clientName;
    dialogRef.componentInstance.inActive = inActive;
    dialogRef.componentInstance.email = this.email;
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  addDepartment() {
    const modalRef = this.modalService.open(DepartmentaddComponent);

  }

  addSite() {
    const modalRef = this.modalService.open(SiteaddComponent);
  }

  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }

}