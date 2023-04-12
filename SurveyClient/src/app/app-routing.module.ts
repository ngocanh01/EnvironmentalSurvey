import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EditprofileComponent } from './components/profile/editprofile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SurveyDetailsComponent } from './components/survey-details/survey-details.component';
import { SurveyComponent } from './components/survey/survey.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'survey',
    component: SurveyComponent,
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent,
  },
  {
    path: 'faqs',
    component: FaqsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'editprofile',
    component: EditprofileComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'survey/survey-details',
    component: SurveyDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
