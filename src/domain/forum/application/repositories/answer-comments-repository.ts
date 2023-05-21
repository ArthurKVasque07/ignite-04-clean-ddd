import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface IAnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>;
}
