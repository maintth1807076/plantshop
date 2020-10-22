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
  listTreeFix: any[];
  listCategory: any[];
  items: any[];
  total: number;
  keyWord: string;
  categoryId: string;
  constructor( private http: HttpClient, private service: TreeService, private router: Router,) {
    var url = window.location.href;
    this.keyWord = this.getParameterByName('keyWord', url);
    this.categoryId = this.getParameterByName('categoryId', url);
    this.loadCategory();
    if(this.categoryId != null && this.categoryId.length > 0) {
      this.findTreeByCategoryId(this.categoryId);
    } else {
      this.loadData();
    }
  }

  ngOnInit(): void {

  }
  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  loadCategory() {
    this.service.getAllCategory().subscribe(data => {
        this.listCategory = data['datas'];
        console.log(data);
      },
      (error) => console.log(error),
      () => console.log("Complete")
    )
  }
  loadData():void{
    this.service.getAllTree().subscribe(data => {
        this.listTree = data['datas'];
        this.listTreeFix = data['datas'];
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
  sortByPrice(value) {
    console.log(value)
    if(value == 1) {
      this.service.getAllTreePriceAsc().subscribe(data => {
          this.listTree = data['datas'];
        },
        (error) => console.log(error),
        () => console.log("Complete")
      )
      // this.listTree = this.listTree.sort(function(a, b){ return a.price - b.price})
      console.log(this.listTree)
    }
    if(value == 2) {
      this.service.getAllTreePriceDesc().subscribe(data => {
          this.listTree = data['datas'];
        },
        (error) => console.log(error),
        () => console.log("Complete")
      )
      // this.listTree = this.listTree.sort(function(a, b){ return b.price - a.price})
      console.log(this.listTree)
    }
  }
}
