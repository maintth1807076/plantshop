import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TreeService} from '../../tree.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  id: any;
  p: any;
  listTree: any[];


  constructor(private http: HttpClient, private service: TreeService, private router: Router) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

    this.service.getAllTree().subscribe((data: any[]) => {
        // @ts-ignore
        this.listTree = data.datas;
        console.log(this.listTree);
      },
      (error) => console.log(error),
      () => console.log('Complete')
    );
  }
  deletePost(id){
    this.service.deleteTree(id).subscribe(data => {
      this.listTree = this.listTree.filter(item => item.id !== id);
      console.log('Tree deleted successfully!');
    });
  }
}
