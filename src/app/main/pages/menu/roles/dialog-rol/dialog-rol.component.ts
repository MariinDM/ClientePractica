import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from 'src/app/main/Model/rol';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';
import { RolService } from '../Service/rol.service';

@Component({
  selector: 'app-dialog-rol',
  templateUrl: './dialog-rol.component.html',
  styleUrls: ['./dialog-rol.component.css']
})
export class DialogRolComponent implements OnInit {

  rolForm!: FormGroup
  rol!: Rol
  dataRol!: any[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private viewService: RolService, private fb: FormBuilder) {
    this.createFrom()
  }

  ngOnInit(): void {
    this.getone()
    this.setRol2()
  }

  getone() {
    this.viewService.getone(this.data.id).subscribe({
      next: (v) => {
        this.rol = v.data,
          console.log(this.rol)
      },
      error: (e) => errorMessage('Ocurrio un problema')
    })
  }
  update() {
    this.setRol();
    this.viewService.update(this.data.id, this.rol).subscribe({
      next: (v) => {
        successDialog('Registro Actualizado')
        console.log(this.rol)
      },
      error: (e) => errorMessage('Ocurrio un Error'),
      complete: () => console.info('complete')
    })
  }

  createFrom(): void {
    this.rolForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  setRol(): void {
    this.rol = {
      name: this.rolForm.get('name')?.value,
      status: this.rol.status,
    }
  }
  setRol2(): void {
    this.rol = {
      name: '',
      status: ''
    }
  }

}
