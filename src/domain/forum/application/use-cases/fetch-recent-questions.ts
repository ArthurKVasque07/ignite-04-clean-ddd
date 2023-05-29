import { Question } from "@/domain/forum/enterprise/entities/question";
import { IQuestionsRepository } from "../repositories/questions-repository";
import { Either, right } from "@/core/either";

interface FetchRecentQuestionsUseCaseRequest {
  page: number;
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[];
  }
>;
export class FetchRecentQuestionsUseCase {
  constructor(private _questionsRepository: IQuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this._questionsRepository.findManyRecent({ page });

    return right({
      questions,
    });
  }
}
