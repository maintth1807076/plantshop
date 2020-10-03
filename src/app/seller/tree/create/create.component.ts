import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TreeService} from '../../../tree.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  listCategory: any[];
  createForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private fb: FormBuilder, private service: TreeService, private router: Router, private route: ActivatedRoute) {
  }

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
      category: ['', Validators.required],
    });
  }

  get f() {
    return this.createForm.controls;
  }

  create() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    }
    this.loading = true;
    let data = {
      'name': this.f.name.value,
      'price': this.f.price.value,
      'quantity': this.f.quantity.value,
      'image': this.f.image.value,
      'imageDetail': this.f.imageDetail.value,
      'description': this.f.description.value,
      'detail': this.f.detail.value,
      'status': this.f.status.value,
      'category': this.f.category.value,
    };

    this.service.addTree(data).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/seller/tree');
      },
      error => {
        this.loading = false;
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
