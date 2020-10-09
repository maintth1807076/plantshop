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
    this.loadData();
  }

  loadData():void{

    this.service.getAllUser().subscribe((data:any[]) => {
        //@ts-ignore
        this.listUser = data.datas ;
        console.log(this.listUser);
      },
      (error) => console.log(error),
      () => console.log("Complete")
    )
  }

}