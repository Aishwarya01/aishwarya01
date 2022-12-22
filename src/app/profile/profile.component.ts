import { Component, OnInit, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GlobalsService } from '../globals.service';
import { arrow90DegDown, flag } from 'ngx-bootstrap-icons';
import { ChangeContact } from '../model/change-contact';
import { Register } from '../model/register';
import { User } from '../model/user';
import { ApplicationTypeService } from '../services/application.service';
import { InspectorregisterService } from '../services/inspectorregister.service';
import { ProfileService } from '../services/profile.service';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = new FormGroup({
    // name: new FormControl(''),
    // email: new FormControl(''),
    // contactNumber: new FormControl(''),
    // userType: new FormControl(''),
    // companyName: new FormControl(''),
    // department: new FormControl(''),
    // designation: new FormControl(''),
    // country: new FormControl(''),
    // state: new FormControl(''),
    // district: new FormControl(''),
    // address: new FormControl(''),
    // applicationType: new FormControl(''),
    // pinCode: new FormControl(''),
  });

  generateContactNumberOtpForm = new FormGroup({
    mobileNumber: new FormControl(''),
  });

  changeContactNumberForm = new FormGroup({
    emailId: new FormControl(''),
    mobileNumber: new FormControl(''),
    otpValue: new FormControl('')
  });

  loading = false;
  submitted = false;
  register = new Register();
  msg = "";
  email: String = '';
  ErrorMsg: any;
  errorArr: any=[];
  alert: any;
  countryList: any = [];
  stateList: any= [];
  selected: any;
  applicationTypeData: any="";
  successMsgOTP: boolean=false;
  errorMsg: any;
  errorMsgflag: boolean=false;
  successMsg: string="";
  isEnabled: boolean = false;
  isChecked: boolean = false;
  countryCode: String = '';
  contactNumber: string = '';
  disableValue: boolean = false;

  dropdownList:any = [];
  selectedItems:any = [];
  permissions:any ;
  //dropdownSettings:any = {};
  dropdownSettings!:IDropdownSettings;
  mobileArr: any = [];


  //mobile number page
  mobileLoading: boolean = false;
  mobileSubmitted: boolean = false;
  mobileShowErrorMessage: boolean = false;
  mobileErrorMsg: String ="";
  mobileCountryCode: String = '';
  contactNumber1: String = '';
  mobileSuccessMsgOTP: boolean = false;
  mobileSuccessMsg: string = '';
  changeContact = new ChangeContact;

  // Spinner 
  spinner: boolean=true;
  spinnerMsg: String="";

  //otp page
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;
  showErrorMessage: boolean= false;
  showOTPMessage: boolean= false;
  showOTPValidation: boolean= false;
  OTPerrorMsgflag: boolean= false;
  OTPerrorMsg: String = '';
  SubmitSuccessMsg: boolean= false;
  otp: String = '';
  otpLoading = false;
  otpSubmitted = false;
  sessionKey!: any;
  contactNo!: any;
  arr :any = [];
  pincodeErrorMsg: String='';
  selectedCodeName: any= [];
  appendCodeNameArr: any=[];
  repoPermission: any;
  selectedCodeNameCount:number=0

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private profileService: ProfileService,
    private siteService: SiteService,
    private applicationService: ApplicationTypeService,
    private modalService: NgbModal,
    private serice: GlobalsService,
    private inspectorRegisterService: InspectorregisterService
    ) {
      this.changeContactNumberForm = this.toFormGroup(this.formInput);
      this.register.username=this.router.snapshot.paramMap.get('email') || '{}'
      this.email = this.register.username;        
    }

  ngOnInit() {
    this.countryCode = '91';
    this.mobileArr = [];

    this.spinner=true;
    this.spinnerMsg="Please wait, Details are Loading";
     
      this.applicationService.retrieveApplicationTypesV2().subscribe(
        data => {
          this.dropdownList = data;
        }     
      );
      setTimeout(() => {
      this.profileService.getUser(this.register.username).subscribe(
        data =>{ 
        this.register= JSON.parse(data);
        if(this.register.applicationType != null && this.register.permission !=null &&
           (this.register.permission !='YES' || this.register.permission != 'Yes')) {
          this.selectedItems = this.register.applicationType.split(',');
          this.permissions = this.register.permission.split(',');
          for(let i of this.selectedItems) {
            for(let permission of this.register.permission.split(',')) {
            if(permission.split('-')[0] == i && permission.split('-')[1] != 'R' ){
              this.appendCodeName(i);
            }
         
          }
        }
      }else{
        for(let application of this.register.applicationType.split(',')) { 
            this.appendCodeName(application);
        }
      }
      //this.mobileArr= this.register.contactNumber.split('-');
        setTimeout(()=>{
          this.populateForm();
          this.spinner=false;
          this.spinnerMsg="";
        }, 1000);
        }
      )
      }, 3000);

    
    // this.applicationService.retrieveApplicationTypesV2().subscribe(
    //   data => {
    //     this.dropdownList = data;
    //   }     
    // );

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'code',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
      // this.profileForm = this.formBuilder.group({
      //   name: [this.register.name, Validators.required],
      //   email: [this.register.username],
      //   contactNumber: [this.mobileArr[1], Validators.required],
      //   userType: [this.register.role],
      //   companyName: [this.register.companyName],
      //   department: [this.register.department],
      //   designation: [this.register.designation],
      //   country: [this.register.country, Validators.required],
      //   state: [this.register.state, Validators.required],
      //   district: [this.register.district],
      //   address: [this.register.address, Validators.required],
      //   applicationType: [this.selectedItems],
      //   pinCode: [this.register.pinCode, Validators.required],
      // });     

    this.generateContactNumberOtpForm = this.formBuilder.group({
      mobileNumber: ['',[Validators.maxLength(10),Validators.minLength(10),Validators.required]]
    });

  this.changeContactNumberForm = this.formBuilder.group({
    emailId: [this.changeContact.email, [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    mobileNumber: [this.changeContact.mobileNumber, Validators.required],
    // confirmpassword: ['', Validators.required],
    input1:[''],
    input2:[''],
    input3:[''],
    input4:[''],
    input5:[''],
    input6:['']
    });
    
  }

  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '40px'
    }
    };

  toFormGroup(elements:any) {
    const group: any = {};

    elements.forEach((key:any) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  getProfileControls(): AbstractControl[] {
    return (<FormArray> this.profileForm.get('profileArr'))?.controls 
  }

  keyUpEvent(event:any, index:any) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1 ;
    } else {
      pos = index + 1 ;
    }
    // if (pos > -1 && pos < this.formInput.length ) {
    //   this.rows._results[pos].nativeElement.focus();
    // }

  }
  onOtpChange(otp:any) {
    this.otp = otp;
  }

  onItemSelect(e: any) {

  }
  appendCodeName(codeName: any) {
    for(let i of this.dropdownList) {
      if(i.code == codeName) {
        this.appendCodeNameArr = {"applicationName": i.applicationName,"code": codeName,"id": i.id,"type": i.type}
        this.selectedCodeName.push(this.appendCodeNameArr);
        this.selectedCodeNameCount = this.selectedCodeNameCount +1;
      }
    }  
  }

  populateForm() {
    this.profileForm = this.formBuilder.group({
      profileArr: this.formBuilder.array([
        this.createProfile(),
      ])
      // name: [this.register.name, Validators.required],
      // email: [this.register.username],
      // contactNumber: [this.register.contactNumber, Validators.required],
      // userType: [this.register.role],
      // companyName: [this.register.companyName],
      // department: [this.register.department],
      // designation: [this.register.designation],
      // country: [this.register.country, Validators.required],
      // state: [this.register.state, Validators.required],
      // district: [this.register.district],
      // address: [this.register.address, Validators.required],
      // applicationType: [this.selectedItems],
      // pinCode: [this.register.pinCode, Validators.required],
    });
  }

  createProfile(): FormGroup {
    this.arr = []
    if(this.register.country == 'INDIA') {
      this.arr=[];
      this.arr.push(Validators.required,Validators.pattern('^[1-9][0-9]{5}$'));
      this.pincodeErrorMsg = 'Please enter 6 digit pincode';
    }
    else if(this.register.country == 'NEPAL') {
      this.arr=[];
      this.arr.push(Validators.required,Validators.pattern('^[1-9][0-9]{4}$'));
      this.pincodeErrorMsg = 'Please enter 5 digit pincode';
    }
    else {
      this.arr=[];
      this.arr.push(Validators.required);
    }
   this.repoPermission = this.register.permission;
    return new FormGroup({
    name: new FormControl(this.register.name, Validators.required),
    email: new FormControl(this.register.username),
    contactNumber: new FormControl(this.register.contactNumber, Validators.required),
    userType: new FormControl(this.register.role),
    companyName: new FormControl(this.register.companyName),
    department: new FormControl(this.register.department),
    designation: new FormControl(this.register.designation),
    country: new FormControl(this.register.country, Validators.required),
    state: new FormControl(this.register.state, Validators.required),
    district: new FormControl(this.register.district),
    address: new FormControl(this.register.address, Validators.required),
    applicationType: new FormControl(this.selectedItems),
    pinCode: new FormControl(this.register.pinCode, this.arr),
    })
  }

  generateForm() {
    this.changeContactNumberForm.value.emailId = this.changeContact.email;
    this.changeContactNumberForm.value.mobileNumber = this.changeContact.mobileNumber;

    this.changeContactNumberForm = this.formBuilder.group({
      emailId: [this.changeContact.email, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobileNumber: [this.changeContact.mobileNumber, Validators.required],
      // confirmpassword: ['', Validators.required],
      input1:[''],
      input2:[''],
      input3:[''],
      input4:[''],
      input5:[''],
      input6:['']
  });
  }
  

  selectCountry(e: any) {
    let changedValue = e.target.value;
    this.stateList = [];
      // for(let arr of this.countryList) {
      //   if( arr.name == changedValue) {
      //     this.siteService.retrieveState(arr.code).subscribe(
      //       data => {
      //         this.stateList = JSON.parse(data)
      //       }
      //     )};
      // }
      if(changedValue == "IND") {
        this.siteService.retrieveStateV2(changedValue).subscribe(
          data => {
            this.stateList = JSON.parse(data)
          }
        );
      }
       
  }

  openModal(contentViewer: any) {
    this.modalService.open(contentViewer,{size: 'md', backdrop: 'static' })
  }

  countryChange(country: any) {
    this.countryCode = country.dialCode;
  }

  get f() {
    return this.profileForm.controls;
  }

  get g() {
    return this.generateContactNumberOtpForm.controls;
  }

  get h() {
    return this.changeContactNumberForm.controls;
  }

  //profile
  onSubmit() {
    this.submitted = true;
    //Breaks if form is invalid
    if(this.profileForm.invalid) {
      return;
    }
    this.loading = true;
    //this.contactNumber = "";
    //this.contactNumber = "+"+this.countryCode+"-"+this.profileForm.controls.profileArr.value[0].contactNumber

    this.register.contactNumber = this.profileForm.controls.profileArr.value[0].contactNumber;

    this.applicationTypeData = "";

    if(this.profileForm.controls.profileArr.value[0].applicationType != undefined) {
      for(let i of this.profileForm.controls.profileArr.value[0].applicationType) {
        if(i.code != "") {
          this.applicationTypeData += i.code+",";
        }
      }
      this.applicationTypeData = this.applicationTypeData.replace(/,\s*$/, "");
      this.register.applicationType = this.applicationTypeData;
    }
    let adminApproveRequired = false;
    let permission = "";
    let status = "-U";
    for (let application of this.selectedCodeName) {
      let flag = true;
         if(this.register.permission != "YES"){
          status = "-A"
          for (let repermission of this.register.permission.split(',')) {
            if (application.code == repermission.split('-')[0] && repermission.split('-')[1] != 'R') {
              flag = false;
              permission += repermission + ",";
            }
          }
         }
      if (flag) {
        permission += application.code+status+",";
        adminApproveRequired = true;
      }
    }
    permission = permission.replace(/,\s*$/, "");

    let deletedapplication = ""
    for (let value of this.register.permission.split(',')) {
      let flag = true;
      for (let permissions of permission.split(',')) {
        if (permissions.split('-')[0] == value.split('-')[0]) {
          flag = false;
        }
      }
      if (flag) {
        if (value.split('-')[1] == 'R') {
          deletedapplication += value + ","
        }
        else {
          deletedapplication += value.split('-')[0] + "-R,"
          adminApproveRequired = true;
        }
      }
    }
    deletedapplication = deletedapplication.replace(/,\s*$/, "");

    if (deletedapplication.split(',').length > 1) {
      this.register.permission = permission + "," + deletedapplication;
    }
    else {
      this.register.permission = permission
    }

      // this.updateStatus();
     
     this.profileService.updateRegister(this.register,adminApproveRequired).subscribe(
      data=> {
        this.successMsgOTP=true;
        this.successMsg="You have successfully updated profile"
        setTimeout(()=>{
          this.successMsgOTP=false;
          this.successMsg="";
        }, 3000);
        // setTimeout(()=>{
        //   this.router.navigate(['/createPassword', {email: this.register.username}])
        // }, 5000);
      },
      error => {
        this.loading= false;
        this.errorMsgflag=true;
        // this.errorArr = JSON.parse(error.error)
        this.errorMsg=this.serice.globalErrorMsg;
        setTimeout(()=>{
          this.errorMsgflag=false;
          this.errorMsg=" ";
        }, 3000);
      }
    )
  
  }

  updateStatus(){
    let addPermissionStatus = '';
     let permissionStatus = [];
    let removeApplicationFlag = true;
    // let removeApplication = '';  
    if(this.selectedCodeName.length !=0){
      for(let i of this.selectedCodeName) {
        if(i.code != "") {
          this.applicationTypeData += i.code+",";
        } 
        let flag = false;
        for(let permission of  this.repoPermission.split(',')){
            if(permission.split('-')[0] == i.code){
              addPermissionStatus = addPermissionStatus+permission;
              flag = true;
              break;
            }
        }
        if(!flag){
          addPermissionStatus = addPermissionStatus+i.code+"-A,";
        }
      }
      
      addPermissionStatus = addPermissionStatus.replace(/,\s*$/, "");
    } 
    else{
      removeApplicationFlag  = false;
      for(let value of  this.applicationTypeData.split(',')){ 
          addPermissionStatus = addPermissionStatus+value+"-R,";   
      }
      
    this.register.permission = addPermissionStatus.replace(/,\s*$/, "");
    } 
    
    let updateStatus='';
    if(removeApplicationFlag && this.repoPermission.split(',')[0] !=''){
      for(let permission of  this.repoPermission.split(',')) {
        let flag = false;
        for(let item of addPermissionStatus.split(',')){
          if(item.split('-')[0] == permission.split('-')[0] ){
            flag = true;
            updateStatus = updateStatus + item+",";
            break ;
          } 
        }
        if(!flag){
          updateStatus = updateStatus + permission.split('-')[0]+'-R,';
        }
      }
      this.register.permission = updateStatus.replace(/,\s*$/, ""); 
    }
    else{
      this.register.permission = addPermissionStatus; 
    }
   
      this.applicationTypeData = this.applicationTypeData.replace(/,\s*$/, ""); 
      this.register.applicationType = this.applicationTypeData; 
  }


  
  cancel(contentViewer: any) {
    this.modalService.dismissAll();
  }
  cancelOTP() {
    this.modalService.dismissAll();
  }

  resendOTP(){
    this.inspectorRegisterService.sendOtpContactNumber(this.email,this.changeContact.mobileNumber).subscribe(
      data=> {
       this.showOTPMessage=true;
       setTimeout(()=>{
        this.showOTPMessage=false;
      }, 3000);
      this.changeContact.otpSession = data;

      },
      error => {
      
      }
      ) 
  }

  //generate OTP
  onContactSubmit(contentViewer1: any) {

    this.mobileSubmitted=true;
    
    //Breaks if form is invalid
    if(this.generateContactNumberOtpForm.invalid) {
      return;
    }

    this.mobileLoading=true;
    this.contactNumber1 = "";
    this.contactNumber1 = "+"+this.countryCode+"-"+this.generateContactNumberOtpForm.value.mobileNumber
    this.inspectorRegisterService.sendOtpContactNumber(this.email,this.contactNumber1).subscribe(
      data=> { 
        this.mobileSuccessMsgOTP=true;
        this.mobileSuccessMsg="OTP has been successfully sent to your mobile number";
        this.changeContact.mobileNumber = this.contactNumber1;
        this.changeContact.email = this.email;
        this.changeContact.otpSession = data;
        // sessionStorage.setItem('changeNumberSession', data);
        // sessionStorage.setItem('changeNumber', this.contactNumber);

        setTimeout(()=>{
          this.mobileSuccessMsgOTP=false;
          this.mobileSuccessMsg="";
          this.generateForm();
        }, 3000);
        setTimeout(()=>{
          this.modalService.open(contentViewer1,{size: 'md', backdrop: 'static' })
        }, 5000);
      },
      error => {
        // let errorArr = JSON.parse(error.error);
        this.mobileLoading=false;
        this.mobileShowErrorMessage=true;
        this.mobileErrorMsg =this.serice.globalErrorMsg;
        setTimeout(()=>{
          this.mobileShowErrorMessage=false;
          this.mobileErrorMsg = "";
        }, 3000);
      }
    )
  }

  //OTP
  onOtpSubmit() {
    this.otpSubmitted=true;
    if((this.changeContactNumberForm.value.input1 == "") || (this.changeContactNumberForm.value.input2 == "") || (this.changeContactNumberForm.value.input3 == "") ||
     (this.changeContactNumberForm.value.input4 == "") || (this.changeContactNumberForm.value.input5 == "") || (this.changeContactNumberForm.value.input6 == "")) {
      this.showOTPValidation=true;
      setTimeout(()=>{
        this.showOTPValidation=false;
      }, 3000);
      return;
    }

    //Breaks if form is invalid
    if(this.changeContactNumberForm.invalid) {  
      return;
    }
    this.otp= this.changeContactNumberForm.value.input1+this.changeContactNumberForm.value.input2+this.changeContactNumberForm.value.input3+this.changeContactNumberForm.value.input4
    +this.changeContactNumberForm.value.input5+this.changeContactNumberForm.value.input6;
    this.changeContact.otp= this.otp;
    this.changeContact.email=this.changeContactNumberForm.value.emailId;
    

    this.inspectorRegisterService.createContactNo(this.changeContact).subscribe(
      data=> {
        this.SubmitSuccessMsg=true;
        this.ngOnInit();
        setTimeout(()=>{
          this.SubmitSuccessMsg=false;
          this.modalService.dismissAll();
        }, 3000);
      },
      error => {
        // let errorJSON= JSON.parse(error.error);
        this.showErrorMessage=true;
        this.OTPerrorMsg=this.serice.globalErrorMsg;
        this.OTPerrorMsgflag=true;
        setTimeout(()=>{
          this.showErrorMessage=false;
          this.OTPerrorMsgflag=false;
          this.OTPerrorMsg=" "; 
        }, 3000);
      }
      )
  }

  profileCancel(){
    this.route.navigate(['/home', {email: this.register.username}]);
  }
}
