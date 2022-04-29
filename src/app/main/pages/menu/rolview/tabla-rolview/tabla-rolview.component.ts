import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabla-rolview',
  templateUrl: './tabla-rolview.component.html',
  styleUrls: ['./tabla-rolview.component.css']
})
export class TablaRolviewComponent implements AfterViewInit {

  displayedColumns: string[] = ['rol_id', 'options'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator | any;
  @ViewChild(MatSort) sort!: MatSort | any;

  constructor() { }

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
  getall():void{
    // this.userService.getall().subscribe((data: any) => {
      // console.log(data.data) 
      // this.dataUser = data.data
      
      // console.log(this.dataUser)
      // const user = this.dataUser

    //   this.dataSource = new MatTableDataSource(user);

    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // })
  }

  openDialog(id:number) {
    // this.dialog.open(DialogUserComponent, {
    //   data: {
    //     id: id
    //   },
    //   width:'40%',
    //   height: '55%'
    // });
    // console.log(id)
  }

}
