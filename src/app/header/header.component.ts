import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from '../services/loginservice.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavService } from '../services/side-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  title: string = "Dashboard";      

  constructor(private sideNavService: SideNavService) {

  }

  // clickMenu() { 
  //   this.sideNavService.toggle();
  // }
  // email: String = '';

  // constructor(private loginservice: LoginserviceService,
  //             private router: ActivatedRoute,
  //             private route: Router) {
  //             this.email=this.router.snapshot.paramMap.get('email') || '{}'
  //           }

  //   logout(){
  //     this.loginservice.logout();
  //     this.route.navigate(['login']);
  //   }
  
  //   changePassword(email: String){
  //     this.route.navigate(['changePassword', {email: email}])
  //   }
  
  //   profileUpdate(email: String) {
  //     this.route.navigate(['profile', {email: email}])
  //   }

  // ngOnInit(): void {
  // }

}

