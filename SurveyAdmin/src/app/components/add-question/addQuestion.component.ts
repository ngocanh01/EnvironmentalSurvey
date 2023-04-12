import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Renderer2,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionApi } from 'src/app/entities/questionApi.entity';
import { QuestionOptionApi } from 'src/app/entities/questionOptionApi.entity';
import { QuestionTypeApi } from 'src/app/entities/questionTypeApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { SurveyApi } from 'src/app/entities/surveyApi.entity';
import { QuestionApiService } from 'src/app/services/questionApi.service';
import { QuestionOptionApiService } from 'src/app/services/questionOptionApi.service';
import { QuestionTypeApiService } from 'src/app/services/questionTypeApi.service';
import { SurveyApiService } from 'src/app/services/surveyApi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'add-question',
  templateUrl: './addQuestion.component.html',
})
export class AddQuestionComponent implements OnInit {
  addQuestionForm: FormGroup;
  selected: string;
  renderer: any;
  optionItem: any;
  surveys: SurveyApi[];
  questionTypes: QuestionTypeApi[];
  questionType: string;
  resultApi: ResultApi;
  constructor(
    private surveyApiService: SurveyApiService,
    private questionTypeApiService: QuestionTypeApiService,
    private questionApiService: QuestionApiService,
    private questionOptionApiService: QuestionOptionApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.selected = '';
    this.surveyApiService.findAll().then(
      (res) => {
        this.surveys = res as SurveyApi[];
        console.log(this.surveys);
      },
      (err) => {
        console.log(err);
      }
    );

    this.questionTypeApiService.findAll().then(
      (res) => {
        this.questionTypes = res as QuestionTypeApi[];
        console.log(this.questionTypes);
      },
      (err) => {
        console.log(err);
      }
    );

    this.addQuestionForm = this.formBuilder.group({
      surveyId: ['', Validators.required],
      questiontypeId: ['', Validators.required],
      questionText: ['', Validators.required],
      isMandatory: true,
    });
  }

  // renderOption() {
  //   var optionContainer = document.querySelector('.option-container');
  //   console.log(optionContainer);
  //   this.questionTypeApiService
  //     .findById(this.addQuestionForm.get('questiontypeId').value)
  //     .then(
  //       (res) => {
  //         var questionType: QuestionTypeApi = res as QuestionTypeApi;
  //         console.log(questionType);
  //         console.log(questionType.name);
  //         this.selected = questionType.name;
  //         if (this.selected == 'checkbox') {
  //           optionContainer.insertAdjacentHTML(
  //             'beforeend',
  //             '<div class="d-flex align-items-center justify-content-between mb-3 w-75 option-item"><input type="checkbox" /> <input type="text" placeholder="Option ..." class="form-control ml-3"/></div>'
  //           );
  //         }
  //         if (this.selected == 'radio') {
  //           optionContainer.insertAdjacentHTML(
  //             'beforeend',
  //             '<div class="d-flex align-items-center justify-content-center mb-3 w-75 option-item"><input type="radio" name="radio" /> <input type="text" placeholder="Option ..." class="form-control ml-3"/></div>'
  //           );
  //         }
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  // add(selected) {
  //   console.log(selected);
  //   var optionContainer = document.querySelector('.option-container');
  //   optionContainer.insertAdjacentHTML(
  //     'beforeend',
  //     `<div class="d-flex align-items-center justify-content-center mb-3 w-75 option-item"><input type=${selected.toLowerCase()} name=${selected.toLowerCase()} /> <input type="text" placeholder="Option ..." class="form-control ml-3"/></div>`
  //   );
  //   this.optionItem = document.querySelectorAll('.option-item').length;
  // }

  // delete() {
  //   var optionItem = document.querySelector('.option-item');
  //   optionItem.remove();
  // }

  save() {
    var question: QuestionApi = this.addQuestionForm.value;
    console.log(question);
    if (this.addQuestionForm.get('questiontypeId').value == 4) {
      this.questionApiService.create(question).then(
        (res) => {
          this.resultApi = res as ResultApi;
          this.questionApiService.findTheNewest().then(
            (res) => {
              var newestQuestion: QuestionApi = res as QuestionApi;
              var addQuestionOption: FormGroup = this.formBuilder.group({
                questionId: newestQuestion.id,
                value: '',
              });
              var questionOptionText: QuestionOptionApi =
                addQuestionOption.value;
              console.log(questionOptionText);
              this.questionOptionApiService.create(questionOptionText).then(
                (res) => {
                  this.resultApi = res as ResultApi;
                },
                (err) => {
                  console.log(err);
                }
              );
              if (this.resultApi) {
                Swal.fire({
                  title: 'Success!',
                  text: 'A row has been record!',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigate(['/question']);
                  }
                });
              }
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (err) => {
          console.log(err);
          if (!this.resultApi) {
            Swal.fire('Error!', 'There is an error!', 'error');
          }
        }
      );
    } else {
      this.questionApiService.create(question).then(
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
}
