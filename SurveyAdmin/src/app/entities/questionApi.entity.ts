export class QuestionApi {
  id: number;
  surveyId: number;
  surveyName: string;
  questiontypeId: number;
  questiontypeName: string;
  questionText: string;
  isMandatory: boolean;
  questionOption: object;
}
