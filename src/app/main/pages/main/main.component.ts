import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../Model/menu';
import { MenuService } from '../../Service/menu.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  categoryData!:Menu[]

  fillerContent = Array.from(
    {length: 50},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );


  constructor(private mainService:MenuService, router:Router) {}
    
  ngOnInit(): void {
    this.getall()
  }

  getall():void{
    this.mainService.getall().subscribe((data:any)=>{
      this.categoryData=data.data
      console.log(this.categoryData)
    }
    ,error=>{
      
    });
  }
}
