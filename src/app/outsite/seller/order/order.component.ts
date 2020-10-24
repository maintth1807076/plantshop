import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TreeService} from '../../../tree.service';
import {Router} from '@angular/router';
declare let alertify : any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  userId: any;
  id: any;
  p: any;
  listOrder: any[];
  alive: boolean = true;
  user: any[];

  constructor(private http: HttpClient, private service: TreeService, private router: Router) {
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.id = user['id'];
    this.service.getAllUser().subscribe(data => {
        //@ts-ignore
        this.user = data.datas;
      },
      (error) => console.log(error),
      () => console.log('Complete')
    );
    this.loadData();
  }

  async ngAfterViewInit() {
    await this.loadScript('/assets/js/jquery.js');
    await this.loadScript('/assets/js/datatables.min.js');
    await this.loadScript('/assets/js/style.js');
  }

  loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

  loadData(): void {
    this.service.getOrderBySellerId(this.id).subscribe(data => {
        this.listOrder = data['datas'];

        console.log(data);
      },
      (error) => console.log(error),
      () => {
      }
    );
  }

  confirmOrder(id) {
    this.service.confirmOrder(id).subscribe(data => {

      },
      (error) => console.log(error),
      () => {
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Xác nhận thành công!');
        this.loadData();
      }
    );

  }

  getUserOrderName(id): string {
    for (let i = 0; i < this.user.length; i++) {
      if (this.user[i].id == id) {
        return this.user[i].fullName;
      }
    }
    return 'lỗi';
  }
}
