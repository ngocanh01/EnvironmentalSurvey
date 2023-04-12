import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryApi } from 'src/app/entities/categoryApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { SurveyApi } from 'src/app/entities/surveyApi.entity';
import { CategoryApiService } from 'src/app/services/categoryApi.service';
import { SurveyApiService } from 'src/app/services/surveyApi.service';
import { DatePipe, formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { dateLessThan } from 'src/app/validation/date.validation';

@Component({
  selector: 'update-survey',
  templateUrl: './updateSurvey.component.html',
})
export class UpdateSurveyComponent implements OnInit {
  id: string;
  editSurveyForm: FormGroup;
  categories: CategoryApi[];
  resultApi: ResultApi;
  constructor(
    private surveyApiService: SurveyApiService,
    private categoryApiService: CategoryApiService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => {
      var id = p.get('id');
      this.id = id;
      console.log(this.id);
    });
    this.categoryApiService.findAll().then(
      (res) => {
        this.categories = res as CategoryApi[];
      },
      (err) => {
        console.log(err);
      }
    );
    this.surveyApiService.findById(this.id).then(
      (res) => {
        var survey: SurveyApi = res as SurveyApi;
        console.log(survey);
        var startDateParts = survey.startdate.split('/');
        var endDateParts = survey.enddate.split('/');
        var newStartDate =
          startDateParts[2] + '-' + startDateParts[1] + '-' + startDateParts[0];
        var newEndDate =
          endDateParts[2] + '-' + endDateParts[1] + '-' + endDateParts[0];
        this.editSurveyForm = this.formBuilder.group(
          {
            id: survey.id,
            title: [survey.title, Validators.required],
            description: [survey.description, Validators.required],
            startdate: [newStartDate, Validators.required],
            enddate: [newEndDate, Validators.required],
            type: survey.type,
            status: survey.status,
            surveyCategoryId: survey.surveyCategoryId,
          },
          {
            validators: [dateLessThan('startdate', 'enddate')],
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // onChangeStartDate() {
  //   let date = new Date();
  //   var startdate = new Date(this.editSurveyForm.get('startdate').value);
  //   if (startdate <= date) {
  //     this.editSurveyForm.invalid;
  //     return 'invalid';
  //   } else return 'valid';
  // }
  // onChangeEndDate() {
  //   let date = new Date();
  //   var startdate = new Date(this.editSurveyForm.get('startdate').value);
  //   var enddate = new Date(this.editSurveyForm.get('enddate').value);
  //   if (enddate < date || enddate < startdate) {
  //     return false;
  //   } else return true;
  // }

  save() {
    var startdate = this.datePipe.transform(
      this.editSurveyForm.get('startdate').value,
      'dd/MM/yyyy'
    );
    var enddate = this.datePipe.transform(
      this.editSurveyForm.get('enddate').value,
      'dd/MM/yyyy'
    );
    this.editSurveyForm.get('startdate').setValue(startdate);
    this.editSurveyForm.get('enddate').setValue(enddate);
    var survey: SurveyApi = this.editSurveyForm.value;
    console.log(survey);
    this.surveyApiService.update(survey).then(
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
              this.router.navigate(['/survey']);
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
