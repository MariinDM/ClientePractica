import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';
import { DialogViewComponent } from '../dialog-view/dialog-view.component';
import { ViewService } from '../Service/view.service';
import { ViewCreateComponent } from '../view-create/view-create.component';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements AfterViewInit {

  dataViews!: any[]

  displayedColumns: string[] = ['name', 'icon', 'level', 'route', 'category','status', 'options'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator | any;
  @ViewChild(MatSort) sort!: MatSort | any;

  constructor(private viewService: ViewService, public dialog: MatDialog) {

    this.getall()

  }
  getall():void{
    this.viewService.getall().subscribe((data: any) => {
      this.dataViews = data.data

      console.log(this.dataViews)
      const view = this.dataViews

      this.dataSource = new MatTableDataSource(view);

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

  openDialog(id:number) {
    this.dialog.open(DialogViewComponent, {
      data: {
        id: id
      },
      width:'40%',
      height: '70%'
    });
    console.log(id)
  }

  openView() {
    this.dialog.open(ViewCreateComponent, {
      width:'40%',
      height: '80%'
    })
  }

  delete(id:number):void{
    this.viewService.delete(id).subscribe({
      next:(v)=>successDialog('Cambio Actualizado'),
      error:(e)=>errorMessage('Ocurrio un Error'),
      complete:()=>console.info('Completed')
    })
  }

}
