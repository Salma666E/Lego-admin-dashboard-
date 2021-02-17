import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/Services/Admins/admin.service';
import { IAdmin } from 'src/app/ViewModels/IAdmin';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {

  newAdmin: IAdmin;
  subscribtion: Subscription | null = null;
  @ViewChild('Password') Password: ElementRef = new ElementRef('input');
  @ViewChild('Name') Name: ElementRef = new ElementRef('input');
  @ViewChild('Email') Email: ElementRef = new ElementRef('input');
  constructor(private router: Router, private adminSrv: AdminService) {
  }

  ngOnInit(): void {
    
  }
  addAdmin() {
    this.newAdmin = {
      email: this.Email.nativeElement.value,
      password: this.Password.nativeElement.value,
      name: this.Name.nativeElement.value,
      loggedin: false
    };
    this.adminSrv.addAdmin(this.newAdmin).subscribe(
      (res) => {
        this.router.navigate([`/Admin/Admins`]);
        alert("Admin added....");
      },
      (err) => { console.log(err) }
    );
  }

}
