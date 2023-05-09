import { Answer } from "../entities/answer";
import { IAnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(
    private _answersRepository: IAnswersRepository
  ) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({ 
      content, 
      authorId: instructorId, 
      questionId 
    });

    await this._answersRepository.create(answer);

    return answer;
  }
}