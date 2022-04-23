import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { errorMessage, successDialog } from 'src/app/shared/alerts/alerts';
import { DialogUserComponent } from '../dialog-user/dialog-user.component';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements AfterViewInit {

  dataUser!: any[]

  displayedColumns: string[] = ['username', 'email', 'role_id', 'status', 'options'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator | any;
  @ViewChild(MatSort) sort!: MatSort | any;

  constructor(private userService: UserService , public dialog: MatDialog) {

    this.getall()

  }
  getall():void{
    this.userService.getall().subscribe((data: any) => {
      // console.log(data.data) 
      this.dataUser = data.data
      
      // console.log(this.dataUser)
      const user = this.dataUser

      this.dataSource = new MatTableDataSource(user);

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
    this.dialog.open(DialogUserComponent, {
      data: {
        id: id
      }
    });
    console.log(id)
  }


  delete(id:number):void{
    this.userService.delete(id).subscribe({
      next:(v)=>successDialog('Estatus Actualizado'),
      error:(e)=>errorMessage('Ocurrio un Error'),
      complete:()=>console.info('Completed')
    })
  }

}
