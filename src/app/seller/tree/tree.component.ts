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
  removeURL(strTitle) {
    // console.log(strTitle);

    //chuyền về chữ in thường
    strTitle = strTitle.toLowerCase();
    //xóa bỏ mọi khoảng trắng
    // strTitle = strTitle.trim();
    strTitle = strTitle.replace(/\s\s*/g, ' ');
    strTitle = strTitle.replace(/ /g, '-');
    strTitle = strTitle.replace(/\(/g, '');
    strTitle = strTitle.replace(/\)/g, '');
    strTitle = strTitle.replace(/ò|ó|ọ|ỏ|õ|ơ|ờ|ớ|ợ|ở|ỡ|ô|ồ|ố|ộ|ổ|ỗ/g, 'o');
    strTitle = strTitle.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ|Ô|Ố|Ổ|Ộ|Ồ|Ỗ/g, 'o');
    strTitle = strTitle.replace(/à|á|ạ|ả|ã|ă|ằ|ắ|ặ|ẳ|ẵ|â|ầ|ấ|ậ|ẩ|ẫ/g, 'a');
    strTitle = strTitle.replace(/À|Á|Ạ|Ả|Ã|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ|Â|Ấ|Ầ|Ậ|Ẩ|Ẫ/g, 'a');
    strTitle = strTitle.replace(/ề|ế|ệ|ể|ê|ễ|é|è|ẻ|ẽ|ẹ/g, 'e');
    strTitle = strTitle.replace(/Ể|Ế|Ệ|Ể|Ê|Ễ|É|È|Ẻ|Ẽ|Ẹ/g, 'e');
    strTitle = strTitle.replace(/ừ|ứ|ự|ử|ư|ữ|ù|ú|ụ|ủ|ũ/g, 'u');
    strTitle = strTitle.replace(/Ừ|Ứ|Ự|Ử|Ư|Ữ|Ù|Ú|Ụ|Ủ|Ũ/g, 'u');
    strTitle = strTitle.replace(/ì|í|ị|ỉ|ĩ|j/g, 'i');
    strTitle = strTitle.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'i');
    strTitle = strTitle.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    strTitle = strTitle.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'y');
    strTitle = strTitle.replace(/(đ|Đ)/g, 'd');
    strTitle = strTitle.replace(/[^-a-zA-Z0-9]/g, '');
    strTitle = strTitle.replace(/-/g, ' ');
    console.log(`strTitle is ${strTitle}`);

    return strTitle;
  }
  sortBy($event,type) {
    var checked = $event.target.classList.contains('arrow-transition');
    if (checked) {
      $event.target.classList.remove('arrow-transition');
    } else {
      $event.target.classList.add('arrow-transition');
    }
    switch (type) {
      case 'name':
        var byName = this.listTree
        byName.sort((a, b) => {
          var x = this.removeURL(a.name)
          var y = this.removeURL(b.name)
          if (checked) {
            return y < x ? -1 : y > x ? 1 : 0;
          } else {
            return x < y ? -1 : x > y ? 1 : 0;
          }
        });
        this.listTree = byName
        break;
      case 'time':
        var byTime = this.listTree.slice(0);
        byTime.sort(function(a, b) {

          if (checked) {
            return b.createdAt - a.createdAt;
          } else {
            return a.createdAt - b.createdAt;
          }
        });
        this.listTree = byTime
        break;


      default:
        break;
    }
  }
  // deletePost(id){
  //   this.service.deleteTree(id).subscribe(data => {
  //     this.listTree = this.listTree.filter(item => item.id !== id);
  //     console.log('Tree deleted successfully!');
  //   });
  // }
}
