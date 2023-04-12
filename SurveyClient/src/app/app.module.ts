import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SurveyComponent } from './components/survey/survey.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SurveyDetailsComponent } from './components/survey-details/survey-details.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SurveyModule } from 'survey-angular-ui';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SurveyDetailApiService } from './services/surveyDetailsApi.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { EditprofileComponent } from './components/profile/editprofile.component';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { SurveyAPIService } from './services/surveyapi.service';
import { ResponseAPIService } from './services/responseapi.service';
import { AnswerAPIService } from './services/answerapi.service';
import { CategoryApiService } from './services/categoryApi.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    FooterComponent,
    SurveyComponent,
    SurveyDetailsComponent,
    AboutUsComponent,
    FaqsComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    EditprofileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    SurveyModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    DatePipe,
    SurveyAPIService,
    SurveyDetailApiService,
    ResponseAPIService,
    AnswerAPIService,
    UserService,
    RoleService,
    CategoryApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
