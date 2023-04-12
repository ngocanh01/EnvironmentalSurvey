import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, Observable } from "rxjs";
import { AnswerApi } from "../models/answerapi.model";
import { ResponseAPI } from "../models/responseapi.model";
import { SurveyDetailAPI } from "../models/surveydetailsapi.model";

@Injectable()
export class AnswerAPIService {

    BASE_URL: string = 'https://localhost:7077/api/answer/';

    constructor(
        private httpClient: HttpClient
    ) {}

    async create(answer : AnswerApi) {
        return await lastValueFrom(this.httpClient.post(this.BASE_URL + 'createanswer' , answer));
    } 

    async getLastestResponse(userId: number) {
        return await lastValueFrom(this.httpClient.get(this.BASE_URL + 'getLastest/' + userId ));
    }
    async getForm(json: AnswerApi) {
        return await lastValueFrom(this.httpClient.post(this.BASE_URL + 'getForm' ,json));
    }
}