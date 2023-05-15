import { IAnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private _answersRepository: IAnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this._answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer dont exists.");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not allowed.");
    }
    await this._answersRepository.delete(answer);

    return {};
  }
}
