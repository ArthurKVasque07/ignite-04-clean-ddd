import { Answer } from "../../enterprise/entities/answer";
import { IAnswersRepository } from "../repositories/answers-repository";

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private _answersRepository: IAnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this._answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer dont exists.");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    answer.content = content;

    await this._answersRepository.save(answer);

    return {
      answer,
    };
  }
}
