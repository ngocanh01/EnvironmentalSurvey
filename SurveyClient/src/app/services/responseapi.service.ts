import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, Observable } from "rxjs";
import { ResponseAPI } from "../models/responseapi.model";
import { SurveyDetailAPI } from "../models/surveydetailsapi.model";

@Injectable()
export class ResponseAPIService {

    BASE_URL: string = 'https://localhost:7077/api/response/';

    constructor(
        private httpClient: HttpClient
    ) {}

    async create(response : ResponseAPI) {
        return await lastValueFrom(this.httpClient.post(this.BASE_URL + 'createResponse' , response));
    } 

    async getLastestResponse(userId: number) {
        return await lastValueFrom(this.httpClient.get(this.BASE_URL + 'getLastest/' + userId ));
    }
}