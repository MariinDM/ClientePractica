import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Rol } from 'src/app/main/Model/rol';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';
import { RolService } from '../Service/rol.service';

@Component({
  selector: 'app-rol-create',
  templateUrl: './rol-create.component.html',
  styleUrls: ['./rol-create.component.css']
})
export class RolCreateComponent implements OnInit {

  rolForm!: FormGroup
  rol!: Rol

  constructor(private rolService: RolService, private fb: FormBuilder) { 
    this.createFrom()
  }

  ngOnInit(): void {
  }

  insert() {
    this.setRol();
    this.rolService.insert(this.rol).subscribe({
      next: (v) => {
        successDialog('Registro Nuevo')
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
      status: true,
    }
  }
}
