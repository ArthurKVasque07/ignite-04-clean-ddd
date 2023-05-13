import { IQuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public items: Question[] = [];

  async create(question: Question) {
    this.items.push(question);
  }
}
