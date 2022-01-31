import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmcFacilityData } from 'src/app/EMC_Model/emc-facility-data';
import { EmcFacilityDataService } from 'src/app/EMC_Services/emc-facility-data.service';
import { GlobalsService } from 'src/app/globals.service';

@Component({
  selector: 'app-emc-facility-data',
  templateUrl: './emc-facility-data.component.html',
  styleUrls: ['./emc-facility-data.component.css']
})
export class EmcFacilityDataComponent implements OnInit {

  buildingType: String[] = ['Industrial', 'Rural', 'Residential', 'Commercial', 'Small Town', 'Urban', 'Others'];
  buildingConstruction: String[] = ['Wood', 'Brick', 'Brick with RCC Columns And Slabs ', 'Steel (PEB)'];
  dedicatedRoomForSafety: String[] = ['Non Dedicated Room', 'Others'];
  floorMaterisl: String[] = ['Sealed', 'Coated', 'Covered'];
  utilisation: String[] = ['Supply Plenum', 'Exhause Plenum', 'Dead Space'];
  external: String[] = ['Single Pane', 'Double Pane', 'Tripple Pane', 'Reflective Anodised'];
  windowCovering: String[] = ['Drapes', 'Curtains', 'Shades', 'Blinds'];

  EMCFacilityForm!: FormGroup;

  emcFacilityData = new EmcFacilityData();
  flag: boolean = false;
  floorCoveringArr!: FormArray;
  errorArr: any = [];
  success: boolean = false;
  Error: boolean = false;
  submitted=false;
  successMsg: string = "";
  errorMsg: string = "";
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string="";
  validationError: boolean =false;
  validationErrorMsg: String ="";
  email: String;
  step1List: any;
  arr2: any;
  finalSpinner: boolean = true;
  popup: boolean = false;
  modalReference: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    public service: GlobalsService,
    private modalService: NgbModal,
    private emcFacilityDataService: EmcFacilityDataService) {

    this.email = this.router.snapshot.paramMap.get('email') || '{}';
  }

  ngOnInit(): void {
    this.EMCFacilityForm = this.formBuilder.group({

      blType: ['', Validators.required],
      blOtherDescription: ['', Validators.required],
      bcType: ['', Validators.required],
      bcNoOfFloors: ['', Validators.required],
      bcRoomFloorLocation: ['', Validators.required],
      bcBuildingPrimaryUse: ['', Validators.required],
      bcOtherUses: ['', Validators.required],
      rlInteriorRoom: ['', Validators.required],
      rlExteriorRoom: ['', Validators.required],
      rlSolidExterior: ['', Validators.required],
      rlWindowedExterior: ['', Validators.required],
      rlWindsFace: ['', Validators.required],
      ruDedicated: ['', Validators.required],
      ruOtherDesc: ['', Validators.required],
      rmHeightTrueFloor: ['', Validators.required],
      rmHeightFalseFloor: ['', Validators.required],
      rmWidth: ['', Validators.required],
      rmLength: ['', Validators.required],
      rmMaxFloor: ['', Validators.required],
      ftRaisedFloor: ['', Validators.required],
      ftAirSupply: ['', Validators.required],
      ftHeight: ['', Validators.required],
      ftAirFlowObservation: ['', Validators.required],
      ftDescription: ['', Validators.required],
      ftAirGrillDampers: ['', Validators.required],
      ftCableHole: ['', Validators.required],
      ftPedestals: ['', Validators.required],
      ftGrids: ['', Validators.required],
      ftBolted: ['', Validators.required],
      ftWelded: ['', Validators.required],
      ftEarthingDesc: ['', Validators.required],
      ftTrueFloorMaterial: ['', Validators.required],
      ftDescribe: ['', Validators.required],
      ftCleanliness: ['', Validators.required],
      ftOtherDescription: ['', Validators.required],

      floorCoveringArr: this.formBuilder.array([this.createFloorDescriptionArr()])

    });
  }
  private createFloorDescriptionArr() {

    return this.formBuilder.group({
      floorCoveringId :[''],
      fcType: ['', Validators.required],
      fcManufactor: ['', Validators.required],
      fcDescription: ['', Validators.required],
      fcWoven: ['', Validators.required],
      fcChemical: ['', Validators.required],
      fcNone: ['', Validators.required],
      fcOtherDecription: ['', Validators.required],
      wallType: ['', Validators.required],
      wallMaterial: ['', Validators.required],
      wallCoveringType: ['', Validators.required],
      wallHumidity: ['', Validators.required],
      wallSealing: ['', Validators.required],
      wallDesc: ['', Validators.required],
      ccFalseDesc: ['', Validators.required],
      ccFalseHumidity: ['', Validators.required],
      ccFalseHeight: ['', Validators.required],
      ccUtilisation: ['', Validators.required],
      ccTrueDesc: ['', Validators.required],
      ccTrueHumidity: ['', Validators.required],
      ccSurfaceDesc: ['', Validators.required],
      windowsExternal: ['', Validators.required],
      windowsDescription: ['', Validators.required],
      windowsCovering: ['', Validators.required],
      windowsOtherDesc: ['', Validators.required],
      windowsInternalDesc: ['', Validators.required],
      doorsMaterial: ['', Validators.required],
      doorsNumber: ['', Validators.required],
      doorsWidth: ['', Validators.required],
      doorsHeight: ['', Validators.required],
      doorsCloserMechanish: ['', Validators.required],
      doorsQualitySealing: ['', Validators.required],
      doorsDesc: ['', Validators.required],

    });

  }

  getfloorCoveringarrControl(): AbstractControl[] {
    return (<FormArray>this.EMCFacilityForm.get('floorCoveringArr')).controls
  }


  retriveFacilityData(userName: any, emcId: any, data: any) {
    this.flag = true;
    this.step1List = JSON.parse(data);
    this.emcFacilityData.userName = userName;
    this.emcFacilityData.facilityDataId = this.step1List[0].facilityDataId;
    this.emcFacilityData.emcId = emcId;
    this.emcFacilityData.blType = this.step1List[0].blType;
    this.emcFacilityData.blOtherDescription = this.step1List[0].blOtherDescription;
    this.emcFacilityData.bcType = this.step1List[0].bcType;
    this.emcFacilityData.bcNoOfFloors = this.step1List[0].bcNoOfFloors;
    this.emcFacilityData.bcRoomFloorLocation = this.step1List[0].bcRoomFloorLocation;
    this.emcFacilityData.bcBuildingPrimaryUse = this.step1List[0].bcBuildingPrimaryUse;
    this.emcFacilityData.bcOtherUses = this.step1List[0].bcOtherUses;
    this.emcFacilityData.rlInteriorRoom = this.step1List[0].rlInteriorRoom;
    this.emcFacilityData.rlExteriorRoom = this.step1List[0].rlExteriorRoom;
    this.emcFacilityData.rlSolidExterior = this.step1List[0].rlSolidExterior;
    this.emcFacilityData.rlWindowedExterior = this.step1List[0].rlWindowedExterior;
    this.emcFacilityData.rlWindsFace = this.step1List[0].rlWindsFace;
    this.emcFacilityData.ruDedicated = this.step1List[0].ruDedicated;
    this.emcFacilityData.ruOtherDesc = this.step1List[0].ruOtherDesc;
    this.emcFacilityData.rmHeightTrueFloor = this.step1List[0].rmHeightTrueFloor;
    this.emcFacilityData.rmHeightFalseFloor = this.step1List[0].rmHeightFalseFloor;
    this.emcFacilityData.rmWidth = this.step1List[0].rmWidth;
    this.emcFacilityData.rmLength = this.step1List[0].rmLength;
    this.emcFacilityData.rmMaxFloor = this.step1List[0].rmMaxFloor;
    this.emcFacilityData.ftRaisedFloor = this.step1List[0].ftRaisedFloor;
    this.emcFacilityData.ftAirSupply = this.step1List[0].ftAirSupply;
    this.emcFacilityData.ftHeight = this.step1List[0].ftHeight;
    this.emcFacilityData.ftAirFlowObservation = this.step1List[0].ftAirFlowObservation;
    this.emcFacilityData.ftDescription = this.step1List[0].ftDescription;
    this.emcFacilityData.ftAirGrillDampers = this.step1List[0].ftAirGrillDampers;
    this.emcFacilityData.ftCableHole = this.step1List[0].ftCableHole;
    this.emcFacilityData.ftPedestals = this.step1List[0].ftPedestals;
    this.emcFacilityData.ftGrids = this.step1List[0].ftGrids;
    this.emcFacilityData.ftBolted = this.step1List[0].ftBolted;
    this.emcFacilityData.ftWelded = this.step1List[0].ftWelded;
    this.emcFacilityData.ftEarthingDesc = this.step1List[0].ftEarthingDesc;
    this.emcFacilityData.ftTrueFloorMaterial = this.step1List[0].ftTrueFloorMaterial;
    this.emcFacilityData.ftDescribe = this.step1List[0].ftDescribe;
    this.emcFacilityData.ftCleanliness = this.step1List[0].ftCleanliness;
    this.emcFacilityData.ftOtherDescription = this.step1List[0].ftOtherDescription;
    this.emcFacilityData.createdDate = this.step1List[0].createdDate;
    this.emcFacilityData.createdDate = this.step1List[0].createdDate;
    this.emcFacilityData.createdBy = this.step1List[0].createdBy;
    this.emcFacilityData.updatedBy = this.step1List[0].updatedBy;
    this.emcFacilityData.updatedDate = this.step1List[0].updatedDate;
   for(let i of this.step1List[0].floorCovering ){
    this.EMCFacilityForm.patchValue ({
      floorCoveringArr: [i],
     })
   }
  }
  get f():any {
    return this.EMCFacilityForm.controls;
  }

  onKeyForm(event: KeyboardEvent) { 
    if(!this.EMCFacilityForm.invalid){ 
     if(this.EMCFacilityForm.dirty){
      this.validationError=false;
      //  this.service.lvClick=1;
      //  this.service.logoutClick=1;
      //  this.service.windowTabClick=1;
     }
     else{
       this.validationError=false;
      //  this.service.lvClick=0;
      //  this.service.logoutClick=0;
      //  this.service.windowTabClick=0;
     }
    }
    else {
    //  this.service.lvClick=1;
    //  this.service.logoutClick=1;
    //  this.service.windowTabClick=1;
    }
   } 


   onChangeForm(event:any){
    if(!this.EMCFacilityForm.invalid){
      if(this.EMCFacilityForm.dirty){
        this.validationError=false;
        // this.service.lvClick=1;
        // this.service.logoutClick=1;
        //  this.service.windowTabClick=1;
      }
      else{
        this.validationError=false;
        // this.service.lvClick=0;
        // this.service.logoutClick=0;
        // this.service.windowTabClick=0;
      }
     }
     else {
      // this.service.lvClick=1;
      // this.service.logoutClick=1;
      // this.service.windowTabClick=1;
     }
  }
  closeModalDialog() {
    this.finalSpinner = true;
    this.popup = false;
    if (this.errorMsg != "") {
      this.Error = false;
      // this.service.isCompleted3= false;
      // this.service.isLinear=true;
      this.modalService.dismissAll((this.errorMsg = ""));
    }
    else {
      this.success = false;
      // this.service.isCompleted3= true;
      // this.service.isLinear=false;
      this.modalService.dismissAll((this.successMsg = ""));
      // this.disable = false;

    }
  }

  gotoNextModal(content1: any) {
    if(this.EMCFacilityForm.invalid) {
      this.validationError=true;
      this.validationErrorMsg="Please check all the fields";
  //     setTimeout(()=>{
  //       this.validationError=false;
  //  }, 3000);
      return;
    }
   if(this.EMCFacilityForm.touched || this.EMCFacilityForm.untouched){
    this.modalReference = this.modalService.open(content1, {
       centered: true, 
       size: 'md',
       backdrop: 'static'
      })
   }
   if(this.EMCFacilityForm.dirty && this.EMCFacilityForm.touched){ //update
    this.modalService.open(content1, { centered: true,backdrop: 'static'});
    this.modalReference.close();
   }
  }
  saveFacilityData(flag: any) {

     this.submitted=true;
    if(this.EMCFacilityForm.invalid) {
      return;
    }
    this.emcFacilityData.userName = "sivaraju";
    if (!flag) {
      this.emcFacilityData.emcId = 88;
    }
  
    this.floorCoveringArr = this.EMCFacilityForm.get('floorCoveringArr') as FormArray;
    this.emcFacilityData.floorCovering = this.EMCFacilityForm.value.floorCoveringArr;
    if(flag) {
      if(this.EMCFacilityForm.dirty){
      this.emcFacilityDataService
        .upDateFacilityData(this.emcFacilityData)
        .subscribe(
          (data: any) => {
            this.finalSpinner = false;
            this.popup = true;
            this.success = true;
            this.successMsg = data;

          },
          (error: any) => {
            this.finalSpinner = false;
            this.popup = true;
            this.Error = true;
            this.errorArr = [];
            this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.errorArr.message;

          });
    }
  }

    else {
      this.emcFacilityDataService
        .addFacilityData(this.emcFacilityData)
        .subscribe(
          (data: any) => {
            this.finalSpinner = false;
            this.popup = true;
            this.success = true;
            this.successMsg = data;
            this.emcFacilityDataService
              .retrieveFacilityData(this.emcFacilityData.userName, this.emcFacilityData.emcId)
              .subscribe(
                (data: any) => {
                  this.retriveFacilityData(this.emcFacilityData.userName, this.emcFacilityData.emcId, data);
                },
                (error: any) => {

                });
          },
          (error: any) => {
            this.finalSpinner = false;
            this.popup = true;
            this.Error = true;
            this.errorArr = [];
            this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.errorArr.message;

          })
    }
  }

}

