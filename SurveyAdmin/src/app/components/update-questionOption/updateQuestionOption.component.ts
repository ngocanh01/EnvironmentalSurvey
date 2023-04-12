import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryApi } from 'src/app/entities/categoryApi.entity';
import { QuestionApi } from 'src/app/entities/questionApi.entity';
import { QuestionOptionApi } from 'src/app/entities/questionOptionApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { CategoryApiService } from 'src/app/services/categoryApi.service';
import { QuestionApiService } from 'src/app/services/questionApi.service';
import { QuestionOptionApiService } from 'src/app/services/questionOptionApi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'update-questionOption',
  templateUrl: './updateQuestionOption.component.html',
})
export class UpdateQuestionOptionComponent implements OnInit {
  id: string;
  editQuestionOptionForm: FormGroup;
  questions: QuestionApi[];
  resultApi: ResultApi;
  constructor(
    private questionOptionApiService: QuestionOptionApiService,
    private questionApiService: QuestionApiService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => {
      var id = p.get('id');
      this.id = id;
      console.log(this.id);
    });
    this.questionApiService.findAll().then(
      (res) => {
        this.questions = res as QuestionApi[];
        console.log(this.questions);
      },
      (err) => {
        console.log(err);
      }
    );
    this.questionOptionApiService.findById(this.id).then(
      (res) => {
        var questionOption: QuestionOptionApi = res as QuestionOptionApi;
        console.log(questionOption);
        this.editQuestionOptionForm = this.formBuilder.group({
          id: questionOption.id,
          questionId: [questionOption.questionId, Validators.required],
          value: [questionOption.value, Validators.required],
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  save() {
    var questionOption: QuestionOptionApi = this.editQuestionOptionForm.value;
    console.log(questionOption);
    this.questionOptionApiService.update(questionOption).then(
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
}
