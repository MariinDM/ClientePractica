import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { DialogComponent } from '../dialog/dialog.component';
import { CategoryService } from '../Service/category.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {

  dataCategories!: any[]
  
  displayedColumns: string[] = ['name', 'icon', 'level', 'status', 'options'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator | any;
  @ViewChild(MatSort) sort!: MatSort | any;

  constructor(private categoryService: CategoryService, public dialog: MatDialog) {
    this.getall()
  }

  getall(): void {
    this.categoryService.getall().subscribe((data: any) => {
      this.dataCategories = data.data

      // console.log(this.dataCategories)
      const category = this.dataCategories

      this.dataSource = new MatTableDataSource(category);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(id: number) {
    this.dialog.open(DialogComponent, {
      data: {
        id: id
      },
      width:'50%',
      height:'55%'
    });
    // console.log(id)
  }

  openCategory() {
    this.dialog.open(CategoryCreateComponent, {
      width:'50%',
      height:'60%'
    })
  }


  delete(id: number): void {
    this.categoryService.delete(id).subscribe({
      next: (v) => successDialog('Cambio Actualizado'),
      error: (e) => errorMessage('Ocurrio un Error'),
      complete: () => console.info('Completed')
    })
  }
}