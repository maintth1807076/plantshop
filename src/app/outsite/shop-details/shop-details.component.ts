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
  idTree: string;
  constructor(private http: HttpClient, private service: TreeService,  private route: ActivatedRoute) {
    this.idTree = this.route.snapshot.paramMap.get('id');
    this.getTree(this.idTree); }

  ngOnInit(): void {

  }
  getTree(id) {
    this.service.getTreeService(id).subscribe(data => {
      console.log(data['data']);
      this.tree = data['data'];
    });
  }
}
