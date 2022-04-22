import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { View } from 'src/app/main/Model/view';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';
import { ViewService } from '../Service/view.service';

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.css']
})
export class DialogViewComponent implements OnInit {

  viewForm!: FormGroup
  view!: View
  dataViews!: any[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private viewService: ViewService, private fb: FormBuilder) {
    this.createFrom()
  }

  ngOnInit(): void {
    this.getone()
    this.setView2()
  }

  getone() {
    this.viewService.getone(this.data.id).subscribe({
      next: (v) => {
        this.view = v.data,
          console.log(this.view)
      },
      error: (e) => errorMessage('Ocurrio un problema')
    })
  }
  update() {
    this.setView();
    this.viewService.update(this.data.id, this.view).subscribe({
      next: (v) => {
        successDialog('Registro Actualizado')
        console.log(this.view)
      },
      error: (e) => errorMessage('Ocurrio un Error'),
      complete: () => console.info('complete')
    })
  }

  createFrom(): void {
    this.viewForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      icon: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      level: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      route: new FormControl('', [Validators.required]),
      category_id: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    });
  }

  setView(): void {
    this.view = {
      name: this.viewForm.get('name')?.value,
      icon: this.viewForm.get('icon')?.value,
      level: this.viewForm.get('level')?.value,
      route: this.viewForm.get('route')?.value,
      category_id: this.viewForm.get('category_id')?.value,
      status: this.view.status,
    }
  }
  setView2(): void {
    this.view = {
      name: '',
      icon: '',
      level: '',
      route: '',
      category_id: '',
      status: ''
    }
  }

}
