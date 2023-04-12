export class SurveyDetailAPI {
  surveyId: number;
  surveyName: string;
  questions: Question[];
}
export class Question {
  questionId: number;
  questionName: string;
  questionTypeId: number;
  options: Option[];
  isMandatory: boolean;
}
export class Option {
  optionId: number;
  optionName: string;
  isSelected: boolean;
}
