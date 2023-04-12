import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerApi } from 'src/app/entities/answerApi.entity';
import { ResponseApi } from 'src/app/entities/responseApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { AnswerApiService } from 'src/app/services/answerApi.service';
import { ResponseApiService } from 'src/app/services/responseApi.service';
declare let $: any;
@Component({
  selector: 'response-detail',
  templateUrl: './response-detail.component.html',
})
export class ResponseDetailComponent implements OnInit {
  id: string;
  answersString: AnswerApi;
  answerJson: object;
  answer: AnswerApi;
  answers: AnswerApi[];
  responses: ResponseApi[];
  resultApi: ResultApi;
  constructor(
    private activatedRoute: ActivatedRoute,
    private answerApiService: AnswerApiService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => {
      var id = p.get('id');
      this.id = id;
      console.log(this.id);
    });
    this.answerApiService.findByResId(this.id).then(
      (res) => {
        this.answers = res as AnswerApi[];
        console.log(this.answers);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  // delete(id) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.categoryApiService.delete(id).then(
  //         (res) => {
  //           this.resultApi = res as ResultApi;
  //           this.categoryApiService.findAll().then(
  //             (res) => {
  //               this.categories = res as CategoryApi[];
  //             },
  //             (err) => {
  //               console.log(err);
  //             }
  //           );
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       );
  //       Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
  //     }
  //   });
  // }
}
