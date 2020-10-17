import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeService } from 'src/app/tree.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {
  tree: any = {};
  idTree:string;
  listTree: any[];
  id: any;
  p: any;
  user: any[];
  url: string;
  shopName: string;
  constructor(private http: HttpClient, private service: TreeService,  private route: ActivatedRoute) {
    this.idTree = this.route.snapshot.paramMap.get('id');
    this.getTree(this.idTree); }

  ngOnInit(): void {
    this.service.getAllUser().subscribe(data => {
        //@ts-ignore
        this.user = data.datas ;
        console.log(this.user);
      },
      (error) => console.log(error),
      () => console.log("Complete")
    )
this.loadData();
  }
  loadData():void{

    this.service.getAllTree().subscribe(data => {
        //@ts-ignore
        this.listTree = data.datas ;
        console.log(this.listTree);
      },
      (error) => console.log(error),
      () => console.log("Complete")
    )
  }
  getTree(id) {
    this.service.getTreeService(id).subscribe(data => {
      console.log(data['data']);
      this.tree = data['data'];
      this.tree.user_id = this.id;
    });
   }
  getUserShopName(id): string {
    for (let i = 0; i < this.user.length; i++) {
      if(this.user[i].id == id){
        return this.user[i].shopName;
      }
    }
    return 'lỗi';
  }
  getUserShopImage(id): string {
    for (let i = 0; i < this.user.length; i++) {
      if(this.user[i].id == id){
        this.url = this.user[i].avatar
        return this.url ;
      }
    }
    return 'lỗi';
  }
  addToCart(id)
  {
    let item = {
      product: this.getTree(id),
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
    alert("Them cay thanh cong!");
  }

}
