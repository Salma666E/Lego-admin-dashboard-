import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgAuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // profileForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });

  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })
  constructor(private fb: FormBuilder, private ngAuthService: NgAuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.ngAuthService.SignIn(this.profileForm.get('email').value, this.profileForm.get('password').value)
  }

  get email() { return this.profileForm.get('email'); }
  

  get password() { return this.profileForm.get('password'); }

}
