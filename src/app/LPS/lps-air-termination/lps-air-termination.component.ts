import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Airtermination } from 'src/app/LPS_model/airtermination';
import { AirterminationService } from 'src/app/LPS_services/airtermination.service';

@Component({
  selector: 'app-lps-air-termination',
  templateUrl: './lps-air-termination.component.html',
  styleUrls: ['./lps-air-termination.component.css']
})
export class LpsAirTerminationComponent implements OnInit {

  airtermination=new Airtermination;
  
  airTerminationForm: FormGroup;
  vatArr!: FormArray;
  meshArr!: FormArray;
  holderArr!: FormArray;
  clampArr!: FormArray;
  expArr!: FormArray;
  conArr!: FormArray;
  submitted=false;
  i: any;
  j: any;
  airterminationService;
  constructor(
    private formBuilder: FormBuilder,private airterminationServices:AirterminationService
  ) { 
    this.airterminationService=airterminationServices;
  }

  ngOnInit(): void {
    this.airTerminationForm = this.formBuilder.group({
      // basicLpsId: ['', Validators.required],
      // userName: ['', Validators.required],
      connectionMadeBraOb: ['', Validators.required],
      connectionMadeBraRe: [''],
      electricalEquipPlacedOb: ['', Validators.required],
      electricalEquipPlacedRe: [''],
      combustablePartOb: ['', Validators.required],
      combustablePartRe: [''],
      terminationMeshConductorOb: ['', Validators.required],
      terminationMeshConductorRe: [''],
      bondingEquipotentialOb: ['', Validators.required],
      bondingEquipotentialRe: [''],
      
      vatArr: this.formBuilder.array([this.createVatArrForm()]),
      meshArr: this.formBuilder.array([this.createMeshArrForm()]),
      holderArr: this.formBuilder.array([this.createHolderArrForm()]),
      clampArr: this.formBuilder.array([this.createClampArrForm()]),
      expArr: this.formBuilder.array([this.createExpansioArrForm()]),
      conArr: this.formBuilder.array([this.createConArrForm()])
    });
  }
  onSubmit(){
    this.submitted=true;

    if (this.airTerminationForm.invalid) {
      return;
    }  
    else{

      this.airtermination.userName="";
      this.airtermination.basicLpsId=444;
        //this.airtermination.userName=this.airTerminationForm.value.userName;
        // this.airtermination.connectionMadeBraOb=this.airTerminationForm.value.connectionMadeBraOb;
        // this.airtermination.connectionMadeBraRe=this.airTerminationForm.value.connectionMadeBraRe;
        // this.airtermination.electricalEquipPlacedOb=this.airTerminationForm.value.electricalEquipPlacedOb;
        // this.airtermination.electricalEquipPlacedRe=this.airTerminationForm.value.electricalEquipPlacedRe;
        // this.airtermination.combustablePartOb=this.airTerminationForm.value.combustablePartOb;
        // this.airtermination.combustablePartRe=this.airTerminationForm.value.combustablePartRe;
        // this.airtermination.terminationMeshConductorOb=this.airTerminationForm.value.terminationMeshConductorOb;
        // this.airtermination.terminationMeshConductorRe=this.airTerminationForm.value.terminationMeshConductorRe;
        // this.airtermination.bondingEquipotentialOb=this.airTerminationForm.value.bondingEquipotentialOb;
        // this.airtermination.bondingEquipotentialRe=this.airTerminationForm.value.bondingEquipotentialRe;
        
        this.airtermination.airClamps=this.airTerminationForm.value.clampArr;
        this.airtermination.airConnectors=this.airTerminationForm.value.conArr;
        this.airtermination.airMeshDescription=this.airTerminationForm.value.meshArr;
        this.airtermination.lpsVerticalAirTermination=this.airTerminationForm.value.vatArr;
        this.airtermination.airExpansion=this.airTerminationForm.value.expArr;
        this.airtermination.airHolderDescription=this.airTerminationForm.value.holderArr;
        
        this.airterminationService.saveAirtermination(this.airtermination).subscribe(

          data => {
             
          
          },
          error => {
          }
        )
      };
    }
  

  vatControls(): AbstractControl[] {
    return (<FormArray>this.airTerminationForm.get('vatArr')).controls;
  }

  meshControls(): AbstractControl[] {
    return (<FormArray>this.airTerminationForm.get('meshArr')).controls;
  }

 holdersContols(): AbstractControl[] {
    return (<FormArray>this.airTerminationForm.get('holderArr')).controls;
  }

  clampsControls(): AbstractControl[] {
    return (<FormArray>this.airTerminationForm.get('clampArr')).controls;
  }

  expansionControls(): AbstractControl[] {
    return (<FormArray>this.airTerminationForm.get('expArr')).controls;
  }

  connectorsControls(): AbstractControl[] {
    return (<FormArray>this.airTerminationForm.get('conArr')).controls;
  }

  private createVatArrForm(): FormGroup{
    return new FormGroup({
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),
      conductorClampsFlatSurafaceOb: new FormControl('', Validators.required),
      conductorClampsFlatSurafaceRe: new FormControl(''),
      sizeOfTerminalOb: new FormControl('', Validators.required),
      sizeOfTerminalRe: new FormControl(''),
      heightOfTerminalOb: new FormControl('', Validators.required),
      heightOfTerminalRe: new FormControl(''),
      angleProtectionHeightOb: new FormControl('', Validators.required),
      angleProtectionHeightRe: new FormControl(''),
      materialOfTerminalOb: new FormControl('', Validators.required),
      materialOfTerminalRe: new FormControl(''),
      supportFlatSurfaceOb: new FormControl('', Validators.required),
      supportFlatSurfaceRe: new FormControl(''),
      heightFlatSurfaceOb: new FormControl('', Validators.required),
      heightFlatSurfaceRe: new FormControl(''),
      vatToRoofConductorOB: new FormControl('', Validators.required),
      vatToRoofConductorRe: new FormControl(''),
      totalNumberOb: new FormControl('', Validators.required),
      totalNumberRe: new FormControl(''),
      inspNoOb: new FormControl('', Validators.required),
      inspNoRe: new FormControl(''),
      inspPassedNoOb: new FormControl('', Validators.required),
      inspPassedNoRe: new FormControl(''),
      inspFaileddNoOb: new FormControl('', Validators.required),
      inspFaileddNoRe: new FormControl('')
    })
  }

  private createMeshArrForm(): FormGroup{
    return new FormGroup({
      meshobs1: new FormControl('', Validators.required),
      meshrem1: new FormControl(''),
      meshobs2: new FormControl('', Validators.required),
      meshrem2: new FormControl(''),
      sizeOfConductorOb: new FormControl('', Validators.required),
      sizeOfConductorRe: new FormControl(''),
      meshSizeOb: new FormControl('', Validators.required),
      meshSizeRe: new FormControl(''),
      maximumDistanceOb: new FormControl('', Validators.required),
      maximumDistanceRe: new FormControl(''),
      minimumDistanceOb: new FormControl('', Validators.required),
      minimumDistanceRe: new FormControl(''),
      heightOfConductorFlatSurfaceOb: new FormControl('', Validators.required),
      heightOfConductorFlatSurfaceRe: new FormControl('')
    })
  }

  private createHolderArrForm(): FormGroup{
    return new FormGroup({
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),

      conductorHolderFlatSurfaceOb: new FormControl('', Validators.required),
      conductorHolderFlatSurfaceRe: new FormControl(''),

      conductorHolderOb: new FormControl('', Validators.required),
      conductorHolderRe: new FormControl(''),

      holderTypeOb: new FormControl('', Validators.required),
      holderTypeRe: new FormControl(''),

      materialHolderOb: new FormControl('', Validators.required),
      materialHolderRe: new FormControl(''),

      totalHolderNoOb: new FormControl('', Validators.required),
      totalHolderNoRe: new FormControl(''),

      totalParpetHolderNoOb: new FormControl('', Validators.required),
      totalParpetHolderNoRe: new FormControl(''),

      holderInspNoOb: new FormControl('', Validators.required),
      holderInspNoRe: new FormControl(''),

      holderInspPassedOb: new FormControl('', Validators.required),
      holderInspPassedNoRe: new FormControl(''),

      holderInspFailedNoOb: new FormControl('', Validators.required),
      holderInspFailedNoRe: new FormControl(''),

      parpetInspectionNoOb: new FormControl('', Validators.required),
      parpetInspectionNoRe: new FormControl(''),

      parpetInspectionPassedNoOb: new FormControl('', Validators.required),
      parpetInspectionPassedNoRe: new FormControl(''),
      
      parpetInspectionFailedNoOb: new FormControl('', Validators.required),
      parpetInspectionFailedNoRe: new FormControl('')
    
      //8.12 Total number of holders: pending
      //8.11 Material of parpet holder:
    }) 
  }

  private createClampArrForm(): FormGroup{
    return new FormGroup({
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),
      conductorClampsFlatSurafaceOb: new FormControl('', Validators.required),
      conductorClampsFlatSurafaceRe: new FormControl(''),
      interConnectionOfClampsOb: new FormControl('', Validators.required),
      interConnectionOfClampsRe: new FormControl(''),
      clampTypeOb: new FormControl('', Validators.required),
      clampTypRe: new FormControl(''),

      materialOfClampsOb: new FormControl('', Validators.required),
      materialOfClampsRe: new FormControl(''),
      totalClampsNoOb: new FormControl('', Validators.required),
      totalClampsNoRe: new FormControl(''),
      inspectionNoOb: new FormControl('', Validators.required),
      inspectionNoRe: new FormControl(''),
      inspectionPassedOb: new FormControl('', Validators.required),
      inspectionPassedRe: new FormControl(''),
      inspectionFailedReOb: new FormControl('', Validators.required),
      inspectionFailedReRe: new FormControl('')
      //clampobs9: new FormControl('', Validators.required),
     // clamprem9: new FormControl('')
    })
  }

  private createExpansioArrForm(): FormGroup{
    return new FormGroup({
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),
      strightConnectorPiecOb: new FormControl('', Validators.required),
      strightConnectorPiecRe: new FormControl(''),
      materialOfExpansionOb: new FormControl('', Validators.required),
      materialOfExpansionRe: new FormControl(''),
      totalNoExpansionOb: new FormControl('', Validators.required),
      totalNoExpansionRe: new FormControl(''),
      inspectionNoOb: new FormControl('', Validators.required),
      inspectionNoRe: new FormControl(''),
      inspectionPassedNoOb: new FormControl('', Validators.required),
      inspectionPassedNoRe: new FormControl(''),
      inspectionFailedNoOb: new FormControl('', Validators.required),
      inspectionFailedNoRe: new FormControl('')
    })
  }
  
  private createConArrForm(): FormGroup{
    return new FormGroup({
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),
      checkConnectionConnectorsOb: new FormControl('', Validators.required),
      checkConnectionConnectorsRe: new FormControl(''),
      materialOfConnectorOb: new FormControl('', Validators.required),
      materialOfConnectorRe: new FormControl(''),
      strightConnectorOb: new FormControl('', Validators.required),
      strightConnectorRe: new FormControl(''),
      tConnectorOb: new FormControl('', Validators.required),
      tConnectorRe: new FormControl(''),
      lConnectorOb: new FormControl('', Validators.required),
      lConnectorRe: new FormControl(''),
      totalNoConnectorOb: new FormControl('', Validators.required),
      totalNoConnectorRe: new FormControl(''),
      inspectionNoOb: new FormControl('', Validators.required),
      inspectionNoRe: new FormControl(''),
      inspectionPassedNoOb: new FormControl('', Validators.required),
      inspectionPassedNoRe: new FormControl(''),
      inspectionFailedOb: new FormControl('', Validators.required),
      inspectionFailedRe: new FormControl('')
    })
  }

  submit(){
    this.vatArr = this.airTerminationForm.get('vatArr') as FormArray;
  this.vatArr.push(this.createVatArrForm());
    //console.log(this.airTerminationForm.value)
  }

  submit1(){
    this.meshArr = this.airTerminationForm.get('meshArr') as FormArray;
    this.meshArr.push(this.createMeshArrForm());
   // console.log(this.airTerminationForm)
  }

  submit2(){
    this.holderArr = this.airTerminationForm.get('holderArr') as FormArray;
    this.holderArr.push(this.createHolderArrForm());
    //console.log(this.airTerminationForm)
  }

  submit3(){
    this.clampArr = this.airTerminationForm.get('clampArr') as FormArray;
  this.clampArr.push(this.createClampArrForm());
    //console.log(this.airTerminationForm)
  }

  submit4(){
    this.expArr = this.airTerminationForm.get('expArr') as FormArray;
  this.expArr.push(this.createExpansioArrForm());
   // console.log(this.airTerminationForm)
  }

  submit5(){
    this.conArr = this.airTerminationForm.get('conArr') as FormArray;
  this.conArr.push(this.createConArrForm());
    //console.log(this.airTerminationForm)
  }
  
  get f() {
    return this.airTerminationForm.controls;
  }

  removeItem(index: any) {
    (this.airTerminationForm.get('vatArr') as FormArray).removeAt(index);
    }
  removeItem1(index: any) {
    (this.airTerminationForm.get('meshArr') as FormArray).removeAt(index);
    }
  removeItem2(index: any) {
    (this.airTerminationForm.get('holderArr') as FormArray).removeAt(index);
    }
  removeItem3(index: any) {
    (this.airTerminationForm.get('clampArr') as FormArray).removeAt(index);
    }
  removeItem4(index: any) {
    (this.airTerminationForm.get('expArr') as FormArray).removeAt(index);
    }
  removeItem5(index: any) {
    (this.airTerminationForm.get('conArr') as FormArray).removeAt(index);
    }

}
