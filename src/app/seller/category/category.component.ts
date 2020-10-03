import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TreeService} from '../../tree.service';
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

  loadData(): void {

    this.service.getAllCategory().subscribe((data: any[]) => {
        this.listCategory = data['datas'];
        console.log(this.listCategory);
      },
      (error) => console.log(error),
      () => console.log('Complete')
    );
  }

}
