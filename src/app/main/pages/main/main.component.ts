import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/Service/auth.service';
import { Menu } from '../../Model/menu';
import { MenuService } from '../../Service/menu.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  categoryData!:any[]


  constructor(private mainService:MenuService, private authService:AuthService, private router:Router) {}
  
    
  ngOnInit(): void {
    this.getall()
  }

  getall():void{
    this.mainService.getall().subscribe((data:any)=>{
      this.categoryData=data.data
      // console.log(this.categoryData)
    }
    ,error=>{
      
    });
  }
  logout():void{
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }
}
