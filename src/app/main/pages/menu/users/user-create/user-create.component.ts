import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/Model/user';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';
import { RolService } from '../../roles/Service/rol.service';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm!: FormGroup
  user!: User
  dataRoles!: any[]

  constructor(private userService: UserService, private rolService: RolService, private fb: FormBuilder) {
    this.createFrom()
  }

  ngOnInit(): void {
    this.getallRoles()
  }

  insert() {
    this.setUser();
    this.userService.insert(this.user).subscribe({
      next: (v) => {
        successDialog('Registro Nuevo')
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
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      role_id: new FormControl('', [Validators.required]),
    });
  }

  setUser(): void {
    this.user = {
      username: this.userForm.get('username')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      role_id: this.userForm.get('role_id')?.value,
      status: true,
    }
  }
  getallRoles(): void {
    this.rolService.getall().subscribe((data:any)=>{
      this.dataRoles = data.data
    })
  }
}
