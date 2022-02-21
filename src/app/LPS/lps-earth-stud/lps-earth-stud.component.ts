import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';
import { earthStudReport } from 'src/app/LPS_model/earthStudReport';
import { EarthStudService } from 'src/app/LPS_services/earth-stud.service';
import { LpsMatstepperComponent } from '../lps-matstepper/lps-matstepper.component';
import { LpsWelcomePageComponent } from '../lps-welcome-page/lps-welcome-page.component';

@Component({
  selector: 'app-lps-earth-stud',
  templateUrl: './lps-earth-stud.component.html',
  styleUrls: ['./lps-earth-stud.component.css'],
})
export class LpsEarthStudComponent implements OnInit {

  EarthStudForm!: FormGroup;
  submitted=false;
  earthStudReport = new earthStudReport;
  disable: boolean=false;

  basicLpsId: number = 0;
  ClientName: String='';
  projectName: String='';
  industryType: String='';
  buildingType: String='';
  buildingLength: String='';
  buildingWidth: String='';
  buildingHeight: String='';
  levelOfProtection: String='';
  soilResistivity: String='';

  success: boolean=false;
  successMsg: string="";
  Error: boolean=false;
  errorArr: any=[];
  errorMsg: string="";
  validationError: boolean = false;
  validationErrorMsg: String = '';
  @Output() proceedNext = new EventEmitter<any>();
  flag: boolean = false;
  step7List: any = [];
  selectedIndex = 0;
  isEditable!:boolean
  earthStud: any = [];

  equipotentialBondings: any=[]; 
  interconnectingLPS: any=[];              
  faultProtection: any=[]; 
  typeBearthingsystem: any=[]; 
  mainProtective: any=[]; 
  sizeOfMainProtective: any=[]; 
  supplimentaryProtective: any=[];
  
  constructor(
    private formBuilder: FormBuilder,
    private earthStudService: EarthStudService,
    private modalService: NgbModal, 
    private router: ActivatedRoute,
    private lpsMatstepper: LpsMatstepperComponent,
    private welcome: LpsWelcomePageComponent,
    public service: GlobalsService,

    ) { }

  ngOnInit(): void {
    this.EarthStudForm = this.formBuilder.group({
      earthStud: this.formBuilder.array([this.allEartStud()])
    });
  }

  allEartStud():FormGroup {
    return this.formBuilder.group({
      earthStudDescId: new FormControl(''),
      buildingNumber: new FormControl(''),
      buildingName: new FormControl(''),
      buildingCount: new FormControl(''),
      flag: new FormControl('A'),
      availableEquipotentialBondingOb: new FormControl('', Validators.required),
      availableEquipotentialBondingRem: new FormControl(''),
      numberOfEquipotentialBondingOb: new FormControl('', Validators.required),
      numberOfEquipotentialBondingRem: new FormControl(''),
      sizeOfEarthingConductorOb: new FormControl('', Validators.required),
      sizeOfEarthingConductorRem: new FormControl(''),
      conceptOfEquipotentialBondingOb: new FormControl('', Validators.required),
      conceptOfEquipotentialBondingRem: new FormControl(''),
      mainProtectiveEquipotentialBondingOb: new FormControl('', Validators.required),
      mainProtectiveEquipotentialBondingRem: new FormControl(''),
      sizeOfMainProtectiveOb: new FormControl('', Validators.required),
      sizeOfMainProtectiveRem: new FormControl(''),
      supplimentaryMainProtectiveOb: new FormControl('', Validators.required),
      supplimentaryMainProtectiveRem: new FormControl(''),
      sizeOfSupplimentaryProtectiveOb: new FormControl('', Validators.required),
      sizeOfSupplimentaryProtectiveRem: new FormControl(''),
      earthStudVisibilityOb: new FormControl('', Validators.required),
      earthStudVisibilityRem: new FormControl(''),
      earthStudBendOb: new FormControl('', Validators.required),
      earthStudBendRem: new FormControl(''),
      properBondingRailOb: new FormControl('', Validators.required),
      properBondingRailRem: new FormControl(''),
      physicalDamageStudOb: new FormControl('', Validators.required),
      physicalDamageStudRem: new FormControl(''),
      continutyExistaEarthOb: new FormControl('', Validators.required),
      continutyExistaEarthRem: new FormControl('')
    });
  }

  createGroup(item: any): FormGroup {
    return this.formBuilder.group({
      earthStudDescId: new FormControl({disabled: false, value: item.earthStudDescId}),
      buildingNumber: new FormControl({disabled: false, value: item.buildingNumber}),
      buildingName: new FormControl({disabled: false, value: item.buildingName}),
      buildingCount: new FormControl({disabled: false, value: item.buildingCount}),
      flag: new FormControl({disabled: false, value: item.flag}),
      availableEquipotentialBondingOb: new FormControl(new FormControl({disabled: false, value: item.availableEquipotentialBondingOb}), Validators.required),
      availableEquipotentialBondingRem: new FormControl(new FormControl({disabled: false, value: item.availableEquipotentialBondingRem})),
      numberOfEquipotentialBondingOb: new FormControl(new FormControl({disabled: false, value: item.numberOfEquipotentialBondingOb}), Validators.required),
      numberOfEquipotentialBondingRem: new FormControl(new FormControl({disabled: false, value: item.numberOfEquipotentialBondingRem})),
      sizeOfEarthingConductorOb: new FormControl(new FormControl({disabled: false, value: item.sizeOfEarthingConductorOb}), Validators.required),
      sizeOfEarthingConductorRem: new FormControl(new FormControl({disabled: false, value: item.sizeOfEarthingConductorRem})),
      conceptOfEquipotentialBondingOb: new FormControl(new FormControl({disabled: false, value: item.conceptOfEquipotentialBondingOb}), Validators.required),
      conceptOfEquipotentialBondingRem: new FormControl(new FormControl({disabled: false, value: item.conceptOfEquipotentialBondingRem})),
      mainProtectiveEquipotentialBondingOb: new FormControl(new FormControl({disabled: false, value: item.mainProtectiveEquipotentialBondingOb}), Validators.required),
      mainProtectiveEquipotentialBondingRem: new FormControl(new FormControl({disabled: false, value: item.mainProtectiveEquipotentialBondingRem})),
      sizeOfMainProtectiveOb: new FormControl(new FormControl({disabled: false, value: item.sizeOfMainProtectiveOb}), Validators.required),
      sizeOfMainProtectiveRem: new FormControl(new FormControl({disabled: false, value: item.sizeOfMainProtectiveRem})),
      supplimentaryMainProtectiveOb: new FormControl(new FormControl({disabled: false, value: item.supplimentaryMainProtectiveOb}), Validators.required),
      supplimentaryMainProtectiveRem: new FormControl(new FormControl({disabled: false, value: item.supplimentaryMainProtectiveRem})),
      sizeOfSupplimentaryProtectiveOb: new FormControl(new FormControl({disabled: false, value: item.sizeOfSupplimentaryProtectiveOb}), Validators.required),
      sizeOfSupplimentaryProtectiveRem: new FormControl(new FormControl({disabled: false, value: item.sizeOfSupplimentaryProtectiveRem})),
      earthStudVisibilityOb: new FormControl(new FormControl({disabled: false, value: item.earthStudVisibilityOb}), Validators.required),
      earthStudVisibilityRem: new FormControl(new FormControl({disabled: false, value: item.earthStudVisibilityRem})),
      earthStudBendOb: new FormControl(new FormControl({disabled: false, value: item.earthStudBendOb}), Validators.required),
      earthStudBendRem: new FormControl(new FormControl({disabled: false, value: item.earthStudBendRem})),
      properBondingRailOb: new FormControl(new FormControl({disabled: false, value: item.properBondingRailOb}), Validators.required),
      properBondingRailRem: new FormControl(new FormControl({disabled: false, value: item.properBondingRailRem})),
      physicalDamageStudOb: new FormControl(new FormControl({disabled: false, value: item.physicalDamageStudOb}), Validators.required),
      physicalDamageStudRem: new FormControl(new FormControl({disabled: false, value: item.physicalDamageStudRem})),
      continutyExistaEarthOb: new FormControl(new FormControl({disabled: false, value: item.continutyExistaEarthOb}), Validators.required),
      continutyExistaEarthRem: new FormControl(new FormControl({disabled: false, value: item.continutyExistaEarthRem}))
    })
}

  overAllEartStudControl(): AbstractControl[] {
    return (<FormArray>this.EarthStudForm.get('earthStud')).controls;
  }

  reset(){
    this.EarthStudForm.reset();
  }

  retrieveDetailsfromSavedReports(userName: any,basicLpsId: any,clientName: any,data: any){
      // this.service.lvClick=1;
      debugger
      this.step7List = data.earthStudReport;
      this.earthStudReport.basicLpsId = this.step7List.basicLpsId;
      this.earthStudReport.earthStudReportId = this.step7List.earthStudReportId;
      this.earthStudReport.userName = this.step7List.userName;
      this.earthStudReport.createdBy = this.step7List.createdBy;
      this.earthStudReport.createdDate = this.step7List.createdDate;
      for(let i of this.step7List.earthStudDescription)
      this.EarthStudForm.patchValue({
        earthStud: [i],  
      });
      this.flag=true;
  }

  retrieveDetailsfromEarthStud(userName: any,basicLpsId: any,clientName: any,data: any){
    debugger
      this.step7List = JSON.parse(data);
      this.earthStudReport.basicLpsId = this.step7List[0].basicLpsId;
      this.earthStudReport.earthStudReportId = this.step7List[0].earthStudReportId;
      this.earthStudReport.userName = this.step7List[0].userName;
      this.earthStudReport.createdBy = this.step7List[0].createdBy;
      this.earthStudReport.createdDate = this.step7List[0].createdDate;
      this.flag=true;
     for(let i of this.step7List[0].earthStudDescription)
      this.EarthStudForm.patchValue({
        earthStud: [i],  
      });
  }

    populateData(earthStudDescription:any){
      debugger
      let index = 0;
      for(let item of earthStudDescription){
        this.earthStud.push(this.createGroup(item));
        this.dropDown(item.availableEquipotentialBondingOb,null,index);
        this.EarthStudForm.setControl('earthStud', this.formBuilder.array(this.earthStud || []))
      }
    }

    // Only Accept numbers
    keyPressNumbers(event:any) {
      var charCode = (event.which) ? event.which : event.keyCode;
          // Only Numbers 0-9
      if ((charCode < 48 || charCode > 57)) {
        event.preventDefault();
        return false;
        } else {
            return true;
      }
    }

  onSubmit(flag: any){
    this.submitted=true;
    if(this.EarthStudForm.invalid){return}

  //  this.earthStudReport=this.EarthStudForm.value
    this.earthStudReport.userName = this.router.snapshot.paramMap.get('email') || '{}';;
    this.earthStudReport.basicLpsId = this.basicLpsId; 
    this.earthStudReport.earthStudDescription = this.EarthStudForm.value.earthStud;
    
    // for(let item of this.earthStudReport.earthStudDescription){}
    // if(this.earthStudReport.earthStudDescription.availableEquipotentialBondingOb == "NO"){
    // }
    if (!this.validationError) {
      if(flag) {
        if(this.EarthStudForm.dirty && this.EarthStudForm.touched){ 
        this.earthStudService.updateEarthStud(this.earthStudReport).subscribe(
          (data) => {
            this.success = true;
            this.successMsg = data;
            this.EarthStudForm.markAsPristine();
            this.service.lvClick=0;
            this.service.logoutClick=0;
            this.service.windowTabClick=0;
            this.proceedNext.emit(true);
          }, 
          (error) => {
            this.Error = true;
            this.errorArr = [];
            this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.errorArr.message;
            this.proceedNext.emit(false);
          }
        )
      }
      else{
        if(this.isEditable){
          this.success = true;
          this.proceedNext.emit(true);
        }else{
          this.proceedNext.emit(true);
        }
      }
      }
      else {
        this.earthStudService.saveEarthStud(this.earthStudReport).subscribe(
          (data) => {
            
            this.success = true;
            this.successMsg = data;
            this.disable = true;
            this.retriveStud();
            this.proceedNext.emit(true);
            // setTimeout(() => {
            //   this.lpsMatstepper.changeTab1(2);
            //  }, 3000);
             this.service.lvClick=0;
            this.service.logoutClick=0;
            this.service.windowTabClick=0;
          },
          (error) => {
            this.Error = true;
            this.errorArr = [];
            this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.errorArr.message;
            this.proceedNext.emit(false);
          });
      }
    }
  }
  
  get f() {
    return this.EarthStudForm.controls;
  }

  onChangeForm(event:any){
    if(!this.EarthStudForm.invalid){
      if(this.EarthStudForm.dirty){
        this.validationError=false;
        this.service.lvClick=1;
        this.service.logoutClick=1;
        this.service.windowTabClick=1;
      }
      else{
        this.validationError=false;
        this.service.lvClick=0;
        this.service.logoutClick=0;
        this.service.windowTabClick=0;
      }
     }
     else {
      this.service.lvClick=1;
      this.service.logoutClick=1;
      this.service.windowTabClick=1;
     }
  }
  onKeyForm(event: KeyboardEvent) { 
   if(!this.EarthStudForm.invalid){ 
    if(this.EarthStudForm.dirty){
      this.validationError=false;
      this.service.lvClick=1;
      this.service.logoutClick=1;
      this.service.windowTabClick=1;
    }
    else{
      this.validationError=false;
      this.service.lvClick=0;
      this.service.logoutClick=0;
      this.service.windowTabClick=0;
    }
   }
   else {
    this.service.lvClick=1;
    this.service.logoutClick=1;
    this.service.windowTabClick=1;
   }
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

  gotoNextModal(content: any,contents:any) {
     if (this.EarthStudForm.invalid) {
       this.validationError = true;
      
       this.validationErrorMsg = 'Please check all the fields';
       setTimeout(() => {
        this.validationError = false;
       }, 3000);
       return;
     }

     if (this.basicLpsId == 0) {
      this.validationError = true;
      this.validationErrorMsg = 'Basics Form is Required, Please fill';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
      //  Update and Success msg will be showing
      if(this.EarthStudForm.dirty && this.EarthStudForm.touched){
        this.modalService.open(content, { centered: true,backdrop: 'static' });
     }
    //  For Dirty popup
     else{
      this.modalService.open(contents, { centered: true,backdrop: 'static' });
     }
  }

  retriveStud(){
    this.earthStudService.retrieveEarthStud(this.router.snapshot.paramMap.get('email') || '{}',this.basicLpsId).subscribe(
      data => {
        this.retrieveDetailsfromEarthStud(this.earthStudReport.userName,this.basicLpsId,this.ClientName,data);
      },
      error=>{
      }
    );  
  }

  dropDown(event: any,a:any,index:any){
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
      if(changedValue== 'NO'){

        this.equipotentialBondings[index]=false;
        this.interconnectingLPS[index]=false;  
        this.faultProtection[index]=false; 
        this.mainProtective[index]=false; 
        this.sizeOfMainProtective[index]=false; 
        this.supplimentaryProtective[index]=false; 

        if(a != null){
          a.controls.numberOfEquipotentialBondingOb.clearValidators();
          a.controls.numberOfEquipotentialBondingOb.updateValueAndValidity();

          a.controls.sizeOfEarthingConductorOb.clearValidators();
          a.controls.sizeOfEarthingConductorOb.updateValueAndValidity();

          a.controls.conceptOfEquipotentialBondingOb.clearValidators();
          a.controls.conceptOfEquipotentialBondingOb.updateValueAndValidity();

          a.controls.mainProtectiveEquipotentialBondingOb.clearValidators();
          a.controls.mainProtectiveEquipotentialBondingOb.updateValueAndValidity();

          a.controls.sizeOfMainProtectiveOb.clearValidators();
          a.controls.sizeOfMainProtectiveOb.updateValueAndValidity();

          a.controls.supplimentaryMainProtectiveOb.clearValidators();
          a.controls.supplimentaryMainProtectiveOb.updateValueAndValidity();
        }

      }

        else{
          
          this.equipotentialBondings[index]=true;
          this.interconnectingLPS[index]=true;  
          this.faultProtection[index]=true; 
          this.mainProtective[index]=true; 
          this.sizeOfMainProtective[index]=true; 
          this.supplimentaryProtective[index]=true; 
  
          if(a != null){
            a.controls.numberOfEquipotentialBondingOb.clearValidators();
            a.controls.numberOfEquipotentialBondingOb.updateValueAndValidity();
  
            a.controls.sizeOfEarthingConductorOb.clearValidators();
            a.controls.sizeOfEarthingConductorOb.updateValueAndValidity();
  
            a.controls.conceptOfEquipotentialBondingOb.clearValidators();
            a.controls.conceptOfEquipotentialBondingOb.updateValueAndValidity();
  
            a.controls.mainProtectiveEquipotentialBondingOb.clearValidators();
            a.controls.mainProtectiveEquipotentialBondingOb.updateValueAndValidity();
  
            a.controls.sizeOfMainProtectiveOb.clearValidators();
            a.controls.sizeOfMainProtectiveOb.updateValueAndValidity();
  
            a.controls.supplimentaryMainProtectiveOb.clearValidators();
            a.controls.supplimentaryMainProtectiveOb.updateValueAndValidity();
          }
      }
  }

}



