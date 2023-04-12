import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/addCategory.component';
import { AddQuestionComponent } from './components/add-question/addQuestion.component';
import { AddQuestionOptionComponent } from './components/add-questionOption/addQuestionOption.component';
import { AddQuestionTypeComponent } from './components/add-questionType/addQuestionType.component';
import { AddRoleComponent } from './components/add-role/addRole.component';
import { AddSurveyComponent } from './components/add-survey/addSurvey.component';
import { AddUserComponent } from './components/add-user/addUser.component';
import { CategoryComponent } from './components/list-category/category.component';
import { QuestionComponent } from './components/list-question/question.component';
import { QuestionOptionComponent } from './components/list-questionOption/questionOption.component';
import { QuestionTypeComponent } from './components/list-questionType/questionType.component';
import { ResponseComponent } from './components/list-response/response.component';
import { RoleComponent } from './components/list-role/role.component';
import { SurveyComponent } from './components/list-survey/survey.component';
import { UserComponent } from './components/list-user/user.component';
import { ResponseDetailComponent } from './components/response-details/response-detail.component';
import { UpdateCategoryComponent } from './components/update-category/updateCategory.component';
import { UpdateQuestionComponent } from './components/update-question/updateQuestion.component';
import { UpdateQuestionOptionComponent } from './components/update-questionOption/updateQuestionOption.component';
import { UpdateQuestionTypeComponent } from './components/update-questionType/updateQuestionType.component';
import { UpdateRoleComponent } from './components/update-role/updateRole.component';
import { UpdateSurveyComponent } from './components/update-survey/updateSurvey.component';
import { UpdateUserComponent } from './components/update-user/updateUser.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
  },
  {
    path: 'update-category',
    component: UpdateCategoryComponent,
  },
  {
    path: 'survey',
    component: SurveyComponent,
  },
  {
    path: 'add-survey',
    component: AddSurveyComponent,
  },
  {
    path: 'update-survey',
    component: UpdateSurveyComponent,
  },
  {
    path: 'question',
    component: QuestionComponent,
  },
  {
    path: 'add-question',
    component: AddQuestionComponent,
  },
  {
    path: 'update-question',
    component: UpdateQuestionComponent,
  },
  {
    path: 'question-type',
    component: QuestionTypeComponent,
  },
  {
    path: 'add-question-type',
    component: AddQuestionTypeComponent,
  },
  {
    path: 'update-question-type',
    component: UpdateQuestionTypeComponent,
  },
  {
    path: 'question-option',
    component: QuestionOptionComponent,
  },
  {
    path: 'add-question-option',
    component: AddQuestionOptionComponent,
  },
  {
    path: 'update-question-option',
    component: UpdateQuestionOptionComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'add-user',
    component: AddUserComponent,
  },
  {
    path: 'update-user',
    component: UpdateUserComponent,
  },
  {
    path: 'role',
    component: RoleComponent,
  },
  {
    path: 'add-role',
    component: AddRoleComponent,
  },
  {
    path: 'update-role',
    component: UpdateRoleComponent,
  },
  {
    path: 'response',
    component: ResponseComponent,
  },
  {
    path: 'response-detail',
    component: ResponseDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
