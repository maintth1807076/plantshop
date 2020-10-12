import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder} from '@angular/forms';
import {TreeService} from '../../tree.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-shop-seller',
  templateUrl: './shop-seller.component.html',
  styleUrls: ['./shop-seller.component.css']
})
export class ShopSellerComponent implements OnInit {
  id: any;
  user: any = {};
  url: string;
  constructor(private storage: AngularFireStorage, private fb: FormBuilder, private service: TreeService,  private router: Router,   private route: ActivatedRoute) { }


  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.id = user['id'];
    this.service.getUser(this.id).subscribe(data => {
      this.user = data['data'];
      this.url = this.user.avatar;
      console.log(data);
    });
  }

}
