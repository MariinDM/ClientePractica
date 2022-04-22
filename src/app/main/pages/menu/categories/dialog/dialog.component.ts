import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/main/Model/category';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';
import { CategoryService } from '../Service/category.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  categoryForm!: FormGroup
  cat!: Category
  dataCategory!: any[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private categoryService: CategoryService, private fb: FormBuilder) {
    this.createFrom()
  }

  ngOnInit(): void {
    this.getone()
    this.setCategory2()
  }

  getone() {
    this.categoryService.getone(this.data.id).subscribe({
      next: (v) => {
        this.cat = v.data,
          console.log(this.cat)
      },
      error: (e) => errorMessage('Ocurrio un problema')
    })
  }
  update() {
    this.setCategory();
    this.categoryService.update(this.data.id, this.cat).subscribe({
      next: (v) => {
        successDialog('Registro Actualizado')
      },
      error: (e) => errorMessage('Ocurrio un Error'),
      complete: () => console.info('complete')
    })
  }

  createFrom(): void {
    this.categoryForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      icon: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      level: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    });
  }

  setCategory(): void {
    this.cat = {
      name: this.categoryForm.get('name')?.value,
      icon: this.categoryForm.get('icon')?.value,
      level: this.categoryForm.get('level')?.value,
      status: this.cat.status,
    }
  }
  setCategory2(): void {
    this.cat = {
      name: '',
      icon: '',
      level: '',
      status: ''
    }
  }

}
