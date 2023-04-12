import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CategoryApi } from '../entities/categoryApi.entity';

@Injectable()
export class ResponseApiService {
  private BASE_URL: string = 'https://localhost:7077/api/response/';
  constructor(private httpClient: HttpClient) {}
  async findAll() {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findallresponse')
    );
  }
  //   async findById(id: string) {
  //     return await lastValueFrom(
  //       this.httpClient.get(this.BASE_URL + 'findbyid/' + id)
  //     );
  //   }
  //   async create(category: CategoryApi) {
  //     return await lastValueFrom(
  //       this.httpClient.post(this.BASE_URL + 'createCate', category)
  //     );
  //   }
  //   async update(category: CategoryApi) {
  //     return await lastValueFrom(
  //       this.httpClient.put(this.BASE_URL + 'editCate', category)
  //     );
  //   }
  async delete(id: string) {
    return await lastValueFrom(
      this.httpClient.delete(this.BASE_URL + 'delresponse/' + id)
    );
  }
}
