import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';
import { DialogRolComponent } from '../dialog-rol/dialog-rol.component';
import { RolCreateComponent } from '../rol-create/rol-create.component';
import { RolService } from '../Service/rol.service';

@Component({
  selector: 'app-table-rol',
  templateUrl: './table-rol.component.html',
  styleUrls: ['./table-rol.component.css']
})
export class TableRolComponent implements AfterViewInit {

  dataRol!: any[]

  displayedColumns: string[] = ['name', 'status', 'options'];
  dataSource!: MatTableDataSource<any>; 
  @ViewChild(MatPaginator) paginator!: MatPaginator | any;
  @ViewChild(MatSort) sort!: MatSort | any;


  constructor(private rolService: RolService, public dialog: MatDialog) {

    this.getall()

  }
  getall(): void {
    this.rolService.getall().subscribe((data: any) => {
      this.dataRol = data.data

      console.log(this.dataRol)
      const rol = this.dataRol

      this.dataSource = new MatTableDataSource(rol);

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
    this.dialog.open(DialogRolComponent, {
      data: {
        id: id
      },
      width:'40%',
      height:'40%'
    });
    console.log(id)
  }

  openRol() {
    this.dialog.open(RolCreateComponent,{
      width:'40%',
      height:'40%'
    })
  }


  delete(id: number): void {
    this.rolService.delete(id).subscribe({
      next: (v) => successDialog('Estatus Actualizado'),
      error: (e) => errorMessage('Ocurrio un Error'),
      complete: () => console.info('Completed')
    })
  }

}
