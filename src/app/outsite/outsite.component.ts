import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outsite',
  templateUrl: './outsite.component.html',
  styleUrls: ['./outsite.component.css']
})
export class OutsiteComponent implements OnInit {
  total: number;
  items: any[];
  constructor() { }

  ngOnInit(): void {
    this.loadCart();
  }

  async ngAfterViewInit() {
    await this.loadScript('/assets/js/jquery.js');
    await this.loadScript('/assets/js/plugins.js');
    await this.loadScript('/assets/js/functions.js');
    await this.loadScript('/assets/plugins/range-slider/rangeslider.js');
    await this.loadScript('/assets/js/custom.js');

  }
  loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
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
        "quantity": item.quantity
      });
      this.total += item.product.price * item.quantity;
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
}
