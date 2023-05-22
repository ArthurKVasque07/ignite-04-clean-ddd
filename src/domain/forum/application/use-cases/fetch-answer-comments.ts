import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface FetchAnswerCommentUseCaseRequest {
  answerId: string;
  page: number;
}

interface FetchAnswerCommentUseCaseResponse {
  answerComments: AnswerComment[];
}

export class FetchAnswerCommentsUseCase {
  constructor(private _answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentUseCaseRequest): Promise<FetchAnswerCommentUseCaseResponse> {
    const answerComments =
      await this._answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });

    return {
      answerComments,
    };
  }
}
