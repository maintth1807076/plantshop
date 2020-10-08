import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TreeService} from '../../../tree.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  listCategory: any[];
  categories: any[];
  downloadURL: Observable<string>;
  createForm: FormGroup;
  loading = false;
  submitted = false;
  url: string;
  id: any;
  tree: any = {};
  constructor(private storage: AngularFireStorage, private fb: FormBuilder, private service: TreeService,  private router: Router,   private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData();
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', Validators.required],
      imageDetail: ['', Validators.required],
      description: ['', Validators.required],
      detail: ['', Validators.required],
      status: ['', Validators.required],
      categories: ['', Validators.required],
    });
  }
  get f() { return this.createForm.controls; }

  create() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return; }
    this.loading = true;
    let data = {
      'name': this.f.name.value,
      'price': this.f.price.value,
      'quantity': this.f.quantity.value,
      'image': this.url,
      'imageDetail': this.f.imageDetail.value,
      'description': this.f.description.value,
      'detail': this.f.detail.value,
      'status': this.f.status.value,
      'categories': this.f.categories.value,
    };
    // this.id = this.route.snapshot.params['id'];
    // // this.id = this.route.snapshot.paramMap.get('id');
    // this.service.getTreeService(this.id).subscribe(data => {
    //   this.tree = data['datas'];
    //   this.categories = this.tree.categories;
    //   console.log(data);
    // });
    this.service.addTree(data).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/seller/tree');
      },
      error => {
        this.loading = false;
      });
  }
  uploadFile(event : FileList) {
    console.log(event);
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
  loadData(){

    this.service.getAllCategory().subscribe((data: any[]) => {
        this.listCategory = data['datas'];
        console.log(this.listCategory);
      },
      (error) => console.log(error),
      () => console.log('Complete')
    );
  }
}
