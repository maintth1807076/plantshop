import { Component, OnInit } from '@angular/core';
import {finalize} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {TreeService} from '../../../../tree.service';
import {ActivatedRoute, Router} from '@angular/router';
declare let alertify : any;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  downloadURL: Observable<string>;
  id: any;
  idUser: any;
  editForm: FormGroup;
  loading = false;
  submitted = false;
  tree: any = {};
  url: string;
  urlDetail: string;
  listCategory: any[];
  constructor(private storage: AngularFireStorage, private fb: FormBuilder, private service: TreeService,  private router: Router,   private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.loadData();
    let user = JSON.parse(localStorage.getItem('user'));
    this.idUser = user['id'];
    this.id = this.route.snapshot.params['id'];
    // this.id = this.route.snapshot.paramMap.get('id');
    this.service.getTreeService(this.id).subscribe(data => {
      this.tree = data['data'];
      this.url = this.tree.image;
      this.urlDetail = this.tree.imageDetail;
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', Validators.required],
      imageDetail: ['', Validators.required ],
      description: ['', Validators.required ],
      detail: ['', Validators.required],
      categories: [''],
    });
  }
  get f(){
    return this.editForm.controls;
  }

  edit(){
    this.submitted = true;
    if (this.editForm.invalid) {
      return; }
    this.loading = true;
    let categoryList = [];
    let categoriesId = this.f.categories.value;
    for (let categoryId of categoriesId){
      this.service.getCategory(categoryId).subscribe(data => {
        let category = data['data'];
        categoryList.push(category);
      })
      for (let i = 0; i < this.listCategory.length ; i++) {
        if ( this.listCategory[i].id == categoryId){
          categoryList.push(this.listCategory[i]);
          break;
        }
      }
    }
    let data = {
      'userId':this.tree['userId'],
      'name': this.f.name.value,
      'price': this.f.price.value,
      'quantity': this.f.quantity.value,
      'image': this.url,
      'imageDetail': this.urlDetail,
      'description': this.f.description.value,
      'detail': this.f.detail.value,
      'status': 1,
      'categoryList': categoryList,
    };
    this.service.updateTree(this.id, data).subscribe(data => {
      alertify.set('notifier','position', 'top-right');
      alertify.success('Thay đổi thành công!');
      this.router.navigateByUrl('/seller/tree');
    });
  }
  uploadFile(event : FileList) {
    // The File object
    const file = event.item(0)

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }
    const filePath = `TreeImages/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.url = url;
              // this.urls.push(url);
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
        }
      });
  }
  uploadFile1(event : FileList) {
    // The File object
    const file = event.item(0)

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }
    const filePath = `TreeImages/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.urlDetail = url;
              // this.urls.push(url);
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
        }
      });
  }
  loadData(){

    this.service.getAllCategory().subscribe((data) => {
        this.listCategory = data['datas'];
      },
      (error) => console.log(error),
      () => console.log('Complete')
    );
  }

  chooseCategory(item: any) {
    console.log(item);
  }
}
