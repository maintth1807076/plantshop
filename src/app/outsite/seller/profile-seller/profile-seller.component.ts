import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {TreeService} from '../../../tree.service';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
declare let alertify : any;
@Component({
  selector: 'app-profile-seller',
  templateUrl: './profile-seller.component.html',
  styleUrls: ['./profile-seller.component.css']
})
export class ProfileSellerComponent implements OnInit {

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
    });

    this.updateForm = this.fb.group({
      fullName: ['', Validators.required],
      avatar: [''],
      gender: ['', Validators.required],
      shopName: ['', Validators.required],
      phone: ['', Validators.required],
      bankAccountNumber: ['', Validators.required],
      identityCardNumber: ['', Validators.required],
      bankName: ['', Validators.required],
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
      'phone':this.f.phone.value,
      'bankAccountNumber':this.f.bankAccountNumber.value,
      'identityCardNumber':this.f.identityCardNumber.value,
      'bankName':this.f.bankName.value,

    }
    console.log(data);
    this.service.updateUser(this.id, data).subscribe(data=> {
        alertify.set('notifier','position', 'top-right');
        alertify.success('Cập nhật thành công!');
        console.log(data)
      },
      (error) => console.log(error),
      () => {
        this.loading = false;
        console.log('Complete')}
    );
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
