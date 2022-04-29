import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timer } from 'rxjs';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private rolService: RolService, private fb: FormBuilder) {
    this.createFrom()
  }

  ngOnInit(): void {
    this.getone()
    timer(300).subscribe(()=>{
      this.setValue()
    })
  }

  getone() {
    this.rolService.getone(this.data.id).subscribe({
      next: (v) => {
        this.rol = v.data,
          console.log(this.rol)
      },
      error: (e) => errorMessage('Ocurrio un problema')
    })
  }
  update() {
    this.setRol();
    this.rolService.update(this.data.id, this.rol).subscribe({
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
  setValue(){
    this.rolForm.controls['name'].setValue(this.rol.name)
  }
}
