import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuestionTypeApi } from 'src/app/entities/questionTypeApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { QuestionTypeApiService } from 'src/app/services/questionTypeApi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'update-QuestionType',
  templateUrl: './updateQuestionType.component.html',
})
export class UpdateQuestionTypeComponent implements OnInit {
  id: string;
  editQuestionTypeForm: FormGroup;
  resultApi: ResultApi;
  constructor(
    private questionTypeApiService: QuestionTypeApiService,
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
    this.questionTypeApiService.findById(this.id).then(
      (res) => {
        var questionType: QuestionTypeApi = res as QuestionTypeApi;
        console.log(questionType);
        this.editQuestionTypeForm = this.formBuilder.group({
          id: questionType.id,
          name: [questionType.name, Validators.required],
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  save() {
    var questionType: QuestionTypeApi = this.editQuestionTypeForm.value;
    console.log(questionType);
    this.questionTypeApiService.update(questionType).then(
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
              this.router.navigate(['/question-type']);
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
