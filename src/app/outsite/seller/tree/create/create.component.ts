import { Component, OnInit } from '@angular/core';
import {finalize} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {TreeService} from '../../../../tree.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
declare let alertify : any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  id: any;
  listCategory: any[];
  downloadURL: Observable<string>;
  createForm: FormGroup;
  loading = false;
  submitted = false;
  url: string;
  urlDetail: string;
  user: any = {};
  constructor(private storage: AngularFireStorage, private fb: FormBuilder, private service: TreeService,  private router: Router,   private route: ActivatedRoute) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.id = user['id'];
    this.loadData();
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', Validators.required],
      imageDetail: ['', Validators.required],
      description: ['', Validators.required],
      detail: ['', Validators.required],
      categories: [''],
    });
  }
  get f() { return this.createForm.controls; }

  create() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return; }
    this.loading = true;
    let categoryList = [];
    let categoriesId = this.f.categories.value;
    for (let categoryId of categoriesId){
      // this.service.getCategory(categoryId).subscribe(data => {
      //   let category = data['data'];
      //   categoryList.push(category);
      // })
      // // console.log(categoryId);
      for (let i = 0; i < this.listCategory.length ; i++) {
        if ( this.listCategory[i].id == categoryId){
          categoryList.push(this.listCategory[i]);
        }
      }
    }
    let data = {
      'userId':this.id,
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
    this.service.addTree(data).subscribe(
      data => {
        alertify.set('notifier','position', 'top-right');
        alertify.success('Thêm thành công!');
        this.router.navigateByUrl('/seller/tree')

      },
      error => {
        this.loading = false;
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
