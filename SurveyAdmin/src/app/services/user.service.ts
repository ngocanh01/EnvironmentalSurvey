import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  private BASE_URL: string = 'https://localhost:7077/api/user/';

  constructor(private httpClient: HttpClient) {}

  async findall() {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findallacc')
    );
  }

  async findId(id: string) {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findid/' + id)
    );
  }
  async Create(user: User, id: string) {
    return await lastValueFrom(
      this.httpClient.post(this.BASE_URL + 'createacc/' + id, user)
    );
  }

  async Delete(id: string) {
    return await lastValueFrom(
      this.httpClient.delete(this.BASE_URL + 'delacc/' + id)
    );
  }

  async Update(user: User, id: string) {
    return await lastValueFrom(
      this.httpClient.put(this.BASE_URL + 'editacc/' + id, user)
    );
  }

  async CheckExist(username: string) {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'checkuser/' + username)
    );
  }

  async login(user: User) {
    return await lastValueFrom(
      this.httpClient.post(this.BASE_URL + 'Login', user)
    );
  }
  async findUser(username: string) {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'finduser/' + username)
    );
  }
}
