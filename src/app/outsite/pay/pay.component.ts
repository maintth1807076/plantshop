import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TreeService} from '../../tree.service';
import {ActivatedRoute, Router} from '@angular/router';
declare let alertify : any;
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  constructor(private storage: AngularFireStorage, private fb: FormBuilder, private service: TreeService,  private router: Router,   private route: ActivatedRoute) { }

  items: any[];
  total: number;
  id: any;
  p: any;
  listTree: any[];
  totalPrice: number;
  user: any = {};
  order: any = {};
  orderForm: FormGroup;
  loading = false;
  submitted = false;
  orderId: any;
  ngOnInit(): void {

    let user = JSON.parse(localStorage.getItem('user'));
    this.id = user['id'];
    this.service.getUser(this.id).subscribe(data => {
      this.user = data['data'];
    });
    this.orderForm = this.fb.group({
      shipAddress: ['', Validators.required],
      shipPhone: ['', Validators.required],
    });
    this.loadCart();

  }
  loadCart(): void {
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        "image": item.image,
        "product" : item.product,
        "quantity": item.quantity,
        "description":item.description,
      });
      this.total += item.product.price * item.quantity;
      this.totalPrice += item.price * item.quantity;
    }
  }
  get f() { return this.orderForm.controls; }
  saveOrder() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let map = new Map<string, any[]>();
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      let orderDetail = {
        "treeId": item['product']['id'],
        "treeName": item['product']['name'],
        "unitPrice": item['product']['price'],
        "quantity": item['quantity'],
      }
      let arr = [];
      let sellerId = item.product.userId;
      if(map.has(sellerId)){
        let arrOld = map.get(sellerId);
        arrOld.push(orderDetail);
        map.set(sellerId, arrOld);
      } else {
        arr.push(orderDetail)
        map.set(sellerId, arr);
      }
    }
    this.submitted = true;
    if (this.orderForm.invalid) {
      return; }
    for (let entry of Array.from(map.entries())) {
      let key = entry[0];
      let value = entry[1];
      let data = {
        "shipAddress": this.f.shipAddress.value,
        "shipPhone": this.f.shipPhone.value,
        "orderDetails": value,
        "userId": this.id,
        "sellerId": key,
        "status": 1
      }
      this.service.addOrder(data).subscribe((data) => {
        },
        (error) => console.log(error),
        () => {
          this.loading = true;
         }
      );
    }
    localStorage.removeItem('cart');
    alertify.set('notifier','position', 'top-right');
    alertify.success('Đặt hàng thành công!');
    location.href = '/user/order';
  }

 pay() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let map = new Map<string, any[]>();
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      let orderDetail = {
        "treeId": item['product']['id'],
        "unitPrice": item['product']['price'],
        "quantity": item['quantity'],
        "treeName": item['product']['name'],
      }
      let arr = [];
      let sellerId = item.product.userId;
      if(map.has(sellerId)){
        let arrOld = map.get(sellerId);
        arrOld.push(orderDetail);
        map.set(sellerId, arrOld);
      } else {
        arr.push(orderDetail)
        map.set(sellerId, arr);
      }
    }
    this.submitted = true;
    if (this.orderForm.invalid) {
      return; }
    for (let entry of Array.from(map.entries())) {
      let key = entry[0];
      let value = entry[1];
      let data = {
        "shipAddress": this.f.shipAddress.value,
        "shipPhone": this.f.shipPhone.value,
        "orderDetails": value,
        "userId": this.id,
        "sellerId": key,
        "status": 3
      }
      this.service.addOrder(data).subscribe((data) => {
          console.log(data)
        },
        (error) => console.log(error),
        () => {
          this.loading = true;
        }
      );
    }
    localStorage.removeItem('cart');
    // fetch('https://us-central1-appvnpay-e324e.cloudfunctions.net/app/create_payment_url', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     amount: this.total,
    //     info: 'String',
    //     bill: 'billpayment',
    //     lang: 'vn',
    //   })
    // }).then(res => res.json()).then(data => {
    //     alertify.set('notifier','position', 'top-right');
    //     alertify.success('Thanh toán thành công!');
    //     console.log(data);
    //   // location.href = '/checkout';
    // });
  }
}
