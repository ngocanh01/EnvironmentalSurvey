import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionTypeApi } from 'src/app/entities/questionTypeApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { QuestionTypeApiService } from 'src/app/services/questionTypeApi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'add-QuestionType',
  templateUrl: './addQuestionType.component.html',
})
export class AddQuestionTypeComponent implements OnInit {
  addQuestionTypeForm: FormGroup;
  resultApi: ResultApi;
  result: any;
  constructor(
    private questionTypeApiService: QuestionTypeApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.addQuestionTypeForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
    // console.log(this.addCategoryForm);
  }

  save() {
    var questionType: QuestionTypeApi = this.addQuestionTypeForm.value;
    console.log(questionType);
    this.questionTypeApiService.create(questionType).then(
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
