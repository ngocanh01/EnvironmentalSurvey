import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SurveyDetailApiService {
  private BASE_URL: string = 'https://localhost:7077/api/question/';
  constructor(private httpClient: HttpClient) {}
  //   async findAll() {
  //     return await lastValueFrom(
  //       this.httpClient.get(this.BASE_URL + 'findallquestion')
  //     );
  //   }
  //   async findTheNewest() {
  //     return await lastValueFrom(
  //       this.httpClient.get(this.BASE_URL + 'findthenewest')
  //     );
  //   }
  async findBySurveyId(id: string) {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findbysurveyid/' + id)
    );
  }
  //   async create(question: QuestionApi) {
  //     return await lastValueFrom(
  //       this.httpClient.post(this.BASE_URL + 'createquestion', question)
  //     );
  //   }
  //   async update(question: QuestionApi) {
  //     return await lastValueFrom(
  //       this.httpClient.put(this.BASE_URL + 'editquestion', question)
  //     );
  //   }
  //   async delete(id: string) {
  //     return await lastValueFrom(
  //       this.httpClient.delete(this.BASE_URL + 'delquestion/' + id)
  //     );
  //   }
}
