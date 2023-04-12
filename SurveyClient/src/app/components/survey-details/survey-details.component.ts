import { Component, Input, OnInit } from '@angular/core';
import { SurveyDetailAPI } from 'src/app/models/surveydetailsapi.model';
import { SurveyAPIService } from 'src/app/services/surveyapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResponseAPI } from 'src/app/models/responseapi.model';
import { ResponseAPIService } from 'src/app/services/responseapi.service';
import { ResultAPI } from 'src/app/models/resultAPI.model';
import { AnswerApi } from 'src/app/models/answerapi.model';
import { AnswerAPIService } from 'src/app/services/answerapi.service';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css'],
})
export class SurveyDetailsComponent implements OnInit {
  myForm: FormGroup;
  surveyDetail: SurveyDetailAPI = new SurveyDetailAPI();
  id: string;
  resultAPI: ResultAPI;
  response: ResponseAPI;
  responseId: number;
  clientResponse: ResponseAPI = new ResponseAPI();
  clientAnswer: AnswerApi = new AnswerApi();
  text: string = '';

  constructor(
    private http: HttpClient,
    private apiService: SurveyAPIService,
    private activatedRoute: ActivatedRoute,
    private responsAPIService: ResponseAPIService,
    private anserAPIService: AnswerAPIService,
    private router: Router
  ) {
    this.myForm = new FormGroup({
      userId: new FormControl(),
      surveyId: new FormControl(),
      surveyName: new FormControl(),
      questions: new FormArray([]),
    });
    this.activatedRoute.paramMap.subscribe((p) => {
      var id = p.get('id');
      this.id = id;
    });
    console.log(this.id);
    this.apiService.getSurveyDetailsById(this.id).subscribe((res: any) => {
      res.subscribe((data: any) => {
        console.log(data);
        data.questions.forEach((question: any) => {
          const optionFormArray = new FormArray(
            question.options.map((option: any) => {
              const control = new FormControl(option.value);
              control.valueChanges.subscribe(() => {
                // Update the 'isSelected' property of the isSelected option
                option.isSelected = control.value;
              });
              return new FormGroup({
                optionId: new FormControl(option.optionId),
                optionName: new FormControl(option.optionName),
                isSelected: new FormControl(false),
              });
            })
          );
          (this.myForm.get('questions') as FormArray).push(
            new FormGroup({
              questionId: new FormControl(question.questionId),
              questionTypeId: new FormControl(question.questionTypeId),
              questionName: new FormControl(question.questionName),
              isMandatory: new FormControl(question.isMandatory),
              options: optionFormArray,
            })
          );
        });
        this.myForm.controls['userId'].setValue(localStorage.getItem('id'));
        this.myForm.controls['surveyId'].setValue(data.surveyId);
        this.myForm.controls['surveyName'].setValue(data.surveyName);
      });
    });
  }
  onSubmit() {
    console.log(this.myForm.value);
    if (this.validateOnSubmit() == true) {
      this.anserAPIService.getForm(this.myForm.value).then(
        (res) => {
          this.resultAPI = res as ResultAPI;
          swal.fire({
            icon: 'success',
            title: 'Successfully!',
            text: 'Thank you for doing survey!',
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
          });
          this.router.navigate(['/home']);
          console.log(this.resultAPI);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  validateOnSubmit(): boolean {
    var questions = this.myForm.get('questions') as FormArray;
    for (let question of questions.controls) {
      if (question.value.isMandatory == true) {
        var options = question.get('options') as FormArray;
        var flag = false;

        for (let option of options.controls)
          if (option.value.isSelected === true) flag = true;

        if (flag === false) {
          swal.fire({
            icon: 'error',
            title: 'Cannot submit this form!',
            text: 'Please fill all mandatory question.',
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
          });
          return flag;
        }
      }
    }
    return true;
  }

  onTextChange(event: Event, questionIndex: number, optionIndex: number): void {
    const optionFormArray = this.myForm.get(
      `questions.${questionIndex}.options`
    ) as FormArray;
    const optionControl = optionFormArray.controls[optionIndex];
    optionControl.get('optionName')?.setValue(this.text);
    if (this.text != '') {
      optionControl.get('isSelected')?.setValue(true);
    } else {
      optionControl.get('isSelected')?.setValue(false);
    }
  }

  onOptionChange(event: Event, questionIndex: number, optionIndex: number) {
    const optionFormArray = this.myForm.get(
      `questions.${questionIndex}.options`
    ) as FormArray;
    const optionControl = optionFormArray.controls[optionIndex];
    const checkboxInput = event.target as HTMLInputElement;
    const questionTypeId = this.myForm.get(
      `questions.${questionIndex}.questionTypeId`
    ) as FormControl;
    //if questionTypeId == radio
    //nếu question Type là radio thì set all isSelected value về false trước
    if (questionTypeId.value == 2) {
      for (let option of optionFormArray.controls) {
        option.get('isSelected')?.setValue(false);
      }
    }
    // Bắt sự kiện checked and UnCheck
    if (checkboxInput.checked) {
      optionControl.get('isSelected')?.setValue(true);
    } else {
      optionControl.get('isSelected')?.setValue(false);
    }
  }

  //Get FormArray questions
  get formQuestionData() {
    return <FormArray>this.myForm.get('questions');
  }

  //Get Form Array options
  formOptionData(options: any) {
    return <FormArray>options.get('options');
  }

  ngOnInit(): void {
    if (localStorage.getItem('username') == null) {
      this.router.navigate(['/login']);
    }
  }
}
