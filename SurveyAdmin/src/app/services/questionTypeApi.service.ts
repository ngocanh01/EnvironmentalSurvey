import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CategoryApi } from '../entities/categoryApi.entity';
import { QuestionTypeApi } from '../entities/questionTypeApi.entity';

@Injectable()
export class QuestionTypeApiService {
  private BASE_URL: string = 'https://localhost:7077/api/questiontype/';
  constructor(private httpClient: HttpClient) {}
  async findAll() {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findallquestiontype')
    );
  }
  async findById(id: string) {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findbyid/' + id)
    );
  }
  async create(questionType: QuestionTypeApi) {
    return await lastValueFrom(
      this.httpClient.post(this.BASE_URL + 'createquestionType', questionType)
    );
  }
  async update(questionType: QuestionTypeApi) {
    return await lastValueFrom(
      this.httpClient.put(this.BASE_URL + 'editquestionType', questionType)
    );
  }
  async delete(id: string) {
    return await lastValueFrom(
      this.httpClient.delete(this.BASE_URL + 'delquestionType/' + id)
    );
  }
}
