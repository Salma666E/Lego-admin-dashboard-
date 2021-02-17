import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/Admins/admin.service';
import { IAdmin } from 'src/app/ViewModels/IAdmin';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  adminList: IAdmin[];
  constructor(private adminSrv:AdminService, private router:Router) { }

  ngOnInit(): void {
    this.adminSrv.getAllAdmins().subscribe(
      (res)=>{
        this.adminList=res
      },
      (err)=>{console.log(err)}
    )
  }

  goToAddAdmin() {
    this.router.navigate(['Admin/AddAdmin']);
  }

  deleteAdmin(id) {
    this.adminSrv.deleteAdmin(id).subscribe(
      (resp)=>{
        this.adminSrv.getAllAdmins().subscribe(
          (res)=>{
            this.adminList=res
          },
          (err)=>{console.log(err)}
        )
      },
      (err)=>{console.log(err)}
    )
  }

}
