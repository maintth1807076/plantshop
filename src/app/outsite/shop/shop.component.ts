import { Component, OnInit } from '@angular/core';
import $ from 'jquery'
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import {TreeService} from '../../tree.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  id: any;
  p: any;
  listTree: any[];
  

  constructor( private http: HttpClient, private service: TreeService, private router: Router,) {

   }

  ngOnInit(): void {
    this.loadData();
  }

loadData():void{

  this.service.getAllTree().subscribe((data:any[]) => {
    //@ts-ignore
   this.listTree = data.datas ;
   console.log(this.listTree);
  },
  (error) => console.log(error),
() => console.log("Complete")
  )
}
}
