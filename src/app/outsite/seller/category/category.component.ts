import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TreeService} from '../../../tree.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  id: any;
  p: any;
  listCategory: any[];


  constructor(private http: HttpClient, private service: TreeService, private router: Router) {

  }

  ngOnInit(): void {
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

    this.service.getAllCategory().subscribe(data => {
        this.listCategory = data['datas'];
      },
      (error) => console.log(error),
      () => console.log('Complete')
    );
  }

}
