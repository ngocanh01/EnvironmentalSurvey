import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleService {
  private BASE_URL: string = 'https://localhost:7077/api/role/';

  constructor(private httpClient: HttpClient) {}

  async findall() {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findallrole')
    );
  }

  async findId(id: string) {
    return await lastValueFrom(
      this.httpClient.get(this.BASE_URL + 'findid/' + id)
    );
  }
  async Create(role: Role) {
    return await lastValueFrom(
      this.httpClient.post(this.BASE_URL + 'createrole', role)
    );
  }

  async Delete(id: string) {
    return await lastValueFrom(
      this.httpClient.delete(this.BASE_URL + 'delrole/' + id)
    );
  }

  async Update(role: Role) {
    return await lastValueFrom(
      this.httpClient.put(this.BASE_URL + 'editrole', role)
    );
  }
}
