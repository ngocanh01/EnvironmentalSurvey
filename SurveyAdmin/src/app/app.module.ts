import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCategoryComponent } from './components/add-category/addCategory.component';
import { AddQuestionComponent } from './components/add-question/addQuestion.component';
import { AddSurveyComponent } from './components/add-survey/addSurvey.component';
import { CategoryComponent } from './components/list-category/category.component';
import { QuestionComponent } from './components/list-question/question.component';
import { CheckBoxOptionComponent } from './components/checkBoxOption/checkBoxOption.component';
import { SurveyComponent } from './components/list-survey/survey.component';
import { UpdateCategoryComponent } from './components/update-category/updateCategory.component';
import { UpdateQuestionComponent } from './components/update-question/updateQuestion.component';
import { UpdateSurveyComponent } from './components/update-survey/updateSurvey.component';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar.component';
import { SidebarComponent } from './sidebar.component';
import { RadioOptionComponent } from './components/radioOption/radioOption.component';
import { CommonModule, DatePipe } from '@angular/common';
import { QuestionTypeComponent } from './components/list-questionType/questionType.component';
import { AddQuestionTypeComponent } from './components/add-questionType/addQuestionType.component';
import { UpdateQuestionTypeComponent } from './components/update-questionType/updateQuestionType.component';
import { UserComponent } from './components/list-user/user.component';
import { AddUserComponent } from './components/add-user/addUser.component';
import { UpdateUserComponent } from './components/update-user/updateUser.component';
import { RoleComponent } from './components/list-role/role.component';
import { AddRoleComponent } from './components/add-role/addRole.component';
import { UpdateRoleComponent } from './components/update-role/updateRole.component';
import { ResponseComponent } from './components/list-response/response.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryApiService } from './services/categoryApi.service';
import { SurveyApiService } from './services/surveyApi.service';
import { CalendarModule } from 'primeng/calendar';
import { QuestionTypeApiService } from './services/questionTypeApi.service';
import { QuestionApiService } from './services/questionApi.service';
import { AddQuestionOptionComponent } from './components/add-questionOption/addQuestionOption.component';
import { QuestionOptionComponent } from './components/list-questionOption/questionOption.component';
import { QuestionOptionApiService } from './services/questionOptionApi.service';
import { UpdateQuestionOptionComponent } from './components/update-questionOption/updateQuestionOption.component';
import { ResponseApiService } from './services/responseApi.service';
import { ResponseDetailComponent } from './components/response-details/response-detail.component';
import { AnswerApiService } from './services/answerApi.service';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    CategoryComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    SurveyComponent,
    AddSurveyComponent,
    UpdateSurveyComponent,
    QuestionComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    CheckBoxOptionComponent,
    RadioOptionComponent,
    QuestionTypeComponent,
    AddQuestionTypeComponent,
    UpdateQuestionTypeComponent,
    QuestionOptionComponent,
    AddQuestionOptionComponent,
    UpdateQuestionOptionComponent,
    UserComponent,
    AddUserComponent,
    UpdateUserComponent,
    RoleComponent,
    AddRoleComponent,
    UpdateRoleComponent,
    ResponseComponent,
    ResponseDetailComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    CalendarModule,
  ],
  providers: [
    CategoryApiService,
    SurveyApiService,
    QuestionTypeApiService,
    QuestionApiService,
    QuestionOptionApiService,
    ResponseApiService,
    AnswerApiService,
    UserService,
    RoleService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
