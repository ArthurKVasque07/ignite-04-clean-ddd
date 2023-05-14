import { Question } from "@/domain/forum/enterprise/entities/question";
import { IQuestionsRepository } from "../repositories/questions-repository";

interface GetQuestionBySlugUseCaseRequest {
  slug: string;
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question;
}

export class GetQuestionBySlugUseCase {
  constructor(private _questionsRepository: IQuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this._questionsRepository.findBySlug(slug);

    if (!question) {
      throw new Error("Question not found");
    }

    return {
      question,
    };
  }
}
