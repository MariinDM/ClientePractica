
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { View } from 'src/app/main/Model/view';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';
import { CategoryService } from '../../categories/Service/category.service';
import { ViewService } from '../Service/view.service';

@Component({
  selector: 'app-view-create',
  templateUrl: './view-create.component.html',
  styleUrls: ['./view-create.component.css']
})
export class ViewCreateComponent implements OnInit {

  viewForm!: FormGroup
  view!: View
  dataCategories!: any[]

  constructor(private viewService: ViewService, private categoryService:CategoryService, private fb: FormBuilder) { 
    this.createFrom()
  }

  ngOnInit(): void {
    this.getallCategories()
  }

  insert() {
    this.setView();
    this.viewService.insert(this.view).subscribe({
      next: (v) => {
        successDialog('Registro Nuevo')
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
      category_id: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    });
  }

  setView(): void {
    this.view = {
      name: this.viewForm.get('name')?.value,
      icon: this.viewForm.get('icon')?.value,
      level: this.viewForm.get('level')?.value,
      route: this.viewForm.get('route')?.value,
      category_id: this.viewForm.get('category_id')?.value,
      status: true,
    }
  }

  getallCategories(): void {
    this.categoryService.getall().subscribe((data: any) => {
      this.dataCategories = data.data
      // console.log(this.dataCategories)
    })
  }

}
