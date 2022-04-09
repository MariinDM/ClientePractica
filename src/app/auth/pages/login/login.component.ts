import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { errorMessage, timeMessage } from 'src/app/shared/alerts/alerts';
import { UserLogin } from '../../Model/user';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
  }
  loginForm!:FormGroup;
  user!:UserLogin;

  constructor(public authService: AuthService,public router:Router,private fb:FormBuilder) {
    this.createFrom();
  }

  login() {
    if(this.loginForm.invalid){
      return Object.values(this.loginForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setUser();
      this.authService.login(this.user).subscribe((data:any)=>{
        timeMessage('Sesion Iniciada',1500)
        this.router.navigate(['/main/home'])
      },error=>{
        errorMessage('Email o Contraseña Incorrecta')
      });
    }
  }

  createFrom():void{
    this.loginForm = this.fb.group({
      email:['', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    });
  }

  get getEmail(){
    return this.loginForm.get('email') && this.loginForm.get('email')?.touched
  }
  get getPassword(){
    return this.loginForm.get('password') && this.loginForm.get('password')?.touched
  }

  setUser():void{
    this.user = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }
  }
}
