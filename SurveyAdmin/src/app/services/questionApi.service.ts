import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { QuestionApi } from '../entities/questionApi.entity';
import { SurveyApi } from '../entities/surveyApi.entity';

@Injectable()
export class QuestionApiService {
  private BASE_URL: string = 'https://localhost:7077/api/question/';
  constructor(private httpClient: HttpClient) {}
  async findAll() {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findallquestion')
    );
  }
  async findTheNewest() {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findthenewest')
    );
  }
  async findById(id: string) {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findbyid/' + id)
    );
  }
  async create(question: QuestionApi) {
    return await lastValueFrom(
      this.httpClient.post(this.BASE_URL + 'createquestion', question)
    );
  }
  async update(question: QuestionApi) {
    return await lastValueFrom(
      this.httpClient.put(this.BASE_URL + 'editquestion', question)
    );
  }
  async delete(id: string) {
    return await lastValueFrom(
      this.httpClient.delete(this.BASE_URL + 'delquestion/' + id)
    );
  }
}
