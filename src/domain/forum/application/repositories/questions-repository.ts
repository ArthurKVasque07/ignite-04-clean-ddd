import { Question } from "../../enterprise/entities/question";

export interface IQuestionsRepository {
  create(answer: Question): Promise<void>;
}
