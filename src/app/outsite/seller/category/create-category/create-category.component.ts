import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TreeService } from 'src/app/tree.service';
import {finalize} from 'rxjs/operators';
declare let alertify : any;
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  downloadURL: Observable<string>;
  createCategoryForm: FormGroup;
  loading = false;
  submitted = false;
  url: string;
  constructor(private storage: AngularFireStorage, private fb: FormBuilder, private service: TreeService,  private router: Router,   private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createCategoryForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  get f() { return this.createCategoryForm.controls; }

  createCategory() {
    this.submitted = true;
    if (this.createCategoryForm.invalid) {
      return; }
    this.loading = true;
    let data = {
      'name': this.f.name.value,
      'image': this.url,
      'description': this.f.description.value,
      'status': 1,
    };

    this.service.addCategory(data).subscribe(
      data => {
        this.router.navigateByUrl('/seller/category');
        alertify.set('notifier','position', 'top-right');
        alertify.success('Thêm thành công!');
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

}
