import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { errorMessage, timeMessage } from 'src/app/shared/alerts/alerts';
import { UserLogin } from '../../Model/user';
import { AuthService } from '../../Service/auth.service';
import { DialogAuthComponent } from '../dialog-auth/dialog-auth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
  }
  loginForm!: FormGroup;
  user!: UserLogin;

  constructor(public authService: AuthService, public router: Router, private fb: FormBuilder, private spinner: NgxSpinnerService, public dialog: MatDialog) {
    this.createFrom();
  }

  login() {
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      this.setUser();

      //SPINNER
      this.spinner.show()
      setTimeout(() => {
        this.spinner.hide()
      }, 1000);
      //PETICION
      this.authService.login(this.user).subscribe({
        next: (v) => {
          this.router.navigate(['/main/home'])
        },
        error: (e) => 
          errorMessage('Email o Contraseña Incorrrectas'),
          // console.log(e)
        complete: () => console.info('complete')
      })
    }
  }

  createFrom(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  setUser(): void {
    this.user = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }
  }
  openDialog() {
    this.dialog.open(DialogAuthComponent)
  }
}
