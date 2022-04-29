import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, timeMessage } from 'src/app/shared/alerts/alerts';
import { User } from '../../Model/user';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ngOnInit(): void {
  }
  loginForm!: FormGroup;
  user!: User;

  constructor(public authService: AuthService, public router: Router, private fb: FormBuilder) {
    this.createFrom();
  }

  register() {
    this.setUser();
    this.authService.register(this.user).subscribe((data: any) => {
      timeMessage('Usuario Creado', 1000)
      this.router.navigate(['/main/home'])
    }, error => {
      errorMessage('Datos Incorrectos')
    });
  }

  createFrom(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),

    });
  }

  setUser(): void {
    this.user = {
      username: this.loginForm.get('username')?.value,
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      status: true,
      role_id: 1
    }
  }

}
