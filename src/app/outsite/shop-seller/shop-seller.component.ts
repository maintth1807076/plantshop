import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {TreeService} from '../../tree.service';
import {ActivatedRoute, Router} from '@angular/router';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-shop-seller',
  templateUrl: './shop-seller.component.html',
  styleUrls: ['./shop-seller.component.css']
})
export class ShopSellerComponent implements OnInit {
  id: any;
  loading = false;
  submitted = false;
  user: any = {};
  url: string;
  p: any;
  listCategory: any[];
  listTree: any[];
  alive: boolean = true;
  constructor(private storage: AngularFireStorage, private fb: FormBuilder, private service: TreeService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.id = user['id'];
    this.service.getUser(this.id).subscribe(data => {
      this.user = data['data'];
      this.url = this.user.avatar;
      console.log(data);
    });
    this.getCategory();
    this.loadData();
  }
  getCategory(): void {

    this.service.getAllCategory().subscribe(data => {
        this.listCategory = data['datas'];
        console.log(this.listCategory);
      },
      (error) => console.log(error),
      () => console.log('Complete')
    );
  }
  loadData(): void {

    this.service.getAllTreeByUserId(this.id)
      .pipe(takeWhile(() => this.alive)).subscribe(data => {
        // @ts-ignore
        this.listTree = data.datas;
        console.log(this.listTree);
      },
      (error) => console.log(error),
      () => console.log('Complete')
    );
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
