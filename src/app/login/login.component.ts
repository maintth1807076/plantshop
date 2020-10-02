import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeService } from '../tree.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor( private fb: FormBuilder,private service: TreeService,  private router: Router,   private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/seller';
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return; }
       this.loading = true;
    let data = {
      'email': this.f.email.value,
      'password': this.f.password.value
    }
    this.service.doLogin(data).subscribe(
    data => {
      localStorage.setItem('user', data['data']);
      this.router.navigate([this.returnUrl]);
    },
    error => {
        this.loading = false;
    });
  }
}
