import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CategoryApi } from 'src/app/entities/categoryApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { CategoryApiService } from 'src/app/services/categoryApi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'add-category',
  templateUrl: './addCategory.component.html',
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm: FormGroup;
  resultApi: ResultApi;
  result: any;
  constructor(
    private categoryApiService: CategoryApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.addCategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
    // console.log(this.addCategoryForm);
  }

  save() {
    var category: CategoryApi = this.addCategoryForm.value;
    console.log(category);
    this.categoryApiService.create(category).then(
      (res) => {
        this.resultApi = res as ResultApi;
        if (this.resultApi) {
          Swal.fire({
            title: 'Success!',
            text: 'A row has been record!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/category']);
            }
          });
        }
      },
      (err) => {
        console.log(err);
        if (!this.resultApi) {
          Swal.fire('Error!', 'There is an error!', 'error');
        }
      }
    );
  }
}
