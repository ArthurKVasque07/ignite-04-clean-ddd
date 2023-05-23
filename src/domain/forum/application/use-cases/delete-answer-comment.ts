import { Either, left, right } from "@/core/either";
import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>;

export class DeleteAnswerCommentUseCase {
  constructor(private _answerCommentRepository: IAnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this._answerCommentRepository.findById(
      answerCommentId
    );

    if (!answerComment) {
      return left("Answer comment not found.");
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left("Not allowed");
    }

    await this._answerCommentRepository.delete(answerComment);

    return right({});
  }
}
