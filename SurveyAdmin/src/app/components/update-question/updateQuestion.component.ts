import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionApi } from 'src/app/entities/questionApi.entity';
import { QuestionTypeApi } from 'src/app/entities/questionTypeApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { SurveyApi } from 'src/app/entities/surveyApi.entity';
import { QuestionApiService } from 'src/app/services/questionApi.service';
import { QuestionTypeApiService } from 'src/app/services/questionTypeApi.service';
import { SurveyApiService } from 'src/app/services/surveyApi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'update-question',
  templateUrl: './updateQuestion.component.html',
})
export class UpdateQuestionComponent {
  editQuestionForm: FormGroup;
  id: string;
  selected: string;
  renderer: any;
  optionItem: any;
  surveys: SurveyApi[];
  questionTypes: QuestionTypeApi[];
  resultApi: ResultApi;
  constructor(
    private questionApiService: QuestionApiService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private surveyApiService: SurveyApiService,
    private questionTypeApiService: QuestionTypeApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.selected = '';
    this.activatedRoute.paramMap.subscribe((p) => {
      var id = p.get('id');
      this.id = id;
      console.log(this.id);
    });
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
    this.questionApiService.findById(this.id).then(
      (res) => {
        var question: QuestionApi = res as QuestionApi;
        console.log(question);
        this.editQuestionForm = this.formBuilder.group({
          id: question.id,
          surveyId: [question.surveyId, Validators.required],
          questiontypeId: [question.questiontypeId, Validators.required],
          questionText: [question.questionText, Validators.required],
          isMandatory: true,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  save() {
    var question: QuestionApi = this.editQuestionForm.value;
    // this.editQuestionForm = this.formBuilder.group({
    //   surveyId: question.surveyId,
    //   questiontypeId: question.questiontypeId,
    //   questionText: question.questionText,
    //   isMandatory: true,
    // });
    console.log(question);
    this.questionApiService.update(question).then(
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
              this.router.navigate(['/question']);
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
  // renderOption() {
  //   var optionContainer = document.querySelector('.option-container');
  //   if (this.selected === 'CheckBox') {
  //     optionContainer.insertAdjacentHTML(
  //       'beforeend',
  //       '<div class="d-flex align-items-center justify-content-between mb-3 w-75 option-item"><input type="checkbox" /> <input type="text" placeholder="Option ..." class="form-control ml-3"/></div>'
  //     );
  //   }
  //   if (this.selected === 'Radio') {
  //     optionContainer.insertAdjacentHTML(
  //       'beforeend',
  //       '<div class="d-flex align-items-center justify-content-center mb-3 w-75 option-item"><input type="radio" name="radio" /> <input type="text" placeholder="Option ..." class="form-control ml-3"/></div>'
  //     );
  //   }
  // }

  // add(selected) {
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
}
