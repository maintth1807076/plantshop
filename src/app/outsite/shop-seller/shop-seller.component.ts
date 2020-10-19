import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {TreeService} from '../../tree.service';
import {ActivatedRoute, Router} from '@angular/router';
import {takeWhile} from 'rxjs/operators';
declare let alertify : any;
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
  tree: any = {};
  p: any;
  listCategory: any[];
  listTree: any[];
  users: any[];
  alive: boolean = true;
  constructor(private storage: AngularFireStorage, private fb: FormBuilder, private service: TreeService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.id = user['id'];
    this.service.getUser(this.id).subscribe(data => {
      this.user = data['data'];
      this.url = this.user.avatar;
    });
    this.service.getAllUser().subscribe(data => {
        //@ts-ignore
        this.users = data.datas ;
      },
      (error) => console.log(error),
      () => console.log("Complete")
    )
    this.getCategory();
    this.loadData();
  }
  getUserShopName(id): string {
    for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].id == id){
        return this.users[i].shopName;
      }
    }
    return 'lỗi';
  }
  getCategory(): void {

    this.service.getAllCategory().subscribe(data => {
        this.listCategory = data['datas'];
      },
      (error) => console.log(error),
      () => console.log('Complete')
    );
  }
  getTree(id) {
    this.service.getTreeService(id).subscribe(data => {
      this.tree = data['data'];
      this.tree.user_id = this.id;
    });
  }
  loadData(): void {

    this.service.getAllTreeByUserId(this.id)
      .pipe(takeWhile(() => this.alive)).subscribe(data => {
        // @ts-ignore
        this.listTree = data.datas;
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
    alertify.set('notifier','position', 'top-right');
    alertify.success('Thêm thành công!');
  }
  findTreeById(id): {} {
    for (var i = 0; i < this.listTree.length; i++) {
      if (this.listTree[i].id == id) {
        return this.listTree[i];
      }
    }
  }
}
