import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TreeService} from '../../tree.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  listBlog: any[];
  id: any;
  p: any;
  constructor( private http: HttpClient, private service: TreeService, private router: Router,) {

  }

  ngOnInit(): void {
    this.loadDataBlog();
  }
  loadDataBlog():void{

    this.service.getAllBlog().subscribe(data => {
        //@ts-ignore
        this.listBlog = data.datas ;
        console.log(data);
      },
      (error) => console.log(error),
      () => console.log("Complete")
    )
  }


}
