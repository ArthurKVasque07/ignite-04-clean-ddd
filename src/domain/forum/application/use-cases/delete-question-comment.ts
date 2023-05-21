import { IQuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(
    private _questionCommentRepository: IQuestionCommentsRepository
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this._questionCommentRepository.findById(
      questionCommentId
    );

    if (!questionComment) {
      throw new Error("Question comment not found.");
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error("Not allowed");
    }

    await this._questionCommentRepository.delete(questionComment);

    return {};
  }
}
