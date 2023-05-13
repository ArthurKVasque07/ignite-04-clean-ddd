import { Question } from "../../enterprise/entities/question";

export interface IQuestionsRepository {
  create(question: Question): Promise<void>;
}
