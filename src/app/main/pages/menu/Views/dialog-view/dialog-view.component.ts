import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { View } from 'src/app/main/Model/view';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';
import { CategoryService } from '../../categories/Service/category.service';
import { ViewService } from '../Service/view.service';

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.css']
})
export class DialogViewComponent implements OnInit {

  viewForm!: FormGroup
  view!: View
  dataCategories!: any[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private viewService: ViewService, private categoryService: CategoryService, private fb: FormBuilder) {
    this.createFrom()
  }

  ngOnInit(): void {
    this.getone()
    timer(300).subscribe(()=>{
      this.setValue()
    })
    this.getallCategories()
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
      level: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
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

  setValue(){
    this.viewForm.controls['name'].setValue(this.view.name)
    this.viewForm.controls['icon'].setValue(this.view.icon)
    this.viewForm.controls['level'].setValue(this.view.level)
    this.viewForm.controls['route'].setValue(this.view.route)
    this.viewForm.controls['category_id'].setValue(this.view.category_id)
  }

  getallCategories(): void {
    this.categoryService.getall().subscribe((data: any) => {
      this.dataCategories = data.data
      // console.log(this.dataCategories)
    })
  }
}
