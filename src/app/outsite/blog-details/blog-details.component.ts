import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TreeService} from '../../tree.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  blog: any = {};
  idBlog:string;
  url: string;
  constructor(private http: HttpClient, private service: TreeService,  private route: ActivatedRoute) {
    this.idBlog = this.route.snapshot.paramMap.get('id');
    this.getBlog(this.idBlog); }

  ngOnInit(): void {
  }
  getBlog(id) {
    this.service.getBlog(id).subscribe(data => {
      this.blog = data['data'];
    });
  }

}
