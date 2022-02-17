import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationBoxComponent } from 'src/app/confirmation-box/confirmation-box.component';
import { GlobalsService } from 'src/app/globals.service';
import { earthingReport } from 'src/app/LPS_model/earthingReport';
import { LpsEarthing } from 'src/app/LPS_services/lps-earthing';
import { LpsMatstepperComponent } from '../lps-matstepper/lps-matstepper.component';

@Component({
  selector: 'app-lps-earthing',
  templateUrl: './lps-earthing.component.html',
  styleUrls: ['./lps-earthing.component.css']
})
export class LpsEarthingComponent implements OnInit {

  earthingForm!: FormGroup;
  earthingReport = new earthingReport;
  submitted=false;
  lpsEarthingService;
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
  arr1: any = [];
  arr2: any = [];
  arr3: any = [];
  arr4: any = [];
  step4List: any = [];
  flag: boolean = false;

  descriptionArr!: FormArray;
  ClampsArr!: FormArray;
  chamberArr!: FormArray;
  earthingArr!: FormArray;
  earthing!: FormArray;
  earthingDescriptionList!: FormArray;
  earthingLpsDescription!: FormArray;
  earthElectrodeTesting!: FormArray;
  earthElectrodeTestingArr!: FormArray;
  earthingClamps!: FormArray;
  earthingElectrodeChamber!: FormArray;
  earthingSystem!: FormArray;

  earthingDescriptionListArr: any = [];
  descriptionPushArr: any = [];
  ClampsPushArr: any = [];
  chamberPushArr: any = [];
  isEditable!:boolean
  applicableChambers: boolean=false;
  applicableClamps: boolean=false;
  applicableChambersNote: boolean=true;
  applicableClampsNote: boolean=true;
  TypeAEarthingArr: any = [];

  typeAearthingsystem: boolean=false;
  clamps: boolean=false;
  earthelectrodechambers: boolean=false;
  typeBearthingsystem: boolean=false;
  testingofearthelectrodes: boolean=false;
  earthingType: String='';

  constructor(
    private formBuilder: FormBuilder,private dialog: MatDialog,
    private lpsEarthings: LpsEarthing,
    private modalService: NgbModal, 
    private router: ActivatedRoute,
    public service: GlobalsService,

  ) {
    this.lpsEarthingService = lpsEarthings;
  }

  ngOnInit(): void {
    this.earthingForm = this.formBuilder.group({
      earthing: this.formBuilder.array([this.earthingLpsDescriptionForm()])
    });
  }
  earthingLpsDescriptionForm() {
    return this.formBuilder.group({
      buildingNumber:new FormControl('', Validators.required),
      buildingName: new FormControl('', Validators.required),
      earthingTypeInOb: new FormControl('', Validators.required),
      earthingTypeInRem: new FormControl(''),
      bimetallicIssueInOb: new FormControl('', Validators.required),
      bimetallicIssueInRem: new FormControl(''),
      brazingConnectInOb: new FormControl('', Validators.required),
      brazingConnectInRem: new FormControl(''),
      flag: new FormControl('A'),  

      earthingLpsDescription: this.formBuilder.array([this.earthingDescriptionArray()]),
      earthingClamps: this.formBuilder.array([this.earthingClampsArray()]),
      earthingElectrodeChamber: this.formBuilder.array([this.earthingElectrodeChamberArray()]),
      earthingSystem: this.formBuilder.array([this.earthingSystemArray()]),
      earthElectrodeTesting: this.formBuilder.array([this.earthElectrodeTestingArray()])
      
    
      // earthingLpsDescription: this.formBuilder.array([]),
      // earthingClamps: this.formBuilder.array([]),
      // earthingElectrodeChamber: this.formBuilder.array([]),
      // earthingSystem: this.formBuilder.array([]),
      // earthElectrodeTesting: this.formBuilder.array([])
      
    });
  }
  

  earthingDescriptionArray():FormGroup {
    return new FormGroup({
     // earthDescriptionId!:number
      // locationNumber: new FormControl('', Validators.required),
      // locationName: new FormControl('', Validators.required),

      flag: new FormControl('A'),
      soilResistivityInOb: new FormControl('', Validators.required),
      soilResistivityInRem: new FormControl(''),
      earthPitDigOb: new FormControl('', Validators.required),
      earthPitDigRem: new FormControl(''),
      earthElectrodeLesthanDownConductorInOb: new FormControl('', Validators.required),
      earthElectrodeLesthanDownConductorInRem: new FormControl(''),
      connectedEarthTerminalInOb: new FormControl('', Validators.required),
      connectedEarthTerminalInRem: new FormControl(''),
      testJointEarthElectrodeInOb: new FormControl('', Validators.required),
      testJointEarthElectrodeInRem: new FormControl(''),
      
      earthingDescriptionList: this.formBuilder.array([this.earthingDescriptionListForm()]),
      earthelectMaxiDistWallInOb: new FormControl('', Validators.required),
      earthelectMaxiDistWallInRem: new FormControl(''),
      earthelectManimumDistanceWallInOb: new FormControl('', Validators.required),
      earthelectManimumDistanceWallInRem: new FormControl(''),
      earthelectMaxiDistOb: new FormControl('', Validators.required),
      earthelectMaxiDistRem: new FormControl(''),
      earthelectManiDistOb: new FormControl('', Validators.required),
      earthelectManiDistRem: new FormControl(''),
      totalNumberOfElectrodeOb: new FormControl('', Validators.required),
      totalNumberOfElectrodeRem: new FormControl(''),
      inspectedNoOb: new FormControl('', Validators.required),
      inspectedNoRem: new FormControl(''),
      inspectedPassedNoOb: new FormControl('', Validators.required),
      inspectedPassedNoRem: new FormControl(''),
      inspectedFailedNoOb: new FormControl('', Validators.required),
      inspectedFailedNoRem: new FormControl(''),
      
      // grountLevelComponentFilledInOb: new FormControl('', Validators.required),
      // grountLevelComponentFilledInRem: new FormControl(''),
      // earthElectrodeLocationInOb: new FormControl('', Validators.required),
      // earthElectrodeLocationInRem: new FormControl(''),
      // earthElectrodeMaterialInOb: new FormControl('', Validators.required),
      // earthElectrodeMaterialInRem: new FormControl(''),
      // earthElectrodeSizeInOb: new FormControl('', Validators.required),
      // earthElectrodeSizeInRem: new FormControl(''),
      // earthElectrodeLengthingOb: new FormControl('', Validators.required),
      // earthElectrodeLengthingRem: new FormControl(''),
      
    });
  }

  earthingDescriptionListForm():FormGroup {
    return new FormGroup({
      //earthDescriptionListId!:number
      flag: new FormControl(''),
      earthingConductorMaterialInOb: new FormControl('', Validators.required),
      earthingConductorMaterialInRem: new FormControl(''),
      earthElectrodeMaterialInOb: new FormControl('', Validators.required),
      earthElectrodeMaterialInRem: new FormControl(''),
      earthElectrodeTypeInOb: new FormControl('', Validators.required),
      earthElectrodeTypeInRem: new FormControl(''),
      earthElectrodeSizeInOb: new FormControl('', Validators.required),
      earthElectrodeSizeInRem: new FormControl(''),
      earthElectrodeLengthingOb: new FormControl('', Validators.required),
      earthElectrodeLengthingRem: new FormControl(''),
    });
  }


  earthingClampsArray():FormGroup {
    return new FormGroup({
      flag: new FormControl('A'), 
      // locationNumber: new FormControl('', Validators.required), 
      // locationName: new FormControl('', Validators.required), 
      physicalInspectionInOb: new FormControl('', Validators.required),
      psysicalInspectionInRem: new FormControl(''),
      clampsFirmlyOb: new FormControl('', Validators.required),
      clampsFirmlyRem: new FormControl(''),
      interConnectOfEarthClampInOb: new FormControl('', Validators.required),
      interConnectOfEarthClampInRem: new FormControl(''),
      typeOfClampsInOb: new FormControl('', Validators.required),
      typeOfClampsInRem: new FormControl(''),
      materialOfClampsInOb: new FormControl('', Validators.required),
      materialOfClampsInRem: new FormControl(''),
      totalNoClampsInOb: new FormControl('', Validators.required),
      totalNoClampsInRem: new FormControl(''),
      inspectedClampsInOb: new FormControl('', Validators.required),
      inspectedClampsInRem: new FormControl(''),
      inspectionPassedInOb: new FormControl('', Validators.required),
      inspectionPassedInRem: new FormControl(''),
      inspectionFailedInOb: new FormControl('', Validators.required),
      inspectionFailedInRem: new FormControl(''),

    });
  }

  earthingElectrodeChamberArray():FormGroup {
    return new FormGroup({
    flag: new FormControl('A'),
    // locationNumber: new FormControl(null, Validators.required),
    // locationName: new FormControl('', Validators.required),
    physicalInspeOb: new FormControl('', Validators.required),
    physicalInspeRem: new FormControl(''),
    chamberTypeOb: new FormControl('', Validators.required),
    chamberTypeRem: new FormControl(''),
    chamberSizeOb: new FormControl('', Validators.required),
    chamberSizeRem: new FormControl(''),
    maximumWithStandLoadOb: new FormControl('', Validators.required),
    maximumWithStandLoadRem: new FormControl(''),
    chamberLocationOb: new FormControl('', Validators.required),
    chamberLocationRem: new FormControl(''),
    maximumPlacedSoilOb: new FormControl('', Validators.required),
    maximumPlacedSoilRem: new FormControl(''),
    totalChamberNoOb: new FormControl('', Validators.required),
    totalChamberNoRem: new FormControl(''),
    inspectedChamberInOb: new FormControl('', Validators.required),
    inspectedChamberInRem: new FormControl(''),
    inspectionPassedInOb: new FormControl('', Validators.required),
    inspectionPassedInRem: new FormControl(''),
    inspectionFailedInOb: new FormControl('', Validators.required),
    inspectionFailedInRem: new FormControl(''),
       
    });
  }

  earthingSystemArray():FormGroup {
    return new FormGroup({
      
      flag: new FormControl('A'),
      eastOb: new FormControl(null, Validators.required),
      eastRem: new FormControl(''),
      westOb: new FormControl(null, Validators.required),
      westRem: new FormControl(''),
      northOb: new FormControl(null, Validators.required),
      northRem: new FormControl(''),
      southOb: new FormControl(null, Validators.required),
      southRem: new FormControl(''),
      ringWallEarthEastOb: new FormControl(null, Validators.required),
      ringWallEarthEastRem: new FormControl(''),
      ringWallEarthWestOb: new FormControl(null, Validators.required),
      ringWallEarthWestRem: new FormControl(''),
      ringWallEarthNorthOb: new FormControl(null, Validators.required),
      ringWallEarthNorthRem: new FormControl(''),
      ringWallEarthSouthOb: new FormControl(null, Validators.required),
      ringWallEarthSouthRem: new FormControl(''),
      connectedEarthElectrodeOb: new FormControl('', Validators.required),
      connectedEarthElectrodeRem: new FormControl(''),
      jointsMadeBrazingOb: new FormControl('', Validators.required),
      jointsMadeBrazingRem: new FormControl(''),
      materialOfEartElectrodeOb: new FormControl('', Validators.required),
      materialOfEartElectrodeRem: new FormControl(''),
      typeOfEarthElectrodeOb: new FormControl('', Validators.required),
      typeOfEarthElectrodeRem: new FormControl(''),
      sizeOfEarthElectrodeOb: new FormControl('', Validators.required),
      sizeOfEarthElectrodeRem: new FormControl(''),
      maximumDistanceEartElectrodeWalOb: new FormControl(null, Validators.required),
      maximumDistanceEartElectrodeWalRem: new FormControl(''),
      manimumDistanceEartElectrodeWalOb: new FormControl(null, Validators.required),
      manimumDistanceEartElectrodeWalRem: new FormControl(''),

    });
  }
  earthElectrodeTestingArray():FormGroup {
    return new FormGroup({
       serialNo: new FormControl(null),
      flag: new FormControl('A'),
      earthingElectrodeType: new FormControl('', Validators.required),
      earthingElectrodeMaterial: new FormControl('', Validators.required),
      earthingElectrodeSize: new FormControl(null, Validators.required),
      earthingElectrodeDepth: new FormControl(null, Validators.required),
      earthingElectrodeResistance: new FormControl(null, Validators.required),
      earthingElectrodeRemarks!: new FormControl(''),

    });
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

  reset(){
    this.earthingForm.reset();
  }

  retrieveDetailsfromSavedReports(userName: any,basicLpsId: any,clientName: any,data: any){
      // this.service.lvClick=1;

      this.step4List = data.earthingLpsDescription;
      // this.earthingLpsDescription.basicLpsId = basicLpsId;
      // this.earthingLpsDescription.earthingId = this.step4List.earthingId;
      // this.earthingLpsDescription.earthingTypeInOb = this.step4List.earthingTypeInOb;
      // this.earthingLpsDescription.earthingTypeInRem = this.step4List.earthingTypeInRem;
      // this.earthingLpsDescription.bimetallicIssueInOb = this.step4List.bimetallicIssueInOb;
      // this.earthingLpsDescription.bimetallicIssueInRem = this.step4List.bimetallicIssueInRem;
      // this.earthingLpsDescription.brazingConnectInOb = this.step4List.brazingConnectInOb;
      // this.earthingLpsDescription.brazingConnectInRem = this.step4List.brazingConnectInRem;
      this.earthingReport.createdBy = this.step4List.createdBy;
      this.earthingReport.createdDate = this.step4List.createdDate;
      this.earthingReport.userName = this.step4List.userName;
 
      this.populateData();
      this.flag=true;
    }

    populateData() {
      for (let item of this.step4List.earthingDescription) {     
        if(item.flag) {this.arr1.push(this.createGroup(item));}
      }
      for (let item of this.step4List.earthingClamps) {     
        if(item.flag) { this.arr2.push(this.createGroup1(item));}
      }
      for (let item of this.step4List.earthingElectrodeChamber) {     
        if(item.flag)  {this.arr3.push(this.createGroup2(item));}
      }
      for (let item of this.step4List.earthingSystem) { 
        this.arr4.push(this.createGroup3(item));
      }
      
      this.earthingForm.setControl('descriptionArr', this.formBuilder.array(this.arr1 || []))
      this.earthingForm.setControl('ClampsArr', this.formBuilder.array(this.arr2 || []))
      this.earthingForm.setControl('chamberArr', this.formBuilder.array(this.arr3 || []))
      this.earthingForm.setControl('earthingArr', this.formBuilder.array(this.arr4 || []))
      

      this.arr1 = [];
      this.arr2 = [];
      this.arr3 = [];
      this.arr4 = [];
      
    }

    retrieveDetailsfromSavedReports1(userName: any,basicLpsId: any,clientName: any,data: any){
      // this.service.lvClick=1;

      this.step4List = JSON.parse(data);
      this.earthingReport.basicLpsId = basicLpsId;
      // this.earthingLpsDescription.earthingId = this.step4List[0].earthingId;
      // this.earthingLpsDescription.earthingTypeInOb = this.step4List[0].earthingTypeInOb;
      // this.earthingLpsDescription.earthingTypeInRem = this.step4List[0].earthingTypeInRem;
      // this.earthingLpsDescription.bimetallicIssueInOb = this.step4List[0].bimetallicIssueInOb;
      // this.earthingLpsDescription.bimetallicIssueInRem = this.step4List[0].bimetallicIssueInRem;
      // this.earthingLpsDescription.brazingConnectInOb = this.step4List[0].brazingConnectInOb;
      // this.earthingLpsDescription.brazingConnectInRem = this.step4List[0].brazingConnectInRem;
      this.earthingReport.createdBy = this.step4List[0].createdBy;
      this.earthingReport.createdDate = this.step4List[0].createdDate;
      this.earthingReport.userName = this.step4List[0].userName;
      this.populateData1();
      this.flag=true;
    }

    populateData1() {
      for (let item of this.step4List[0].earthingDescription) {     
        if(item.flag) {this.arr1.push(this.createGroup(item));}
      }
      for (let item of this.step4List[0].earthingClamps) {     
        if(item.flag) { this.arr2.push(this.createGroup1(item));}
      }
      for (let item of this.step4List[0].earthingElectrodeChamber) {     
        if(item.flag)  {this.arr3.push(this.createGroup2(item));}
      }
      for (let item of this.step4List[0].earthingSystem) { 
        this.arr4.push(this.createGroup3(item));
      }
      
      this.earthingForm.setControl('descriptionArr', this.formBuilder.array(this.arr1 || []))
      this.earthingForm.setControl('ClampsArr', this.formBuilder.array(this.arr2 || []))
      this.earthingForm.setControl('chamberArr', this.formBuilder.array(this.arr3 || []))
      this.earthingForm.setControl('earthingArr', this.formBuilder.array(this.arr4 || []))
      this.arr1 = [];
      this.arr2 = [];
      this.arr3 = [];
      this.arr4 = [];
      this.step4List=[];
      this.earthingForm.markAsPristine();
    }

    createGroup(item: any): FormGroup {
      return this.formBuilder.group({
        //description arr
      flag: new FormControl({disabled: false, value: item.flag}),
      locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
      locationName: new FormControl({disabled: false, value: item.locationName}),
      earthDescriptionId: new FormControl({disabled: false, value: item.earthDescriptionId}),
      soilResistivityInOb: new FormControl({disabled: false, value: item.soilResistivityInOb}, Validators.required),
      soilResistivityInRem: new FormControl({disabled: false, value: item.soilResistivityInRem}),
      earthPitDigOb: new FormControl({disabled: false, value: item.earthPitDigOb}, Validators.required),
      earthPitDigRem: new FormControl({disabled: false, value: item.earthPitDigRem}),
      earthElectrodeLesthanDownConductorInOb: new FormControl({disabled: false, value: item.earthElectrodeLesthanDownConductorInOb}, Validators.required),
      earthElectrodeLesthanDownConductorInRem: new FormControl({disabled: false, value: item.earthElectrodeLesthanDownConductorInRem}),
      connectedEarthTerminalInOb: new FormControl({disabled: false, value: item.connectedEarthTerminalInOb}, Validators.required),
      connectedEarthTerminalInRem: new FormControl({disabled: false, value: item.connectedEarthTerminalInRem}),
      testJointEarthElectrodeInOb: new FormControl({disabled: false, value: item.testJointEarthElectrodeInOb}, Validators.required),
      testJointEarthElectrodeInRem: new FormControl({disabled: false, value: item.testJointEarthElectrodeInRem}),
      grountLevelComponentFilledInOb: new FormControl({disabled: false, value: item.grountLevelComponentFilledInOb}, Validators.required),
      grountLevelComponentFilledInRem: new FormControl({disabled: false, value: item.grountLevelComponentFilledInRem}),
      earthElectrodeLocationInOb: new FormControl({disabled: false, value: item.earthElectrodeLocationInOb}, Validators.required),
      earthElectrodeLocationInRem: new FormControl({disabled: false, value: item.earthElectrodeLocationInRem}),
      earthElectrodeMaterialInOb: new FormControl({disabled: false, value: item.earthElectrodeMaterialInOb}, Validators.required),
      earthElectrodeMaterialInRem: new FormControl({disabled: false, value: item.earthElectrodeMaterialInRem}),
      earthElectrodeSizeInOb: new FormControl({disabled: false, value: item.earthElectrodeSizeInOb}, Validators.required),
      earthElectrodeSizeInRem: new FormControl({disabled: false, value: item.earthElectrodeSizeInRem}),
      earthElectrodeLengthingOb: new FormControl({disabled: false, value: item.earthElectrodeLengthingOb}, Validators.required),
      earthElectrodeLengthingRem: new FormControl({disabled: false, value: item.earthElectrodeLengthingRem}),
      earthelectMaxiDistWallInOb: new FormControl({disabled: false, value: item.earthelectMaxiDistWallInOb}, Validators.required),
      earthelectMaxiDistWallInRem: new FormControl({disabled: false, value: item.earthelectMaxiDistWallInRem}),
      earthelectManimumDistanceWallInOb: new FormControl({disabled: false, value: item.earthelectManimumDistanceWallInOb}, Validators.required),
      earthelectManimumDistanceWallInRem: new FormControl({disabled: false, value: item.earthelectManimumDistanceWallInRem}),
      earthelectMaxiDistOb: new FormControl({disabled: false, value: item.earthelectMaxiDistOb}, Validators.required),
      earthelectMaxiDistRem: new FormControl({disabled: false, value: item.earthelectMaxiDistRem}),
      earthelectManiDistOb: new FormControl({disabled: false, value: item.earthelectManiDistOb}, Validators.required),
      earthelectManiDistRem: new FormControl({disabled: false, value: item.earthelectManiDistRem}),
      totalNumberOfElectrodeOb: new FormControl({disabled: false, value: item.totalNumberOfElectrodeOb}, Validators.required),
      totalNumberOfElectrodeRem: new FormControl({disabled: false, value: item.totalNumberOfElectrodeRem}),
      inspectedNoOb: new FormControl({disabled: false, value: item.inspectedNoOb}, Validators.required),
      inspectedNoRem: new FormControl({disabled: false, value: item.inspectedNoRem}),
      inspectedPassedNoOb: new FormControl({disabled: false, value: item.inspectedPassedNoOb}, Validators.required),
      inspectedPassedNoRem: new FormControl({disabled: false, value: item.inspectedPassedNoRem}),
      inspectedFailedNoOb: new FormControl({disabled: false, value: item.inspectedFailedNoOb}, Validators.required),
      inspectedFailedNoRem: new FormControl({disabled: false, value: item.inspectedFailedNoRem}),
      });
    }

    createGroup1(item: any): FormGroup {
      return this.formBuilder.group({
        // clamps
        flag: new FormControl({disabled: false, value: item.flag}),
        locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
        locationName: new FormControl({disabled: false, value: item.locationName}),
        earthingClampsId: new FormControl({disabled: false, value: item.earthingClampsId}),
        physicalInspectionInOb: new FormControl({disabled: false, value: item.physicalInspectionInOb}, Validators.required),
        psysicalInspectionInRem: new FormControl({disabled: false, value: item.psysicalInspectionInRem}),
        clampsFirmlyOb: new FormControl({disabled: false, value: item.clampsFirmlyOb}, Validators.required),
        clampsFirmlyRem: new FormControl({disabled: false, value: item.clampsFirmlyRem}),
        interConnectOfEarthClampInOb: new FormControl({disabled: false, value: item.interConnectOfEarthClampInOb}, Validators.required),
        interConnectOfEarthClampInRem: new FormControl({disabled: false, value: item.interConnectOfEarthClampInRem}),
        typeOfClampsInOb: new FormControl({disabled: false, value: item.typeOfClampsInOb}, Validators.required),
        typeOfClampsInRem: new FormControl({disabled: false, value: item.typeOfClampsInRem}),
        materialOfClampsInOb: new FormControl({disabled: false, value: item.materialOfClampsInOb}, Validators.required),
        materialOfClampsInRem: new FormControl({disabled: false, value: item.materialOfClampsInRem}),
        totalNoClampsInOb: new FormControl({disabled: false, value: item.totalNoClampsInOb}, Validators.required),
        totalNoClampsInRem: new FormControl({disabled: false, value: item.totalNoClampsInRem}),
        inspectedClampsInOb: new FormControl({disabled: false, value: item.inspectedClampsInOb}, Validators.required),
        inspectedClampsInRem: new FormControl({disabled: false, value: item.inspectedClampsInRem}),
        inspectionPassedInOb: new FormControl({disabled: false, value: item.inspectionPassedInOb}, Validators.required),
        inspectionPassedInRem: new FormControl({disabled: false, value: item.inspectionPassedInRem}),
        inspectionFailedInOb: new FormControl({disabled: false, value: item.inspectionFailedInOb}, Validators.required),
        inspectionFailedInRem: new FormControl({disabled: false, value: item.inspectionFailedInRem})
      });
    }

    createGroup2(item: any): FormGroup {
      return this.formBuilder.group({
        //chamber
        flag: new FormControl({disabled: false, value: item.flag}),
        locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
        locationName: new FormControl({disabled: false, value: item.locationName}),
        earthingElectrodeChamberId: new FormControl({disabled: false, value: item.earthingElectrodeChamberId}),
        physicalInspeOb: new FormControl({disabled: false, value: item.physicalInspeOb}, Validators.required),
        physicalInspeRem: new FormControl({disabled: false, value: item.physicalInspeRem}),
        chamberTypeOb: new FormControl({disabled: false, value: item.chamberTypeOb}, Validators.required),
        chamberTypeRem: new FormControl({disabled: false, value: item.chamberTypeRem}),
        chamberSizeOb: new FormControl({disabled: false, value: item.chamberSizeOb}, Validators.required),
        chamberSizeRem: new FormControl({disabled: false, value: item.chamberSizeRem}),
        maximumWithStandLoadOb: new FormControl({disabled: false, value: item.maximumWithStandLoadOb}, Validators.required),
        maximumWithStandLoadRem: new FormControl({disabled: false, value: item.maximumWithStandLoadRem}),
        maximumPlacedSoilOb: new FormControl({disabled: false, value: item.maximumPlacedSoilOb}, Validators.required),
        maximumPlacedSoilRem: new FormControl({disabled: false, value: item.maximumPlacedSoilRem}),
        totalChamberNoOb: new FormControl({disabled: false, value: item.totalChamberNoOb}, Validators.required),
        totalChamberNoRem: new FormControl({disabled: false, value: item.totalChamberNoRem}),
        inspectedChamberInOb: new FormControl({disabled: false, value: item.inspectedChamberInOb}, Validators.required),
        inspectedChamberInRem: new FormControl({disabled: false, value: item.inspectedChamberInRem}),
        inspectionPassedInOb: new FormControl({disabled: false, value: item.inspectionPassedInOb}, Validators.required),
        inspectionPassedInRem: new FormControl({disabled: false, value: item.inspectionPassedInRem}),
        inspectionFailedInOb: new FormControl({disabled: false, value: item.inspectionFailedInOb}, Validators.required),
        inspectionFailedInRem: new FormControl({disabled: false, value: item.inspectionFailedInRem})
      });
    }


    createGroup3(item: any): FormGroup {
      return this.formBuilder.group({
        //earthing
        
        earthingSystemId: new FormControl({disabled: false, value: item.earthingSystemId}),
        buriedElectrodeOb: new FormControl({disabled: false, value: item.buriedElectrodeOb}, Validators.required),
        buriedElectrodeRem: new FormControl({disabled: false, value: item.buriedElectrodeRem}),
        depthOfElectrodeOb: new FormControl({disabled: false, value: item.depthOfElectrodeOb}, Validators.required),
        depthOfElectrodeRem: new FormControl({disabled: false, value: item.depthOfElectrodeRem}),
        earthOb: new FormControl({disabled: false, value: item.earthOb}, Validators.required),
        earthRem: new FormControl({disabled: false, value: item.earthRem}),
        westOb: new FormControl({disabled: false, value: item.westOb}, Validators.required),
        westRem: new FormControl({disabled: false, value: item.westRem}),
        northOb: new FormControl({disabled: false, value: item.northOb}, Validators.required),
        northRem: new FormControl({disabled: false, value: item.northRem}),
        southOb: new FormControl({disabled: false, value: item.southOb}, Validators.required),
        southRem: new FormControl({disabled: false, value: item.southRem}),
        ringEarthWallDistanceOb: new FormControl({disabled: false, value: item.ringEarthWallDistanceOb}, Validators.required),
        ringEarthWallDistanceRem: new FormControl({disabled: false, value: item.ringEarthWallDistanceRem}),
        ringWallEarthEastOb: new FormControl({disabled: false, value: item.ringWallEarthEastOb}, Validators.required),
        ringWallEarthEastRem: new FormControl({disabled: false, value: item.ringWallEarthEastRem}),
        ringWallEarthWestOb: new FormControl({disabled: false, value: item.ringWallEarthWestOb}, Validators.required),
        ringWallEarthWestRem: new FormControl({disabled: false, value: item.ringWallEarthWestRem}),
        ringWallEarthNorthOb: new FormControl({disabled: false, value: item.ringWallEarthNorthOb}, Validators.required),
        ringWallEarthNorthRem: new FormControl({disabled: false, value: item.ringWallEarthNorthRem}),
        ringWallEarthSouthOb: new FormControl({disabled: false, value: item.ringWallEarthSouthOb}, Validators.required),
        ringWallEarthSouthRem: new FormControl({disabled: false, value: item.ringWallEarthSouthRem}),
        jointsMadeBrazingOb: new FormControl({disabled: false, value: item.jointsMadeBrazingOb}, Validators.required),
        jointsMadeBrazingRem: new FormControl({disabled: false, value: item.jointsMadeBrazingRem}),
        materialOfEartElectrodeOb: new FormControl({disabled: false, value: item.materialOfEartElectrodeOb}, Validators.required),
        materialOfEartElectrodeRem: new FormControl({disabled: false, value: item.materialOfEartElectrodeRem}),
        sizeOfEarthElectrodeOb: new FormControl({disabled: false, value: item.sizeOfEarthElectrodeOb}, Validators.required),
        sizeOfEarthElectrodeRem: new FormControl({disabled: false, value: item.sizeOfEarthElectrodeRem}),
        maximumDistanceEartElectrodeWalOb: new FormControl({disabled: false, value: item.maximumDistanceEartElectrodeWalOb}, Validators.required),
        maximumDistanceEartElectrodeWalRem: new FormControl({disabled: false, value: item.maximumDistanceEartElectrodeWalRem}),
        manimumDistanceEartElectrodeWalOb: new FormControl({disabled: false, value: item.manimumDistanceEartElectrodeWalOb}, Validators.required),
        manimumDistanceEartElectrodeWalRem: new FormControl({disabled: false, value: item.manimumDistanceEartElectrodeWalRem}),
      });
    }

  overAllEarthingControl(): AbstractControl[] {
    return(<FormArray>this.earthingForm.get('earthing')).controls;
  }

  earthingDescriptionarr(form:any){
    return form.controls.earthingLpsDescription?.controls;
  }

  earthingDescriptionListControls(form:any){
    return form.controls.earthingDescriptionList?.controls;
  }

  earthingClampsarr(form:any){
    return form.controls.earthingClamps?.controls;
  }

  earthElectrodeChambearr(form:any){
    return form.controls.earthingElectrodeChamber?.controls;
  }

  earthingSystemarr(form:any){
    return form.controls.earthingSystem?.controls;
  }

  earthElectrodeTestingarr(form:any){
    return form.controls.earthElectrodeTesting?.controls;
  }
   
  
 
  onSubmit(flag: any) {
    this.submitted=true;
   debugger
    
    if(this.earthingForm.invalid){return}
    this.earthingReport.earthingLpsDescription=this.earthingForm.value.earthing
    this.earthingReport.userName = this.router.snapshot.paramMap.get('email') || '{}';;
    this.earthingReport.basicLpsId = this.basicLpsId;

   
    this.descriptionPushArr = [];
    this.ClampsPushArr = [];
    this.chamberPushArr = [];
    if (!this.validationError) {
      if(flag) {
        if(this.earthingForm.dirty && this.earthingForm.touched){ 
        this.lpsEarthingService.updateEarthingLps(this.earthingReport).subscribe(
          (data) => {
            this.success = true;
            this.successMsg = data;
            this.earthingForm.markAsPristine();
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
          this.success = true;
          this.proceedNext.emit(true);
        }
      }
      }
      else {
        this.lpsEarthingService.saveEarthingDetails(this.earthingReport).subscribe(
          (data) => {
            this.success = true;
            this.successMsg = data;
            this.disable = true;
            this.retriveEarthingDetails();
            this.proceedNext.emit(true);
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
    return this.earthingForm.controls;
  }

  addItemTypeAEarthing(a:any) {
    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '420px',
      maxHeight: '90vh',
      disableClose: true,
    });
    dialogRef.componentInstance.lpsAirTModal = false;
    dialogRef.componentInstance.lpsAirHModal = false;
    dialogRef.componentInstance.lpsTypeEModal = true;
    
    dialogRef.componentInstance.confirmBox.subscribe(data=>{
      if(data) {
        this.earthingDescriptionList = a.controls.earthingDescriptionList as FormArray;
        this.earthingDescriptionList.push(this.earthingDescriptionListForm());
      }
      else{
        return;
      }
    })
  }

  addElectrodeTesting(a:any){
    this.earthElectrodeTesting = a.controls.earthElectrodeTesting as FormArray;
        this.earthElectrodeTesting.push(this.earthElectrodeTestingArray());
  }

 // earthingDescriptionList: this.formBuilder.array([this.earthingDescriptionArray()]),
  removeItemTypeAEarthing(a: any,x:any) {
    this.earthingForm.markAsTouched();
    this.earthElectrodeTestingArr = a.controls.earthElectrodeTesting as FormArray;
    this.earthElectrodeTestingArr.removeAt(x);
    this.earthingForm.markAsDirty();
  }

  ElectrodeTesting(a: any,x:any) {
    this.earthingForm.markAsTouched();
    this.earthingDescriptionListArr = a.controls.earthingDescriptionList as FormArray;
    this.earthingDescriptionListArr.removeAt(x);
    this.earthingForm.markAsDirty();
  }
  
  createTypeAEarthingIteration()  : FormGroup {
    return this.formBuilder.group({
      grountLevelComponentFilledInOb: new FormControl('', Validators.required),
      grountLevelComponentFilledInRem: new FormControl(''),
      earthElectrodeLocationInOb: new FormControl('', Validators.required),
      earthElectrodeLocationInRem: new FormControl(''),
      earthElectrodeMaterialInOb: new FormControl('', Validators.required),
      earthElectrodeMaterialInRem: new FormControl(''),
      earthElectrodeSizeInOb: new FormControl('', Validators.required),
      earthElectrodeSizeInRem: new FormControl(''),
      earthElectrodeLengthingOb: new FormControl('', Validators.required),
      earthElectrodeLengthingRem: new FormControl(''),

      // holderTypeOb: new FormControl('', Validators.required),
      // holderTypeRe: new FormControl('', Validators.required),
      // materailOfHolderOb: new FormControl('', Validators.required),
      // materailOfHolderRem: new FormControl('', Validators.required),
      // totalHolderNoOb: new FormControl('', Validators.required),
      // totalHolderNoRe: new FormControl('', Validators.required),
      // holderInspNoOb: new FormControl('', Validators.required),
      // holderInspNoRe: new FormControl('', Validators.required),
      // holderInspPassedNoOb: new FormControl('', Validators.required),
      // holderInspPassedNoRe: new FormControl('', Validators.required),
      // holderInspFailedNoOb: new FormControl('', Validators.required),
      // holderInspFailedNoRe: new FormControl('', Validators.required),
      flag: new FormControl('true'),
    });
  }
  getTypeAEarthingControls(form:any) {
    return form.controls.getTypeAEarthingControls?.controls;
  }
  onChangeClamps(event: any,a:any) {
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
    if (changedValue == 'Not applicable') {
      this.applicableClamps=false;
      this.applicableClampsNote=true;
      for(let y in a.controls){
        console.log(y);
        a.controls[y].clearValidators();
        a.controls[y].updateValueAndValidity();
      }
     // a.controls['physicalInspectionOb'].clearValidators();
     // a.controls['physicalInspectionOb'].updateValueAndValidity();

    }
    else{
      this.applicableClamps=true;
      this.applicableClampsNote=false;
      for(let y in a.controls){
        if(y.indexOf("Rem") == -1 || y == "flag" ){
          console.log(y);
          a.controls[y].setValidators([Validators.required]);
          a.controls[y].updateValueAndValidity();
          }
      }
     // a.controls['physicalInspectionOb'].setValidators([Validators.required]);
      //a.controls['physicalInspectionOb'].updateValueAndValidity();
   
    }
  }
  onChangeChambers(event: any,a:any) {
    debugger
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
    if (changedValue == 'Not applicable') {
      this.applicableChambers=false;
      this.applicableChambersNote=true;
      for(let y in a.controls){
        console.log(y);
        a.controls[y].clearValidators();
        a.controls[y].updateValueAndValidity();
      }
     // a.controls['physicalInspectionOb'].clearValidators();
     // a.controls['physicalInspectionOb'].updateValueAndValidity();

    }
    else{
      this.applicableChambers=true;
      this.applicableChambersNote=false;
      for(let y in a.controls){
        if(y.indexOf("Rem") == -1 || y == "flag"){
        console.log(y);
        a.controls[y].setValidators([Validators.required]);
        a.controls[y].updateValueAndValidity();
        }
      }
      
     // a.controls['physicalInspectionOb'].setValidators([Validators.required]);
      //a.controls['physicalInspectionOb'].updateValueAndValidity();
   
    }
  }
 onChangeForm(event:any){
    if(!this.earthingForm.invalid){
      if(this.earthingForm.dirty){
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
   if(!this.earthingForm.invalid){ 
    if(this.earthingForm.dirty){
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
     
       if (this.earthingForm.invalid) {
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
      if(this.earthingForm.dirty && this.earthingForm.touched){
        this.modalService.open(content, { centered: true,backdrop: 'static' });
     }
    //  For Dirty popup
     else{
      this.modalService.open(contents, { centered: true,backdrop: 'static' });
     }
    }

    retriveEarthingDetails(){
      this.lpsEarthings.retrieveEarthingLps(this.router.snapshot.paramMap.get('email') || '{}',this.basicLpsId).subscribe(
        data => {
          this.retrieveDetailsfromSavedReports1(this.earthingReport.userName,this.basicLpsId,this.ClientName,data);
        },
        error=>{
        }
      );  
    }

   dosomethingRetriveEarthingDetails(userName:any,basicLpsId:any){
      this.lpsEarthings.retrieveEarthingLps(userName,basicLpsId).subscribe(
        data => {
          this.retrieveDetailsfromSavedReports1(userName,basicLpsId,'',data);
        },
        error=>{
          this.ngOnInit();
        }
      );  
    }

    onKey(e: any,formarray:any,index:any){
      debugger
       
       this.createFromArray(formarray);
       
       setTimeout(() => {
        if(e.target.value==""){
          this.typeAearthingsystem=false; 
          this.clamps=false;              
          this.earthelectrodechambers=false; 
          this.typeBearthingsystem=false; 
          this.testingofearthelectrodes=false; 
          }
          else if(e.target.value=="Type A"){
          this.typeAearthingsystem=true; 
          this.clamps=true;              
          this.earthelectrodechambers=true; 
          this.typeBearthingsystem=false; 
          this.testingofearthelectrodes=true;
          
        (formarray.controls.earthingSystem as FormArray).removeAt(index); 
        }
        else if(e.target.value=="Type-B (ring)"){
          this.typeAearthingsystem=false; 
          this.clamps=false;              
          this.earthelectrodechambers=false; 
          this.typeBearthingsystem=true; 
          this.testingofearthelectrodes=true; 
         
         (formarray.controls.earthingLpsDescription as FormArray).removeAt(index);
      
         (formarray.controls.earthingClamps as FormArray).removeAt(index);
         (formarray.controls.earthingElectrodeChamber as FormArray).removeAt(index);
        }
        else if(e.target.value=="Type A & Type B combined"){
          this.typeAearthingsystem=true; 
          this.clamps=true;              
          this.earthelectrodechambers=true; 
          this.typeBearthingsystem=true; 
          this.testingofearthelectrodes=true; 
          
        }
        else if(e.target.value=="Foundation"){
          this.typeAearthingsystem=false; 
          this.clamps=false;              
          this.earthelectrodechambers=false; 
          this.typeBearthingsystem=false; 
          this.testingofearthelectrodes=true;
  
       
         (formarray.controls.earthingLpsDescription as FormArray).removeAt(index);
         (formarray.controls.earthingClamps as FormArray).removeAt(index);
         (formarray.controls.earthingElectrodeChamber as FormArray).removeAt(index);
         (formarray.controls.earthingSystem as FormArray).removeAt(index);
 
         formarray.controls.earthingLpsDescription.setValue([]);
         formarray.controls.earthingClamps.setValue([]);
         formarray.controls.earthingElectrodeChamber.setValue([]);
         formarray.controls.earthingSystem.setValue([]);
        this.earthingForm.value.earthing[0].earthElectrodeTesting=[]
         this.earthingForm.value.earthing[0].earthingClamps=[]
         this.earthingForm.value.earthing[0].earthingElectrodeChamber=[]
         this.earthingForm.value.earthing[0].earthingSystem=[]
         this.earthingForm.value.earthing[0].earthingLpsDescription=[]
        this.earthingForm.markAsPristine();
        }
      }, 30);
    }
    removeValidations(formarray:any){
      // for(let y in formarray.controls){
      //   console.log(y);
      //   formarray.controls[y].setValidators([Validators.required]);
      //   formarray.controls[y].updateValueAndValidity();
      // }

      // for(let y in formarray.controls){
      //   console.log("validation removed"+y);
      //   console.log("validation removed"+formarray.controls[y]);
      //   formarray.controls[y].clearValidators();
      //   formarray.controls[y].updateValueAndValidity();
      //   console.log("validation removed"+formarray.controls[y]);
      // }
debugger
      for(let y in formarray.controls[0].controls){
        //if(formarray.controls[0].controls[y].validator !=null ){
          console.log(y);
         
          
          formarray.controls[0].controls[y].clearValidators();
          formarray.controls[0].controls[y].updateValueAndValidity();
         // }
      }

    }

  createFromArray(formarray:any) {

    if(formarray.controls.earthingLpsDescription.controls.length ==0){

      

      this.earthingLpsDescription = formarray.controls.earthingLpsDescription?.controls;
      this.earthingLpsDescription.push(this.earthingDescriptionArray());

      //  formarray.controls.earthingLpsDescription = this.formBuilder.array([this.earthingDescriptionArray()])
    }
    if(formarray.controls.earthingClamps.controls.length ==0){
      // this.earthingClamps = formarray.controls.earthingClamps as FormArray;
      // this.earthingClamps.push(this.earthingClampsArray());
      this.earthingClamps = formarray.controls.earthingClamps?.controls;
      this.earthingClamps.push(this.earthingClampsArray());

     // formarray.controls.earthingClamps = this.formBuilder.array([this.earthingClampsArray()])
    }
    if(formarray.controls.earthingElectrodeChamber.controls.length ==0){
      // this.earthingElectrodeChamber = formarray.controls.earthingElectrodeChamber as FormArray;
      // this.earthingElectrodeChamber.push(this.earthingElectrodeChamberArray());
      this.earthingElectrodeChamber = formarray.controls.earthingElectrodeChamber?.controls;
      this.earthingElectrodeChamber.push(this.earthingElectrodeChamberArray());

      //formarray.controls.earthingElectrodeChamber = this.formBuilder.array([this.earthingElectrodeChamberArray()])
    }
    if(formarray.controls.earthingSystem.controls.length ==0){
      // this.earthingSystem = formarray.controls.earthingSystem as FormArray;
      // this.earthingSystem.push(this.earthingSystemArray());
      this.earthingSystem = formarray.controls.earthingSystem?.controls;
      this.earthingSystem.push(this.earthingSystemArray());

      //formarray.controls.earthingSystem = this.formBuilder.array([this.earthingSystemArray()])
    }
    if(formarray.controls.earthElectrodeTesting.controls.length ==0){
      // this.earthingSystem = formarray.controls.earthingSystem as FormArray;
      // this.earthingSystem.push(this.earthingSystemArray());
      this.earthElectrodeTesting = formarray.controls.earthElectrodeTesting?.controls;
      this.earthElectrodeTesting.push(this.earthElectrodeTestingArray());
       
      //formarray.controls.earthingSystem = this.formBuilder.array([this.earthingSystemArray()])
    }
    
  }
}
 
 

