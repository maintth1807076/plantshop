import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {TreeService} from '../../../tree.service';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  downloadURL: Observable<string>;
  id: any;
  editCategoryForm: FormGroup;
  loading = false;
  submitted = false;
  category: any = {};
  url: string;
  constructor(private storage: AngularFireStorage, private fb: FormBuilder, private service: TreeService,  private router: Router,   private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // this.id = this.route.snapshot.paramMap.get('id');
    this.service.getCategory(this.id).subscribe(data => {
      this.category = data['datas'];
      this.url = this.category.image;
      console.log(data);
    });

    this.editCategoryForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required ],
      status: ['', Validators.required],
    });
  }
  get f(){
    return this.editCategoryForm.controls;
  }

  editCategory(){
    this.submitted = true;
    if (this.editCategoryForm.invalid) {
      return; }
    this.loading = true;
    console.log(this.editCategoryForm.value);
    this.service.updateCategory(this.id, this.editCategoryForm.value).subscribe(data => {
      console.log('Post updated successfully!');
      this.router.navigateByUrl('/seller/category');
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


}
