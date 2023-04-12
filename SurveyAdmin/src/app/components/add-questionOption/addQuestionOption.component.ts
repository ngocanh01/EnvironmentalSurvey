import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryApi } from 'src/app/entities/categoryApi.entity';
import { QuestionApi } from 'src/app/entities/questionApi.entity';
import { QuestionOptionApi } from 'src/app/entities/questionOptionApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { CategoryApiService } from 'src/app/services/categoryApi.service';
import { QuestionApiService } from 'src/app/services/questionApi.service';
import { QuestionOptionApiService } from 'src/app/services/questionOptionApi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'add-questionOption',
  templateUrl: './addQuestionOption.component.html',
})
export class AddQuestionOptionComponent implements OnInit {
  addQuestionOptionForm: FormGroup;
  questions: QuestionApi[];
  resultApi: ResultApi;
  result: number;
  constructor(
    private questionOptionApiService: QuestionOptionApiService,
    private questionApiService: QuestionApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.result = 0;
    this.questionApiService.findAll().then(
      (res) => {
        this.questions = res as QuestionApi[];
        console.log(this.questions);
      },
      (err) => {
        console.log(err);
      }
    );
    this.addQuestionOptionForm = this.formBuilder.group({
      questionId: ['', Validators.required],
      value: new FormArray([new FormControl(null, Validators.required)]),
    });
    console.log(this.addQuestionOptionForm.get('value').value);
    // console.log(this.addCategoryForm);
  }

  addOption() {
    (<FormArray>this.addQuestionOptionForm.get('value')).push(
      new FormControl(null, Validators.required)
    );
  }

  removeOption() {
    var length = this.addQuestionOptionForm.get('value').value.length;
    if (length > 1) {
      (<FormArray>this.addQuestionOptionForm.get('value')).removeAt(length - 1);
    }
  }

  save() {
    var questionOption: QuestionOptionApi = this.addQuestionOptionForm.value;
    console.log(this.addQuestionOptionForm.get('value').value.length);
    var length = this.addQuestionOptionForm.get('value').value.length;
    for (let i = 0; i < length; i++) {
      this.addQuestionOptionForm = this.formBuilder.group({
        questionId: questionOption.questionId,
        value: questionOption.value[i],
      });
      var newOption = this.addQuestionOptionForm.value;
      this.questionOptionApiService.create(newOption).then(
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
                this.router.navigate(['/question-option']);
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
    this.addQuestionOptionForm = this.formBuilder.group({
      questionId: '',
      value: new FormArray([new FormControl(null)]),
    });
  }
}
