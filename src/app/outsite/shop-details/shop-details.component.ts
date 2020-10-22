import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TreeService} from 'src/app/tree.service';

declare let alertify: any;

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {
  tree: any = {};
  idTree: string;
  listTree: any[];
  id: any;
  p: any;
  user: any[];
  user1: any = {};
  url1: string;
  url: string;
  shopName: string;
  images = [];
  imageUser: string;
  comment = "";
  commentList = [];
  constructor(private http: HttpClient, private service: TreeService, private route: ActivatedRoute) {
    this.idTree = this.route.snapshot.paramMap.get('id');
    this.getTree(this.idTree);
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.id = user['id'];
    this.imageUser = user['avatar'];
    this.service.getUser(this.id).subscribe(data => {
      this.user1 = data['data'];
      this.url1 = this.user1.avatar;
    });
    this.service.getAllUser().subscribe(data => {
        //@ts-ignore
        this.user = data.datas;
      },
      (error) => console.log(error),
      () => console.log('Complete')
    );
    this.loadData();
  }

  loadData(): void {

    this.service.getAllTree().subscribe(data => {
        //@ts-ignore
        this.listTree = data.datas;
      },
      (error) => console.log(error),
      () => console.log('Complete')
    );
    this.service.getComment(this.idTree).subscribe(data => {
      this.commentList = data['datas'];
    })
  }

  getTree(id) {
    this.service.getTreeService(id).subscribe(data => {
      let imageDetail = data['data']['imageDetail'];
      this.images = imageDetail.split(', ');
      this.tree = data['data'];
      this.tree.user_id = this.id;
    });
  }

  getUserShopName(id): string {
    for (let i = 0; i < this.user.length; i++) {
      if (this.user[i].id == id) {
        return this.user[i].shopName;
      }
    }
    return 'lỗi';
  }

  getUserShopImage(id): string {
    for (let i = 0; i < this.user.length; i++) {
      if (this.user[i].id == id) {
        this.url = this.user[i].avatar;
        return this.url;
      }
    }
    return 'lỗi';
  }
  findTreeById(id): {} {
    for (var i = 0; i < this.listTree.length; i++) {
      if (this.listTree[i].id == id) {
        return this.listTree[i];
      }
    }
  }
  addToCart(id) {
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
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
    alertify.set('notifier', 'position', 'top-right');
    alertify.success('Thêm thành công!');
  }

  sendComment() {
    let data = {
      "content": this.comment,
      "userId": this.id,
      "treeId": this.idTree
    }
    this.service.sendComment(data).subscribe(data => {
    }, () => {},
      () => {
      this.comment = "";
        this.service.getComment(this.idTree).subscribe(data => {
          this.commentList = data['datas'];
        })
      })
  }
}
