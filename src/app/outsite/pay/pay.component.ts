import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TreeService} from '../../tree.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  ngOnInit(): void {

    let user = JSON.parse(localStorage.getItem('user'));
    this.id = user['id'];
    this.service.getUser(this.id).subscribe(data => {
      this.user = data['data'];
      console.log(data);
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
    console.log(this.items)
  }
  get f() { return this.orderForm.controls; }
  saveOrder() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let orderDetails = [];
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      let orderDetail = {
        "treeId": item['product']['id'],
        "unitPrice": item['product']['price'],
        "quantity": item['quantity'],
        "order_id": "",
      }
      orderDetails.push(orderDetail);
    }
    this.submitted = true;
    if (this.orderForm.invalid) {
      return; }
    this.loading = true;
    console.log(orderDetails);
    let data = {
      "shipAddress": this.f.shipAddress.value,
      "shipPhone": this.f.shipPhone.value,
      "orderDetails": orderDetails,
      "user_id": this.id,
    }
    console.log(data);
    this.service.addOrder(data).subscribe((data) => {
        console.log(data);
        this.order = data;
      },
      (error) => console.log(error),
      () => console.log('Complete')
    );
  }

}
