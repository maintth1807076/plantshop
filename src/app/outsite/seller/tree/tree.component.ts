import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TreeService} from '../../../tree.service';
import {Router} from '@angular/router';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  userId:any;
  id: any;
  p: any;
  listTree: any[];
  alive: boolean = true;

  constructor(private http: HttpClient, private service: TreeService, private router: Router) {

  }

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
    this.service.getAllTreeByUserId(this.id).subscribe(data => {
        this.listTree = data['datas'];
        console.log(this.listTree);
      },
      (error) => console.log(error),
      () => console.log('Complete')
    );
  }
  // deletePost(id){
  //   this.service.deleteTree(id).subscribe(data => {
  //     this.listTree = this.listTree.filter(item => item.id !== id);
  //     console.log('Tree deleted successfully!');
  //   });
  // }

}
