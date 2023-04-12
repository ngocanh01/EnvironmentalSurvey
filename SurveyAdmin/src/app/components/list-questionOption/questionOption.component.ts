import { Component, OnInit } from '@angular/core';
import { CategoryApi } from 'src/app/entities/categoryApi.entity';
import { QuestionOptionApi } from 'src/app/entities/questionOptionApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { CategoryApiService } from 'src/app/services/categoryApi.service';
import { QuestionOptionApiService } from 'src/app/services/questionOptionApi.service';
import Swal from 'sweetalert2';
declare let $: any;
@Component({
  selector: 'questionOption',
  templateUrl: './questionOption.component.html',
})
export class QuestionOptionComponent implements OnInit {
  questionOption: QuestionOptionApi;
  questionOptions: QuestionOptionApi[];
  resultApi: ResultApi;
  constructor(private questionOptionApiService: QuestionOptionApiService) {}
  ngOnInit(): void {
    this.questionOptionApiService.findAll().then(
      (res) => {
        this.questionOptions = res as QuestionOptionApi[];
        console.log(this.questionOptions);
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
        this.questionOptionApiService.delete(id).then(
          (res) => {
            this.resultApi = res as ResultApi;
            this.questionOptionApiService.findAll().then(
              (res) => {
                this.questionOptions = res as QuestionOptionApi[];
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
