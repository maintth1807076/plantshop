import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TreeService} from '../../../../tree.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.css']
})
export class DetailCategoryComponent implements OnInit {

  id: any;
  p: any;
  category: any = {};
  idCategory: string;
  constructor(private http: HttpClient, private service: TreeService,  private route: ActivatedRoute) {
    this.idCategory = this.route.snapshot.paramMap.get('id');
    this.getCategory(this.idCategory); }

  ngOnInit(): void {

  }
  getCategory(id) {
    this.service.getCategory(id).subscribe(data => {
      this.category = data['data'];
    });
  }



}
