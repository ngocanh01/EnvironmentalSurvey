import { Component, OnInit } from '@angular/core';
import { QuestionApi } from 'src/app/entities/questionApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { QuestionApiService } from 'src/app/services/questionApi.service';
import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';
declare let $: any;
@Component({
  selector: 'question',
  templateUrl: './question.component.html',
})
export class QuestionComponent implements OnInit {
  question: QuestionApi;
  questions: QuestionApi[];
  resultApi: ResultApi;
  constructor(private questionApiService: QuestionApiService) {}

  ngOnInit(): void {
    this.questionApiService.findAll().then(
      (res) => {
        this.questions = res as QuestionApi[];
        console.log(this.questions);
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
        this.questionApiService.delete(id).then(
          (res) => {
            this.resultApi = res as ResultApi;
            this.questionApiService.findAll().then(
              (res) => {
                this.questions = res as QuestionApi[];
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
  objectKeys(obj) {
    return Object.keys(obj);
  }
}
