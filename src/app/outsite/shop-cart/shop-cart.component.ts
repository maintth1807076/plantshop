import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {

  items: any[];
  total: number;
  id: any;
  p: any;
  listTree: any[];
  totalPrice: number;
  constructor() { }

  ngOnInit(): void {
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

  remove(id: string): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      if (item.product.id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
    console.log(this.items)
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
