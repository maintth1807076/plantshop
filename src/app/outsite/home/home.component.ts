import { Component, OnInit } from '@angular/core';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import {TreeService} from '../../tree.service'
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { from } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listTree: any[];
  tree: {}

  constructor( private http: HttpClient, private service: TreeService) {

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