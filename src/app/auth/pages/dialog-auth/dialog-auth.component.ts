import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';
import { UserLogin } from '../../Model/user';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-dialog-auth',
  templateUrl: './dialog-auth.component.html',
  styleUrls: ['./dialog-auth.component.css']
})
export class DialogAuthComponent implements OnInit {

  authForm!: FormGroup
  auth!: UserLogin

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.createFrom()
  }

  ngOnInit(): void {
    // this.setCategory2()
  }

  update() {
    this.setCategory();
    this.authService.changePassword1(this.auth).subscribe({
      next: (v) => {
        successDialog('Registro Actualizado')
      },
      error: (e) => errorMessage('Ocurrio un Error'),
      complete: () => console.info('complete')
    })
  }

  createFrom(): void {
    this.authForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  setCategory(): void {
    this.auth = {
      email: this.authForm.get('email')?.value,
      password: this.authForm.get('password')?.value,
    }
  }
  setCategory2(): void {
    this.auth = {
      email: '',
      password: '',
    }
  }
}
