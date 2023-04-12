import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CategoryApi } from '../entities/categoryApi.entity';
import { QuestionApi } from '../entities/questionApi.entity';
import { QuestionOptionApi } from '../entities/questionOptionApi.entity';

@Injectable()
export class QuestionOptionApiService {
  private BASE_URL: string = 'https://localhost:7077/api/questionOption/';
  constructor(private httpClient: HttpClient) {}
  async findAll() {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findallquesOption')
    );
  }
  async findById(id: string) {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findbyid/' + id)
    );
  }
  async create(questionOption: QuestionOptionApi) {
    return await lastValueFrom(
      this.httpClient.post(this.BASE_URL + 'createquesOption', questionOption)
    );
  }
  async update(questionOption: QuestionOptionApi) {
    return await lastValueFrom(
      this.httpClient.put(this.BASE_URL + 'editquesOption', questionOption)
    );
  }
  async delete(id: string) {
    return await lastValueFrom(
      this.httpClient.delete(this.BASE_URL + 'delquesOption/' + id)
    );
  }
}
