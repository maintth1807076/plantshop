import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import {TreeService} from '../../tree.service'
import { Router } from '@angular/router';
declare let alertify : any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  id: any;
  p: any;
  listTree: any[];
  listTree1: any[];
  listTreeFix: any[];
  listCategory: any[];
  items: any[];
  total: number;
  constructor( private http: HttpClient, private service: TreeService, private router: Router,) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData():void{
    this.service.getAllCategory().subscribe(data => {
        this.listCategory = data['datas'];
        console.log(data);
      },
      (error) => console.log(error),
      () => console.log("Complete")
    )
    this.service.getAllTree().subscribe(data => {
        this.listTree = data['datas'];
        this.listTree1 = data['datas'];
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
    alertify.set('notifier','position', 'top-right');
    alertify.success('Thêm thành công!');
  }
  loadCart(): void {
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart != null && cart.length > 0) {
      for (var i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        this.items.push({
          'image': item.product['image'],
          'product': item.product,
          'quantity': item.quantity
        });
        this.total += item.product.price * item.quantity;
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
  findTreeByCategoryId(id) {
    this.service.getAllTreeByCategoryId(id).subscribe(data => {
        this.listTree = data['datas'];
      },
      (error) => console.log(error),
      () => console.log("Complete")
    )
  }
}
