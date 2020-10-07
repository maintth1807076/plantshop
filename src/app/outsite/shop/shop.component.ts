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
  items: any[];
  totalPrice: number;

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
  addToCart(id)
  {
    let item = {
      product: this.findTreeById(id),
      quantity: 1
    };
    if (localStorage.getItem('cart') == null) {
      let cart: any = [];
      cart.push(JSON.stringify(item));
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      let cart: any = JSON.parse(localStorage.getItem('cart'));
      let index: number = -1;
      for (var i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        if (item.product.id == id) {
          index = i;
          break;
        }
      }
      if (index == -1) {
        cart.push(JSON.stringify(item));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let item = JSON.parse(cart[index]);
        item.quantity += 1;
        cart[index] = JSON.stringify(item);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
  }
  }
  findTreeById(id): {} {
    for (var i = 0; i < this.listTree.length; i++) {
      if (this.listTree[i].id == id) {
        return this.listTree[i];
      }
    }
  }
}
