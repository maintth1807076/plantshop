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
    this.id = this.route.snapshot.params['id'];
    // this.id = this.route.snapshot.paramMap.get('id');
    this.service.getUser(this.id).subscribe(data => {
      this.user = data['datas'];
      this.url = this.user.avatar;
      console.log(data);
    });

    this.updateForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      avatar: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  get f() {
    return this.updateForm.controls;
  }

  update() {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.updateForm.value);
    this.service.updateUser(this.id, this.updateForm.value).subscribe(data => {
      console.log('Post updated successfully!');
      // this.router.navigateByUrl('/outsite/use');
    });
  }

  uploadFile1(event: FileList) {
    console.log(event);
    // The File object
    const file = event.item(0);

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
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
