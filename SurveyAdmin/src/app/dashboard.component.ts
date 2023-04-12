import { Component, OnInit } from '@angular/core';
import { QuestionApi } from './entities/questionApi.entity';
import { ResponseApi } from './entities/responseApi.entity';
import { SurveyApi } from './entities/surveyApi.entity';
import { User } from './entities/user.entity';
import { QuestionApiService } from './services/questionApi.service';
import { ResponseApiService } from './services/responseApi.service';
import { SurveyApiService } from './services/surveyApi.service';
import { UserService } from './services/user.service';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  surveys: SurveyApi[];
  users: User[];
  responses: ResponseApi[];
  questions: QuestionApi[];
  totalSurvey: number;
  totalUser: number;
  totalResponse: number;
  totalQuestion: number;

  constructor(
    private surveyApiService: SurveyApiService,
    private userService: UserService,
    private responseService: ResponseApiService,
    private questionService: QuestionApiService
  ) {}
  ngOnInit(): void {
    this.surveyApiService.findAll().then((res) => {
      this.surveys = res as SurveyApi[];
      this.totalSurvey = this.surveys.length;
      console.log(this.surveys.length);
    });
    this.userService.findall().then((res) => {
      this.users = res as User[];
      this.totalUser = this.users.length;
    });
    this.responseService.findAll().then((res) => {
      this.responses = res as ResponseApi[];
      this.totalResponse = this.responses.length;
    });
    this.questionService.findAll().then((res) => {
      this.questions = res as QuestionApi[];
      this.totalQuestion = this.questions.length;
    });
  }
}
