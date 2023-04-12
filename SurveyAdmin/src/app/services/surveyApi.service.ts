import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SurveyApi } from '../entities/surveyApi.entity';

@Injectable()
export class SurveyApiService {
  private BASE_URL: string = 'https://localhost:7077/api/survey/';
  constructor(private httpClient: HttpClient) {}
  async findAll() {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findallSurveys')
    );
  }
  async findById(id: string) {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findbyid/' + id)
    );
  }
  async create(survey: SurveyApi) {
    return await lastValueFrom(
      this.httpClient.post(this.BASE_URL + 'createsurvey', survey)
    );
  }
  async update(survey: SurveyApi) {
    return await lastValueFrom(
      this.httpClient.put(this.BASE_URL + 'editsurvey', survey)
    );
  }
  async delete(id: string) {
    return await lastValueFrom(
      this.httpClient.delete(this.BASE_URL + 'delsurvey/' + id)
    );
  }
}
