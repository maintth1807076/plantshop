import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder} from '@angular/forms';
import {TreeService} from '../tree.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-outsite',
  templateUrl: './outsite.component.html',
  styleUrls: ['./outsite.component.css']
})
export class OutsiteComponent implements OnInit {
  id: any;
  total: number;
  items: any[];
  checkLogin: boolean;
  user: any = {};
  url: string;

  constructor(private storage: AngularFireStorage, private fb: FormBuilder, private service: TreeService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.id = user['id'];
    if (user == null) {
      this.checkLogin = false;
    }else {
      this.checkLogin = true;
    }
    this.service.getUser(this.id).subscribe(data => {
      this.user = data['data'];
      this.url = this.user.avatar;
    });
    this.loadCart();
  }

  async ngAfterViewInit() {
    await this.loadScript('/assets/js/jquery.js');
    await this.loadScript('/assets/js/plugins.js');
    await this.loadScript('/assets/js/alertify.min.js');
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
    });
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart != null && cart.length > 0) {
      for (var i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        this.items.push({
          'image': item.image,
          'product': item.product,
          'quantity': item.quantity
        });
        this.total += item.product.price * item.quantity;
      }
    }
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
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }

  logout() {
    this.service.doLogout().subscribe(data => {
      },
      (error) => console.log(error),
      () => {
        localStorage.removeItem('user');
        location.href = '/home';
        console.log('Complete');
      }
    );

  }
}
