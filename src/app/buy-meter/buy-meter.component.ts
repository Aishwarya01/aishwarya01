import {
  Component, 
  EventEmitter,
  Input,
  OnInit,
  AfterViewInit,
  Output,
  ViewChild,
  OnDestroy,
  ElementRef,
  OnChanges,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from '../globals.service';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { DatePipe } from '@angular/common'
import { MatDialog } from '@angular/material/dialog';
import { ObservationService } from '../services/observation.service';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-buy-meter',
  templateUrl: './buy-meter.component.html',
  styleUrls: ['./buy-meter.component.css']
})
export class BuyMeterComponent implements OnInit {

  meterColumns: string[] = [
    'position',
    'model',
    'index',
    'price',
    'image',
    'action',
  ];
  meter_dataSource!: MatTableDataSource<any>;
  @ViewChild('meterPaginator', { static: true }) meterPaginator!: MatPaginator;
  @ViewChild('meterSort', {static: true}) meterSort!: MatSort;

  meterName: String = '';
  email: String = '';
  selectedMeter: any;
  clickedMeter: any;
  value: any;
  clcikeditem: any;
  panelOpenState = false;
  total2Ref: any;
  table1: any;
 
  meterDropdownList: any = ['MZC-20E S.C. Loop Impedance Meter',
    'MZC-304 S.C. Loop Impedance Meter',
    'MZC-306 S.C. Loop Impedance Meter',
    'MZC-310S S.C. Loop Impedance Meter',
    'MZC-320S S.C. Loop Impedance Meter',
    'MZC-330S Short Circuit Loop Impedance Meter',
    'MRP-201 RCD Tester',
    'MPI-502 Multi-function Meter',
    'MPI-506 Multi-function Meter',
    'MPI-507Multi-function Meter',
    'MPI-520 Multi-function Meter',
    'MPI-525 Multi-function',
    'MPI-530 Multi-function Meter',
    'MPI-530-IT Multi-function Meter',
    'MPI-535 Multi-function Meter',
    'MPI-540 Multi-function Meter without clamps F-3A',
    'MPI-540 Multi-function Meter',
    'MPI-540 PV Multi-function Meter',
    'EVSE-01 Adapter for testing vehicle charging stations'
    ];
  meterData: any =[
    { position: 1, model: 'MZC-20E S.C. Loop Impedance Meter', index: 'WMGBMZC20E', price: '75863', image:'assets/img/mzc20e.png' },
    { position: 2, model: 'MZC-304 S.C. Loop Impedance Meter', index: 'WMGBMZC304', price: '89906', image:'assets/img/mzc304.png' },
    { position: 3, model: 'MZC-306 S.C. Loop Impedance Meter', index: 'WMGBMZC306', price: '255413', image:'assets/img/mzc306.png' },
    { position: 4, model: 'MZC-310S S.C. Loop Impedance Meter', index: 'WMGBMZC310', price: '315919', image:'assets/img/Original-green.png' },
    { position: 5, model: 'MZC-320S S.C. Loop Impedance Meter', index: 'WMGBMZC320', price: '381413', image:'assets/img/Original-green.png' },
    { position: 6, model: 'MZC-330S Short Circuit Loop Impedance Meter', index: 'WMGBMZC330', price: '578550', image:'assets/img/Original-green.png' },
    { position: 7, model: 'MRP-201 RCD Tester', index: 'WMGBMRP201', price: '98175', image:'assets/img/Original-green.png' },
    { position: 8, model: 'MPI-502 Multi-function Meter', index: 'WMGBMPI502', price: '111300', image:'assets/img/Original-green.png' },
    { position: 9, model: 'MPI-506 Multi-function Meter', index: 'WMGBMPI506', price: '124425', image:'assets/img/Original-green.png' },
    { position: 10, model: 'MPI-507Multi-function Meter', index: 'WMGBMPI507', price: '168525', image:'assets/img/Original-green.png' },
    { position: 11, model: 'MPI-520 Multi-function Meter', index: 'WMGBMPI520', price: '255281', image:'assets/img/Original-green.png' },
    { position: 12, model: 'MPI-525 Multi-function', index: 'WMGBMPI525', price: '284813', image:'assets/img/Original-green.png' },
    { position: 13, model: 'MPI-530 Multi-function Meter', index: 'WMGBMPI530', price: '312900', image:'assets/img/Original-green.png' },
    { position: 14, model: 'MPI-530-IT Multi-function Meter', index: 'WMGBMPI530IT', price: '334294', image:'assets/img/Original-green.png' },
    { position: 15, model: 'MPI-535 Multi-function Meter', index: 'WMGBMPI535', price: '366056', image:'assets/img/mp535.PNG' },
    { position: 16, model: 'MPI-540 Multi-function Meter without clamps F-3A', index: 'WMGBMPI540NC', price: '373538', image:'assets/img/mpi540.PNG' },
    { position: 17, model: 'MPI-540 Multi-function Meter', index: 'WMGBMPI540', price: '583669', image:'assets/img/mpi540.PNG' },
    { position: 18, model: 'MPI-540 PV Multi-function Meter', index: 'WMGBMPI540PV', price: '653494', image:'assets/img/mpi540.PNG' },
    { position: 19, model: 'EVSE-01 Adapter for testing vehicle charging stations', index: 'WMGBEVSE01', price: '123375', image:'assets/img/Original-green.png' },
];
  value1: any;
  filteredData: any = [];
  
  constructor(private changeDetectorRef: ChangeDetectorRef,
    public service: GlobalsService,
    private modalService: NgbModal,
    private router: ActivatedRoute,
   public datepipe: DatePipe,
  ) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
  }
 
  ngOnInit(): void {
    this.setPagination();
  } 
  // ngOnDestroy() {
  //   if (this.dataSource) { 
  //     this.dataSource.disconnect(); 
  //   }
  // }
  setPagination() {
    this.filteredData=this.meterData;
    this.meter_dataSource = new MatTableDataSource(this.filteredData);
    this.meter_dataSource.paginator = this.meterPaginator;
    this.meter_dataSource.sort = this.meterSort;
  }
  compareProd(contentCompare:any,element:any) {
   this.modalService.open(contentCompare, {
       centered: true, 
       size: 'lg',
      });
     this.clickedMeter = element.model;
     this.clcikeditem=element.index;
     this.value = this.clcikeditem;
    }

    changeMeter(e: any) {
      let changedValue = '';
      if (e.target != undefined) {
        changedValue = e.target.value
      }
      else {
        changedValue = e;
      }
      this.selectedMeter = e.target.value;
      this.value1 = this.selectedMeter;

     // this.table1=this.total2Ref;
    }

    disable(meter: any): boolean {
      return meter === this.clickedMeter;
    }

}