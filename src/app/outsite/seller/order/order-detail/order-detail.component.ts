import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TreeService} from '../../../../tree.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  id: any;
  p: any;
  listOrderDetail: any[];
  idOrder: string;
  user: any[];
  constructor(private http: HttpClient, private service: TreeService,  private route: ActivatedRoute) {
    this.idOrder = this.route.snapshot.paramMap.get('id');
    this.getAllOrderDetailByOrderId(this.idOrder); }

  ngOnInit(): void {
    this.service.getAllUser().subscribe(data => {
        //@ts-ignore
        this.user = data.datas ;
      },
      (error) => console.log(error),
      () => console.log("Complete")
    )
  }
  getUserName(id): string {
    for (let i = 0; i < this.user.length; i++) {
      if(this.user[i].id == id){
        return this.user[i].fullName;
      }
    }
    return 'lỗi';
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
  getAllOrderDetailByOrderId(id) {
    this.service.getOrderDetailByOrderId(id).subscribe(data => {
      console.log(data);
      this.listOrderDetail = data['datas'];
    });
  }

}
