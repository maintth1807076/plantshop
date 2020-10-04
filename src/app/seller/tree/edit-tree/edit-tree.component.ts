import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TreeService} from '../../../tree.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-edit-tree',
  templateUrl: './edit-tree.component.html',
  styleUrls: ['./edit-tree.component.css']
})
export class EditTreeComponent implements OnInit {
  downloadURL: Observable<string>;
  id: any;
  editForm: FormGroup;
  loading = false;
  submitted = false;
  tree: any = {};
  url: string;
  constructor(private storage: AngularFireStorage, private fb: FormBuilder, private service: TreeService,  private router: Router,   private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // this.id = this.route.snapshot.paramMap.get('id');
    this.service.getTreeService(this.id).subscribe(data => {
      this.tree = data['data'];
      this.url = this.tree.image;
      console.log(data);
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', Validators.required],
      imageDetail: ['', Validators.required ],
      description: ['', Validators.required ],
      detail: ['', Validators.required],
      status: ['', Validators.required],
      category: ['', Validators.required],
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
    console.log(this.editForm.value);
    this.service.updateTree(this.id, this.editForm.value).subscribe(data => {
      console.log('Post updated successfully!');
      this.router.navigateByUrl('/seller/tree');
    });
  }
  uploadFile1(event : FileList) {
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
