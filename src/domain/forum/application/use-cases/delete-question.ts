import { IQuestionsRepository } from "../repositories/questions-repository";

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private _questionsRepository: IQuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this._questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question dont exists.");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed.");
    }
    await this._questionsRepository.delete(question);

    return {};
  }
}
