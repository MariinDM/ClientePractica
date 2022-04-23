import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/Model/user';
import { AuthService } from 'src/app/auth/Service/auth.service';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  authForm!:FormGroup
  hide = true
  user!: User
  password!:any

  constructor(private authService: AuthService, private fb:FormBuilder) {
    this.setUser2()
    this.createFrom()
   }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    this.authService.getUser().subscribe({
      next: (v) => { 
        this.user = v.data, 
        console.log(this.user) 
      },
      error: (e) => 'Ocurrio un Error',
      complete: () => console.info('Completed')
    })
  }
  setUser2(): void{
    this.user = {
      username: '',
      email: '',
      password: '',
      role_id: 1,
      status: true,

    }
  }
  update() {
    this.setRol();
    this.authService.changePassword2(this.password).subscribe({
      next: (v) => {
        successDialog('Registro Actualizado')
        console.log(this.password)
      },
      error: (e) => errorMessage('Ocurrio un Error'),
      complete: () => console.info('complete')
    })
  }

  createFrom(): void {
    this.authForm = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  setRol(): void {
    this.password = {
      password: this.authForm.get('password')?.value,
    }
  }

}
