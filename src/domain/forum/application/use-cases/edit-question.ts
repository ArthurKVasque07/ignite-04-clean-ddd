import { Question } from "../../enterprise/entities/question";
import { IQuestionsRepository } from "../repositories/questions-repository";

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

interface EditQuestionUseCaseResponse {
  question: Question;
}

export class EditQuestionUseCase {
  constructor(private _questionsRepository: IQuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this._questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question dont exists.");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    question.title = title;
    question.content = content;

    await this._questionsRepository.save(question);

    return {
      question,
    };
  }
}
