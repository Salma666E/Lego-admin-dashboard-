import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/Admins/admin.service';
import { NgAuthService } from 'src/app/Services/Auth/auth.service';
import { IAdmin } from 'src/app/ViewModels/IAdmin';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  admin:IAdmin = {email: '',loggedin:true, password: '', name:'Nour'};
  @ViewChild('mySidenav') sideNav: ElementRef;
  constructor(private adminSrv:AdminService, private authSrv:NgAuthService) { }

  openNav() {
    this.sideNav.nativeElement.style.marginLeft = "0";
  }
  
  closeNav() {
    this.sideNav.nativeElement.style.marginLeft = "-250px";
  }

  logout() {
    this.authSrv.SignOut();
  }

  ngOnInit(): void {
    this.adminSrv.getAdminByID(1).subscribe(
      (res)=>{this.admin=res},
      (err)=>{console.log(err)}
    );
  }

}