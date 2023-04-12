import { Component, OnInit } from '@angular/core';
import { CategoryApi } from 'src/app/entities/categoryApi.entity';
import { SurveyAPI } from 'src/app/models/surveyapi.model';
import { CategoryApiService } from 'src/app/services/categoryApi.service';
import { SurveyAPIService } from 'src/app/services/surveyapi.service';

@Component({
  selector: 'survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  surveys: SurveyAPI[];
  categories: CategoryApi[];
  selected: string;
  constructor(
    private surveyAPIService: SurveyAPIService,
    private categoryService: CategoryApiService
  ) {}
  ngOnInit(): void {
    this.selected = '';
    // this.categoryService.findAll().then((res) => {
    //   this.categories = res as CategoryApi[];
    // });
    this.surveyAPIService.findAll2().then(
      (res) => {
        this.surveys = res as SurveyAPI[];
        console.log(this.surveys);
      },
      (err) => {
        console.log('Error');
      }
    );
  }
}
