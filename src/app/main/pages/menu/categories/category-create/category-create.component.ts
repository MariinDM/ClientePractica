import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/main/Model/category';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';
import { CategoryService } from '../Service/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  categoryForm!: FormGroup
  cat!: Category

  constructor(private categoryService: CategoryService, private fb: FormBuilder) { 
    this.createFrom()
  }

  ngOnInit(): void {
  }

  update() {
    this.setCategory();
    this.categoryService.insert(this.cat).subscribe({
      next: (v) => {
        successDialog('Registro Nuevo')
      },
      error: (e) => {errorMessage('Ocurrio un Error'),console.log(e)},
      complete: () => console.info('complete')
    })
  }

  createFrom(): void {
    this.categoryForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      icon: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      level: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    });
  }

  setCategory(): void {
    this.cat = {
      name: this.categoryForm.get('name')?.value,
      icon: this.categoryForm.get('icon')?.value,
      level: this.categoryForm.get('level')?.value,
      status: true,
    }
  }

}
