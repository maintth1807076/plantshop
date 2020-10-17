import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {TreeService} from '../../../tree.service';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  downloadURL: Observable<string>;
  id: any;
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  user: any = {};
  url: string;

  constructor(private storage: AngularFireStorage, private fb: FormBuilder, private service: TreeService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.id = user['id'];
    this.service.getUser(this.id).subscribe(data => {
      this.user = data['data'];
      this.url = this.user.avatar;
      console.log(data);
    });

    this.updateForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      avatar: ['', Validators.required],
      gender: ['', Validators.required],
      shopName: ['', Validators.required],
    });
  }
  get f(){
    return this.updateForm.controls;
  }

  update(){
    this.submitted = true;
    if (this.updateForm.invalid) {
      return; }
    this.loading = true;
    let data = {
      'fullName': this.f.fullName.value,
      'password': this.user['password'],
      'email': this.user['email'],
      'status': '1',
      'avatar': this.url,
      'gender':this.f.gender.value,
      'shopName':this.f.shopName.value,

    }
    console.log(this.updateForm.value);
    console.log(this.url);
    this.service.updateUser(this.id, data).subscribe(data=> {
        console.log('Post updated successfully!');
        alert('cập nhật thông tin thành công!')
      },
      (error) => console.log(error),
      () => {
       this.loading = false;
        console.log('Complete')}
    );
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
              this.user['avatar'] = url;
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
