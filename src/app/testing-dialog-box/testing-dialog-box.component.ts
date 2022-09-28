import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-testing-dialog-box',
  templateUrl: './testing-dialog-box.component.html',
  styleUrls: ['./testing-dialog-box.component.css']
})
export class TestingDialogBoxComponent implements OnInit {

   confirmBox= new EventEmitter();
   @Input() circuitArr: any;
   alternateList: any = [];
   circuitArr1:any;
   value1: any;
   value2: any;
   value3: any;
   value4: any;
   value5: any;
   value6: any;
   value7: any;
   value8: any;
   value9: any;
   value10: any;
   value11: any;
   value12: any;
   value13: any;
   value14: any;
   value15: any;
   value16: any;
   value17: any;
   value18: any;
   value19: any;
   value20: any;
   value21: any;
   value22: any;
   value23: any;
   value24: any;
   value25: any;
   value26: any;
   value27: any;
   value28: any;
   value29: any;
   value30: any;
   value32: any;
   value33: any;
   value34: any;
   value35: any;
   value36: any;
   value37: any;
   value38: any;
   value39: any;
   value40: any;
   value42: any;
   value43: any;
   value44: any;
   value45: any;
   value46: any;
   value47: any;
   value48: any;
   value49: any;
   value50: any;
   value52: any;
   value53: any;
   value54: any;
   value55: any;
   value56: any;
   value57: any;
   value58: any;
   value59: any;
   value60: any;
   value62: any;
   value63: any;
   value64: any;
   value65: any;
   value66: any;
   value67: any;
   value68: any;
   value69: any;
   value70: any;
   value71: any;
   value72: any;
   value73: any;
   value74: any;
   value75: any;
   value76: any;

  value032: any;
  value033: any;
  value034: any;
  value035: any;
  value036: any;
  value037: any;
  value038: any;
  value039: any;
  value040: any;
  value042: any;
  value043: any;
  value044: any;
  value045: any;
  value046: any;
  value047: any;
  value048: any;
  value049: any;
  value050: any;
  value052: any;
  value053: any;
  value054: any;
  value055: any;
  value056: any;
  value057: any;
  value058: any;
  value059: any;
  value060: any;
  value062: any;
  value063: any;
  value064: any;
  value065: any;
  value066: any;
  value067: any;
  value068: any;
  value069: any;
  value070: any;
   data:any;
   data1:any;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.value1 =this.circuitArr.circuitNo;
    this.value2=this.circuitArr.circuitDesc;
    this.value3=this.circuitArr.circuitStandardNo;
    this.value4=this.circuitArr.circuitMake;
    this.value5=this.circuitArr.circuitType;
    this.value6=this.circuitArr.numberOfPoles;
    this.value7=this.circuitArr.circuitCurrentCurve;
    this.value8=this.circuitArr.circuitRating;
    this.value9=this.circuitArr.circuitBreakingCapacity;
    this.value10=this.circuitArr.shortCircuitSetting;
    this.value11=this.circuitArr.eFSetting;
    this.value12=this.circuitArr.conductorInstallation;
    this.value13=this.circuitArr.conductorPhase;
    this.value14=this.circuitArr.conductorNeutral;
    this.value15=this.circuitArr.conductorPecpc;
    this.value16=this.circuitArr.continutiyApproximateLength;
    this.value17=this.circuitArr.continutiyRR;
    this.value18=this.circuitArr.continutiyR;
    this.value19=this.circuitArr.maximumAllowedValue;
    this.value20=this.circuitArr.continuityRemarks;
    this.value21=this.circuitArr.continutiyPolarity;
    this.value22=this.circuitArr.rycontinutiy;
    this.value23=this.circuitArr.rbcontinutiy;
    this.value24=this.circuitArr.ybcontinutiy;
    this.value25=this.circuitArr.rncontinutiy;
    this.value26=this.circuitArr.yncontinutiy;
    this.value27=this.circuitArr.bncontinutiy;
    this.value28=this.circuitArr.rpecontinutiy;
    this.value29=this.circuitArr.ypecontinutiy;
    this.value30=this.circuitArr.bpecontinutiy;
    this.value32=this.circuitArr.ryVoltage;
    this.value33=this.circuitArr.rbVoltage;
    this.value34=this.circuitArr.ybVoltage;
    this.value35=this.circuitArr.rnVoltage;
    this.value36=this.circuitArr.ynVoltage;
    this.value37=this.circuitArr.bnVoltage;
    this.value38=this.circuitArr.rpeVoltage;
    this.value39=this.circuitArr.ypeVoltage;
    this.value40=this.circuitArr.bpeVoltage;
    this.value42=this.circuitArr.ryLoopImpedance;
    this.value43=this.circuitArr.rbLoopImpedance;
    this.value44=this.circuitArr.ybLoopImpedance;
    this.value45=this.circuitArr.rnLoopImpedance;
    this.value46=this.circuitArr.ynLoopImpedance;
    this.value47=this.circuitArr.bnLoopImpedance;
    this.value48=this.circuitArr.rpeLoopImpedance;
    this.value49=this.circuitArr.ypeLoopImpedance;
    this.value50=this.circuitArr.bpeLoopImpedance;
    this.value52=this.circuitArr.ryFaultCurrent;
    this.value53=this.circuitArr.rbFaultCurrent;
    this.value54=this.circuitArr.ybFaultCurrent;
    this.value55=this.circuitArr.rnFaultCurrent;
    this.value56=this.circuitArr.ynFaultCurrent;
    this.value57=this.circuitArr.bnFaultCurrent;
    this.value58=this.circuitArr.rpeFaultCurrent;
    this.value59=this.circuitArr.ypeFaultCurrent;
    this.value60=this.circuitArr.bpeFaultCurrent;
    this.value62=this.circuitArr.ryDisconnect;
    this.value63=this.circuitArr.rbDisconnect;
    this.value64=this.circuitArr.ybDisconnect;
    this.value65=this.circuitArr.rnDisconnect;
    this.value66=this.circuitArr.ynDisconnect;
    this.value67=this.circuitArr.bnDisconnect;
    this.value68=this.circuitArr.rpeDisconnect;
    this.value69=this.circuitArr.ypeDisconnect;
    this.value70=this.circuitArr.bpeDisconnect;
    this.value71=this.circuitArr.rcdType;
    this.value72=this.circuitArr.rcdCurrent;
    this.value73=this.circuitArr.rcdOperatingCurrent;
    this.value74=this.circuitArr.rcdOperatingFiveCurrent;
    this.value75=this.circuitArr.rcdTestButtonOperation;
    this.value76=this.circuitArr.rcdRemarks;

  //supply
    this.alternateList = this.circuitArr.testingRecordsSourceSupply;
  }

   showDialog(f: object): void {
    this.data = f;
    this.value1 = this.data;
    this.value2=this.data;
    this.value3=this.data;
    this.value4=this.data;
    this.value5=this.data;
    this.value6=this.data;
    this.value7=this.data;
    this.value8=this.data;
    this.value9=this.data;
    this.value10=this.data;
    this.value11=this.data;
    this.value12=this.data;
    this.value13=this.data;
    this.value14=this.data;
    this.value15=this.data;
    this.value16=this.data;
    this.value17=this.data;
    this.value18=this.data;
    this.value19=this.data;
    this.value20=this.data;
    this.value21=this.data;
    this.value22=this.data;
    this.value23=this.data;
    this.value24=this.data;
    this.value25=this.data;
    this.value26=this.data;
    this.value27=this.data;
    this.value28=this.data;
    this.value29=this.data;
    this.value30=this.data;
    this.value32=this.data;
    this.value33=this.data;
    this.value34=this.data;
    this.value35=this.data;
    this.value36=this.data;
    this.value37=this.data;
    this.value38=this.data;
    this.value39=this.data;
    this.value40=this.data;
    this.value42=this.data;
    this.value43=this.data;
    this.value44=this.data;
    this.value45=this.data;
    this.value46=this.data;
    this.value47=this.data;
    this.value48=this.data;
    this.value49=this.data;
    this.value50=this.data;
    this.value52=this.data;
    this.value53=this.data;
    this.value54=this.data;
    this.value55=this.data;
    this.value56=this.data;
    this.value57=this.data;
    this.value58=this.data;
    this.value59=this.data;
    this.value60=this.data;
    this.value62=this.data;
    this.value63=this.data;
    this.value64=this.data;
    this.value65=this.data;
    this.value66=this.data;
    this.value67=this.data;
    this.value68=this.data;
    this.value69=this.data;
    this.value70=this.data;
    this.value71=this.data;
    this.value72=this.data;
    this.value73=this.data;
    this.value74=this.data;
    this.value75=this.data;
    this.value76=this.data;
  }

 OkModalDialog(){
    this.confirmBox.emit(true);
    this.dialog.closeAll();
  }

  closeModalDialog(){
    this.confirmBox.emit(false);
    this.dialog.closeAll();
  }
}
