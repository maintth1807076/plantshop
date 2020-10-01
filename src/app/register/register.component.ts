import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeService } from '../tree.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(private fb: FormBuilder,private service: TreeService,  private router: Router,   private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      avatar: ['', Validators.required],
      gender: ['', Validators.required],
      // birthday: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
  }
  get f() { return this.registerForm.controls; }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return; }
       this.loading = true;
    let data = {
      'fullname': this.f.fullname.value,
      'email': this.f.email.value,
      'password': this.f.password.value,
      'avatar': this.f.avatar.value,
      'gender': this.f.gender.value,
      // 'birthday': this.f.birthday.value
    
    }
    
    this.service.doRegister(data).subscribe(
    data => {
      console.log(data);
      this.router.navigate([this.returnUrl]);
    },
    error => {
        this.loading = false;
    });
  }
  }

