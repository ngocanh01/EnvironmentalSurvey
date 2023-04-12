import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { SurveyDetailAPI } from '../models/surveydetailsapi.model';

@Injectable({
  providedIn: 'root',
})
export class SurveyAPIService {
  BASE_URL: string = 'https://localhost:7077/api/survey/';

  constructor(private httpClient: HttpClient) {}

  async findAll() {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findallSurveys')
    );
  }
  async findAll2() {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findallSurveys2')
    );
  }
  async findByCate(id: string) {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findbycate/' + id)
    );
  }
  getSurveyDetailsById(id: string): Observable<any> {
    return of(
      this.httpClient.get(this.BASE_URL + 'getSurveyById/' + parseInt(id))
    );
  }
  private questions2 = {
    surveyId: 1,
    surveyName: 'Survey 1',
    questions: [
      {
        questionId: 6,
        questionName: 'question text 1',
        questionTypeId: 1,
        options: [
          {
            optionId: 3,
            optionName: 'value 1',
            isSelected: false,
          },
          {
            optionId: 4,
            optionName: 'value 2',
            isSelected: false,
          },
          {
            optionId: 5,
            optionName: 'value 3',
            isSelected: false,
          },
        ],
      },
      {
        questionId: 7,
        questionName: 'question text 2',
        questionTypeId: 2,
        options: [
          {
            optionId: 6,
            optionName: 'asdfd',
            isSelected: false,
          },
          {
            optionId: 7,
            optionName: 'no',
            isSelected: false,
          },
        ],
      },
      {
        questionId: 8,
        questionName: 'question text 3',
        questionTypeId: 2,
        options: [
          {
            optionId: 8,
            optionName: 'yes',
            isSelected: false,
          },
          {
            optionId: 9,
            optionName: 'no',
            isSelected: false,
          },
        ],
      },
      {
        questionId: 9,
        questionName: 'question text 4',
        questionTypeId: 1,
        options: [
          {
            optionId: 10,
            optionName: 'aaaaa',
            isSelected: false,
          },
          {
            optionId: 13,
            optionName: 'bbbb',
            isSelected: false,
          },
        ],
      },
      {
        questionId: 10,
        questionName: 'What is your name?',
        questionTypeId: 3,
        options: [
          {
            optionId: 14,
            optionName: 'text here',
            isSelected: false,
          },
        ],
      },
    ],
  };
  getSurvey(id: string): Observable<any> {
    console.log(this.getSurveyDetailsById(id));
    return of(this.getSurveyDetailsById(id) as any);
  }
}
