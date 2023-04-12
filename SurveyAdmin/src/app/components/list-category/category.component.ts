import { Component, OnInit } from '@angular/core';
import { CategoryApi } from 'src/app/entities/categoryApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { CategoryApiService } from 'src/app/services/categoryApi.service';
import Swal from 'sweetalert2';
declare let $: any;
@Component({
  selector: 'category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  category: CategoryApi;
  categories: CategoryApi[];
  resultApi: ResultApi;
  constructor(private categoryApiService: CategoryApiService) {}
  ngOnInit(): void {
    this.categoryApiService.findAll().then(
      (res) => {
        this.categories = res as CategoryApi[];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  delete(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryApiService.delete(id).then(
          (res) => {
            this.resultApi = res as ResultApi;
            this.categoryApiService.findAll().then(
              (res) => {
                this.categories = res as CategoryApi[];
              },
              (err) => {
                console.log(err);
              }
            );
          },
          (err) => {
            console.log(err);
          }
        );
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
}
