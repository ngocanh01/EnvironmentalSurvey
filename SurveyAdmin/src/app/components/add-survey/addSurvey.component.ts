import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CategoryApi } from 'src/app/entities/categoryApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { SurveyApi } from 'src/app/entities/surveyApi.entity';
import { CategoryApiService } from 'src/app/services/categoryApi.service';
import { SurveyApiService } from 'src/app/services/surveyApi.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { dateLessThan } from 'src/app/validation/date.validation';
declare let $: any;
@Component({
  selector: 'add-survey',
  templateUrl: './addSurvey.component.html',
})
export class AddSurveyComponent implements OnInit {
  addSurveyForm: FormGroup;
  categories: CategoryApi[];
  resultApi: ResultApi;
  constructor(
    private categoryApiService: CategoryApiService,
    private surveyApiService: SurveyApiService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.categoryApiService.findAll().then(
      (res) => {
        this.categories = res as CategoryApi[];
      },
      (err) => {
        console.log(err);
      }
    );

    this.addSurveyForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        startdate: ['', Validators.required],
        enddate: ['', Validators.required],
        type: 'auto',
        status: true,
        surveyCategoryId: 1,
      },
      {
        validators: [dateLessThan('startdate', 'enddate')],
      }
    );
  }

  onChangeStartDate() {
    let date = new Date();
    var startdate = new Date(this.addSurveyForm.get('startdate').value);
    if (startdate <= date) {
      return false;
    } else return true;
  }
  onChangeEndDate() {
    let date = new Date();
    var startdate = new Date(this.addSurveyForm.get('startdate').value);
    var enddate = new Date(this.addSurveyForm.get('enddate').value);
    if (enddate < date || enddate < startdate) {
      return false;
    } else return true;
  }

  save() {
    var startdate = this.datePipe.transform(
      this.addSurveyForm.get('startdate').value,
      'dd/MM/yyyy'
    );
    var enddate = this.datePipe.transform(
      this.addSurveyForm.get('enddate').value,
      'dd/MM/yyyy'
    );
    this.addSurveyForm.get('startdate').setValue(startdate);
    this.addSurveyForm.get('enddate').setValue(enddate);
    var survey: SurveyApi = this.addSurveyForm.value;
    // this.addSurveyForm = this.formBuilder.group({
    //   title: survey.title,
    //   description: survey.description,
    //   startdate: this.datePipe.transform(survey.startdate, 'dd/MM/yyyy'),
    //   enddate: this.datePipe.transform(survey.enddate, 'dd/MM/yyyy'),
    //   type: survey.type,
    //   status: survey.status,
    //   surveyCategoryId: survey.surveyCategoryId,
    // });
    console.log(survey.startdate);
    console.log(survey.enddate);
    console.log(survey);

    this.surveyApiService.create(survey).then(
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
