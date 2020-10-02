import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TreeService} from '../../../tree.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: any;
  p: any;
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
