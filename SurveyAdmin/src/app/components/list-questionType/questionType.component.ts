import { Component, OnInit } from '@angular/core';
import { QuestionTypeApi } from 'src/app/entities/questionTypeApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { QuestionTypeApiService } from 'src/app/services/questionTypeApi.service';
import Swal from 'sweetalert2';
declare let $: any;
@Component({
  selector: 'questionType',
  templateUrl: './questionType.component.html',
})
export class QuestionTypeComponent implements OnInit {
  questionType: QuestionTypeApi;
  questionTypes: QuestionTypeApi[];
  resultApi: ResultApi;
  constructor(private questionTypeApiService: QuestionTypeApiService) {}
  ngOnInit(): void {
    this.questionTypeApiService.findAll().then(
      (res) => {
        this.questionTypes = res as QuestionTypeApi[];
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
        this.questionTypeApiService.delete(id).then(
          (res) => {
            this.resultApi = res as ResultApi;
            this.questionTypeApiService.findAll().then(
              (res) => {
                this.questionTypes = res as QuestionTypeApi[];
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
