import { Component,  EventEmitter,  OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {   TestingDetails, } from '../model/testing-details';
import { TestingService } from '../services/testing.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-inspection-verification-testing',
  templateUrl: './inspection-verification-testing.component.html',
  styleUrls: ['./inspection-verification-testing.component.css']
})
export class InspectionVerificationTestingComponent implements OnInit {

   j:any;
  i:any;
  delarr:any;
  values:any;
  value:any;
  loclength: any;
  loc1length: any;
  testingForm!: FormGroup;

  submitted =false;
  testaccordianArr!:FormArray;
  panelOpenState = false;
  email: String = '';
 
  @Output() proceedNext = new EventEmitter<any>();  

  testing1 =  new  TestingDetails ;
   
   incomingVoltage: String="";
   incomingZs: String="";
   incomingIpf: String="";
   rateArr: any = [];
   distributionIncomingValueArr: any = [];
   testValueArr: any = [];

  ratingAmps1: any;
  testDistributionArr!: FormArray;
   constructor( private testingService:TestingService, private formBuilder: FormBuilder,
    private modalService: NgbModal, private router: ActivatedRoute,) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
   }
 
   ngOnInit(): void {
  
      this.testingForm = this.formBuilder.group({
        testaccordianArr: this.formBuilder.array([this.createItem()])
        });
   }


 getdistributionIncomingValueControls(form:any){ 
    return form.controls.distributionIncomingValueArr?.controls;
 }
   gettestDistributionFormControls(form:any){ 
    return form.controls.testDistributionArr?.controls;
 }
  gettestValueControls(form:any){ 
    return form.controls.testValueArr?.controls;

  }
 gettestrateFormControls(form: any){
    return  form.controls.rateArr?.controls;
  }

  private createtestDistributionForm(): FormGroup {
      return new FormGroup({
        distributionBoardDetails: new FormControl(''),
        referance: new FormControl(''),
        location: new FormControl(''),
        correctSupplyPolarity: new FormControl(''),
        numOutputCircuitsUse: new FormControl(''),
        ratingsAmps:new FormControl(''),
        rateArr: this.formBuilder.array([this.ratingAmps()]),     
        numOutputCircuitsSpare: new FormControl(''),
        installedEquipmentVulnarable: new FormControl(''),
        incomingVoltage: new FormControl(''),
        incomingZs: new FormControl(''),
        incomingIpf: new FormControl(''),
        distributionIncomingValueArr: this.formBuilder.array([this.distributionIncomingValue()]),     
    
     
      })
    }

       
      distributionIncomingValue():FormGroup{
      return new FormGroup({
    
      incomingVoltage1: new FormControl(''),
      incomingVoltage2: new FormControl(''),
      incomingVoltage3: new FormControl(''),
      incomingVoltage4: new FormControl(''),
      incomingVoltage5: new FormControl(''),
      incomingVoltage6: new FormControl(''),
      incomingVoltage7: new FormControl(''),
      incomingVoltage8: new FormControl(''),
      incomingVoltage9: new FormControl(''),
 
      incomingZs1: new FormControl(''),
      incomingZs2: new FormControl(''),
      incomingZs3: new FormControl(''),
      incomingZs4: new FormControl(''),
      incomingZs5: new FormControl(''),
      incomingZs6: new FormControl(''),
      incomingZs7: new FormControl(''),
      incomingZs8: new FormControl(''),
      incomingZs9: new FormControl(''),
   
      incomingIpf1: new FormControl(''),
      incomingIpf2: new FormControl(''),
      incomingIpf3: new FormControl(''),
      incomingIpf4: new FormControl(''),
      incomingIpf5: new FormControl(''),
      incomingIpf6: new FormControl(''),
      incomingIpf7: new FormControl(''),
      incomingIpf8: new FormControl(''),
      incomingIpf9: new FormControl(''),
   
      

      })
    }
    ratingAmps():FormGroup{
                return new FormGroup({
                    ratingsAmps:new FormControl(''),
                
               
                })
                  }
  
    
     private createtestValueForm(): FormGroup {
      return new FormGroup({
        circuitNo: new FormControl(''),
        circuitDesc: new FormControl(''),
        circuitStandardNo: new FormControl(''),
        circuitType: new FormControl(''),
        circuitRating: new FormControl(''),
        circuitBreakingCapacity: new FormControl(''),
        conductorInstallation: new FormControl(''),
        conductorLive: new FormControl(''),
        conductorPecpc: new FormControl(''),
        continutiyApproximateLength: new FormControl(''),
        continutiyRR: new FormControl(''),
        continutiyR: new FormControl(''),
        continutiyLL: new FormControl(''),
        continutiyLE: new FormControl(''),
        continutiyPolarity: new FormControl(''),
        ryVoltage: new FormControl(''),
        rbVoltage: new FormControl(''),
        ybVoltage: new FormControl(''),
        rnVoltage: new FormControl(''),
        ynVoltage: new FormControl(''),
        bnVoltage: new FormControl(''),
        rpeVoltage: new FormControl(''),
        ypeVoltage: new FormControl(''),
        bpeVoltage: new FormControl(''),
        ryLoopImpedance: new FormControl(''),
        rbLoopImpedance: new FormControl(''),
        ybLoopImpedance: new FormControl(''),
        rnLoopImpedance: new FormControl(''),
        ynLoopImpedance: new FormControl(''),
        bnLoopImpedance: new FormControl(''),
        rpeLoopImpedance: new FormControl(''),
        ypeLoopImpedance: new FormControl(''),
        bpeLoopImpedance: new FormControl(''),
        ryFaultCurrent: new FormControl(''),
        rbFaultCurrent: new FormControl(''),
        ybFaultCurrent: new FormControl(''),
        rnFaultCurrent: new FormControl(''),
        ynFaultCurrent: new FormControl(''),
        bnFaultCurrent: new FormControl(''),
        rpeFaultCurrent: new FormControl(''),
        ypeFaultCurrent: new FormControl(''),
        bpeFaultCurrent: new FormControl(''),
        ryDisconnect: new FormControl(''),
        rbDisconnect: new FormControl(''),
        ybDisconnect: new FormControl(''),
        rnDisconnect: new FormControl(''),
        ynDisconnect: new FormControl(''),
        bnDisconnect: new FormControl(''),
        rpeDisconnect: new FormControl(''),
        ypeDisconnect: new FormControl(''),
        bpeDisconnect: new FormControl(''),
        rcdCurrent: new FormControl(''),

         testVoltage:new FormControl(''),
         testLoopImpedance:new FormControl(''),
         testFaultCurrent:new FormControl(''),
         disconnectionTime:new FormControl(''),

        rcdOperatingCurrent: new FormControl(''),
        rcdOperatingFiveCurrent: new FormControl(''),
        testButtonOperation: new FormControl(''),
        rcdRemarks: new FormControl(''),
       
       
      })
     }
   
  onKey(event: KeyboardEvent,c: any,a:any)    {
    this.values = (<HTMLInputElement>event.target).value ;
   this.value = this.values;
    this.testValueArr = a.controls.testValueArr as FormArray;
   this.rateArr = c.controls.rateArr as FormArray;
   
    console.log(c);
    console.log(a);
    console.log(this.rateArr)
    console.log(this.testValueArr)
      if(this.testValueArr.length==0&& this.rateArr.length==0 )   
    {
      if(this.value != "")
          {
    for (this.i=1; this.i<this.value; this.i++ )
      {
        this.testValueArr.push(this.createtestValueForm());
        this.rateArr.push(this.ratingAmps());
      
       }
    }
    }
    else if (this.value=="")
    {
     this.loclength=this.testValueArr.length;
     this.loclength=this.rateArr.length;
   
  
      for (this.i=1; this.i<this.loclength; this.i++ )
         {
        this.testValueArr.removeAt(this.testValueArr.length-1);
        this.rateArr.removeAt(this.rateArr.length-1);
       
    }
      }
       else if (this.testValueArr.length < this.value && this.rateArr.length < this.value)
      
       {
        if(this.value != "")
        {
       this.delarr =  this.value-this.testValueArr.length;
       this.delarr =  this.value-this.rateArr.length;
     
   
       for (this.i=0; this.i<this.delarr; this.i++ )
       {
         this.testValueArr.push(this.createtestValueForm());
         this.rateArr.push(this.ratingAmps());

     }
      }
      }
       else (this.testValueArr.length > this.value && this.rateArr.length > this.value)
      {
       if(this.value != "")
          {
       this.delarr =  this.testValueArr.length-this.value;
           this.delarr =  this.rateArr.length-this.value;
    
   
       for (this.i=0; this.i<this.delarr; this.i++ )
       {
         this.testValueArr.removeAt(this.testValueArr.length-1);
         this.rateArr.removeAt(this.rateArr.length-1);
    
    
      }
  }
}
   }
 
  
  get f():any {
    return this.testingForm.controls;
  }
      addItem(){
    this.testaccordianArr = this.testingForm.get('testaccordianArr') as FormArray;
    this.testaccordianArr.push(this.createItem());
  
    }
 
    getTestControls(): AbstractControl[] {
      return (<FormArray>this.testingForm.get('testaccordianArr')).controls;
    }
    removeAccordian(index: any) {
      (this.testingForm.get('testaccordianArr') as FormArray).removeAt(index);
    }
    createItem(){
       return this.formBuilder.group({
        locationNumber:new FormControl('',[Validators.required]),
         locationName:new FormControl('',[Validators.required]),
          testEngineerName: ['', Validators.required],
        date: ['', Validators.required],
        companyName: ['', Validators.required],
        designation: ['', Validators.required],
        detailsTestInstrument: ['', Validators.required],
        continuity: ['', Validators.required],
        insulationResisance: ['', Validators.required],
        Impedance: ['', Validators.required],
        rcd: ['', Validators.required],
        earthElectrodeResistance: ['', Validators.required],
      
    
      
       
         // distributionIncomingValueArr: this.formBuilder.array([this.createdistributionIncomingValueForm()]),
           testDistributionArr: this.formBuilder.array([this.createtestDistributionForm()]),
           testValueArr: this.formBuilder.array([this.createtestValueForm()]),
          // testingRecords: this.formBuilder.array([this.createTestingRecords()]),

    

      })
    }

   /// createTestingRecords()
   
  
     nextTab(){
   this.testaccordianArr = this.testingForm.get('testaccordianArr') as FormArray;

 
      for(let i of this.testaccordianArr.controls){
        this.testDistributionArr = i.get('testDistributionArr') as FormArray;

        for(let j of this.testDistributionArr.value) {
          console.log(j)
      

          let arr: any=[];
             let arr1: any=[];
             let arr2: any=[];
             for(let k of j.distributionIncomingValueArr) {  
              arr.push(k.incomingVoltage1,k.incomingVoltage2,k.incomingVoltage3,k.incomingVoltage4,k.incomingVoltage5,k.incomingVoltage6,k.incomingVoltage7,k.incomingVoltage8,k.incomingVoltage9)
               arr1.push(k.incomingZs1,k.incomingZs2,k.incomingZs3,k.incomingZs4,k.incomingZs5,k.incomingZs6,k.incomingZs7,k.incomingZs8,k.incomingZs9)
               arr2.push(k.incomingIpf1,k.incomingIpf2,k.incomingIpf3,k.incomingIpf4,k.incomingIpf5,k.incomingIpf6,k.incomingIpf7,k.incomingIpf8,k.incomingIpf9)
             }
               let incomingVoltage: String="";
               let incomingZs: String="";
               let incomingIpf: String="";
   
               for(let a of arr) {
                 if(a != "") {
                   incomingVoltage += a+",";
                 }
               } 
              incomingVoltage = incomingVoltage.replace(/,\s*$/, "");
               j.incomingVoltage = incomingVoltage;
   
               
         for(let b of arr1) {
           if(b != "") {
             incomingZs += b+",";
           }
         }
        incomingZs = incomingZs.replace(/,\s*$/, "");
         j.incomingZs = incomingZs;
   
         for(let c of arr2) {
           if(c != "") {
             incomingIpf += c+",";
           }
         }
         incomingIpf = incomingIpf.replace(/,\s*$/, "");
         j.incomingIpf = incomingIpf;
           }
       
      }

     for(let i of this.testDistributionArr.value) {
      let arr: any=[];
      for(let j  of this.rateArr.value) {
      arr.push(j.ratingsAmps)
      let ratingsAmps: String="";
      for(let a of arr) {
        if(a !="") {
          ratingsAmps += a+",";
        }
      } 
      ratingsAmps = ratingsAmps.replace(/,\s*$/, "");
   
     i.ratingsAmps= ratingsAmps;
    
  }
    }
   
      for(let i of this.testValueArr.value) {
        let arr: any=[];
        let arr1:any=[];
        let arr2:any=[];
        let arr3:any=[];
        arr.push(i.ryVoltage,i.rbVoltage,i.ybVoltage,i.rnVoltage,i.ynVoltage,i.bnVoltage,i.rpeVoltage,i.ypeVoltage,i.bpeVoltage)
        arr1.push(i.ryLoopImpedance,i. rbLoopImpedance,i.ybLoopImpedance,i.rnLoopImpedance,i.ynLoopImpedance,i.bnLoopImpedance,i.rpeLoopImpedance,i.ypeLoopImpedance,i.bpeLoopImpedance)
        arr2.push(i.ryFaultCurrent,i. rbFaultCurrent,i.ybFaultCurrent,i.rnFaultCurrent,i.ynFaultCurrent,i.bnFaultCurrent,i.rpeFaultCurrent,i.ypeFaultCurrent,i.bpeFaultCurrent)
        arr3.push(i.ryDisconnect,i. rbDisconnect,i.ybDisconnect,i.rnDisconnect,i.ynDisconnect,i.bnDisconnect,i.rpeDisconnect,i.ypeDisconnect,i.bpeDisconnect)
        let testVoltage: String="";
        let testLoopImpedance:String="";
        let testFaultCurrent:String="";
        let disconnectionTime:String="";
        for(let a of arr) {
         
          if(a != "") {
            testVoltage += a+",";
          }
        } 
       
        testVoltage = testVoltage.replace(/,\s*$/, "");
        i.testVoltage = testVoltage;
        for(let b of arr1) {
         
          if(b != "") {
            testLoopImpedance += b+",";
          }
        } 
        testLoopImpedance = testLoopImpedance.replace(/,\s*$/, "");
        i.testLoopImpedance = testLoopImpedance;

      for(let c of arr2) {
           if(c!= "") {
            testFaultCurrent += c+",";
        }
       } 
       testFaultCurrent = testFaultCurrent.replace(/,\s*$/, "");
       i.testFaultCurrent = testFaultCurrent;
     for(let d of arr3) {
           if(d!= "") {
            disconnectionTime += d+",";
       }
      } 
      disconnectionTime = disconnectionTime.replace(/,\s*$/, "");
    i.disconnectionTime = disconnectionTime;
   
     }

    
     

    this.testing1.siteId=15;
    this.testing1.userName = this.email;
   this.testing1.testing=this.testingForm.value.testaccordianArr;
   console.log(this.testing1);
       this.testingService.savePeriodicTesting(this.testing1).subscribe(
         (    data: any)=> {
           console.log("worked");
          },
         (    error: any) => {
         }
         )
    }
  
    }

    