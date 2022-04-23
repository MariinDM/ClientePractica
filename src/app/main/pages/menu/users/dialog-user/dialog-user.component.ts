import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/auth/Model/user';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {

  userForm!: FormGroup
  user!: User
  dataUser!: any[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private fb: FormBuilder) {
    this.createFrom()
  }

  ngOnInit(): void {
    this.getone()
    this.setView2()
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
    this.setView();
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
      email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.email]),
      role_id: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    });
  }

  setView(): void {
    this.user = {
      username: this.userForm.get('username')?.value,
      email: this.userForm.get('email')?.value,
      password: this.user.password,
      role_id: this.userForm.get('role_id')?.value,
      status: this.user.status,
    }
  }
  setView2(): void {
    this.user = {
      username: '',
      email: '',
      password: '',
      role_id: 1,
      status: true
    }
  }

}
