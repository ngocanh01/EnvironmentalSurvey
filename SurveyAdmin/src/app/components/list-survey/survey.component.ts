import { Component, OnInit } from '@angular/core';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { SurveyApi } from 'src/app/entities/surveyApi.entity';
import { SurveyApiService } from 'src/app/services/surveyApi.service';
import Swal from 'sweetalert2';
declare let $: any;
@Component({
  selector: 'survey',
  templateUrl: './survey.component.html',
})
export class SurveyComponent implements OnInit {
  survey: SurveyApi;
  surveys: SurveyApi[];
  resultApi: ResultApi;
  constructor(private surveyApiService: SurveyApiService) {}
  ngOnInit(): void {
    this.surveyApiService.findAll().then(
      (res) => {
        this.surveys = res as SurveyApi[];
        console.log(this.surveys);
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
        this.surveyApiService.delete(id).then(
          (res) => {
            this.resultApi = res as ResultApi;
            this.surveyApiService.findAll().then(
              (res) => {
                this.surveys = res as SurveyApi[];
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
