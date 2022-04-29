import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { User } from 'src/app/auth/Model/user';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';
import { RolService } from '../../roles/Service/rol.service';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {

  userForm!: FormGroup
  user!: User
  dataRoles!:any[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private rolService:RolService, private fb: FormBuilder) {
    this.createFrom()
  }

  ngOnInit(): void {
    this.getone()
    timer(300).subscribe(()=>{
      this.setValue()
    })
    this.getallRoles()
  }

  getone() {
    this.userService.getone(this.data.id).subscribe({
      next: (v) => {
        this.user = v.data,
          console.log(this.user)
      },
      error: (e) => errorMessage('Ocurrio un problema')
    })
  }
  update() {
    this.setUser();
    this.userService.update(this.data.id, this.user).subscribe({
      next: (v) => {
        successDialog('Registro Actualizado')
        console.log(this.user)
      },
      error: (e) => errorMessage('Ocurrio un Error'),
      complete: () => console.info('complete')
    })
  }

  createFrom(): void {
    this.userForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      role_id: new FormControl('', [Validators.required]),
    });
  }

  setUser(): void {
    this.user = {
      username: this.userForm.get('username')?.value,
      email: this.userForm.get('email')?.value,
      password: this.user.password,
      role_id: this.userForm.get('role_id')?.value,
      status: this.user.status,
    }
  }

  setValue(){
    this.userForm.controls['username'].setValue(this.user.username)
    this.userForm.controls['email'].setValue(this.user.email)
    this.userForm.controls['role_id'].setValue(this.user.role_id)
  }

  getallRoles(): void {
    this.rolService.getall().subscribe((data:any)=>{
      this.dataRoles = data.data
    })
  }

}
