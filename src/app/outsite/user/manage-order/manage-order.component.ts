import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TreeService} from '../../../tree.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {
  listOrder = [];
  userId:any;
  id: any;
  p: any;
  alive: boolean = true;
  constructor(private http: HttpClient, private service: TreeService, private router: Router) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.id = user['id'];
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
    this.service.getOrderByUserId(this.id).subscribe(data => {
        this.listOrder = data['datas'];
        console.log(data['datas'])
      },
      (error) => console.log(error),
      () => console.log('Complete')
    );
  }

}
