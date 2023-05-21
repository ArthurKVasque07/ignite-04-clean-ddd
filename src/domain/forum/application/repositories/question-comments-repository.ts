import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface IQuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>;
}
