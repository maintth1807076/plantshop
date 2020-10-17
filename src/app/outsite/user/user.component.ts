import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TreeService} from '../../tree.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id: any;
  p: any;
  listUser: any[];
  items: any[];

  constructor( private http: HttpClient, private service: TreeService, private router: Router,) {

  }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    await this.loadScript('/assets/js/jquery.js');

  }
  loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }
}
