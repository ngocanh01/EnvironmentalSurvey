import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class QuestionOptionApiService {
  private BASE_URL: string = 'https://localhost:7077/api/questionOption/';
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
  async findByQuestionId(id: string) {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findbyquestionid/' + id)
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
