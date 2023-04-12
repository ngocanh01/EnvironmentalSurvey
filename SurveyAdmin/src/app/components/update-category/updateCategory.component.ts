import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryApi } from 'src/app/entities/categoryApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { CategoryApiService } from 'src/app/services/categoryApi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'update-category',
  templateUrl: './updateCategory.component.html',
})
export class UpdateCategoryComponent implements OnInit {
  id: string;
  editCategoryForm: FormGroup;
  resultApi: ResultApi;
  constructor(
    private categoryApiService: CategoryApiService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => {
      var id = p.get('id');
      this.id = id;
      console.log(this.id);
    });
    this.categoryApiService.findById(this.id).then(
      (res) => {
        var category: CategoryApi = res as CategoryApi;
        console.log(category);
        this.editCategoryForm = this.formBuilder.group({
          id: category.id,
          name: [category.name, Validators.required],
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  save() {
    var category: CategoryApi = this.editCategoryForm.value;
    console.log(category);
    this.categoryApiService.update(category).then(
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
