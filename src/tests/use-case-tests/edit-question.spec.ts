import { InMemoryQuestionsRepository } from "../repositories/in-memory-questions-repository";
import { makeQuestion } from "../factories/make-question";
import { EditQuestionUseCase } from "@/domain/forum/application/use-cases/edit-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: "author-1",
      questionId: newQuestion.id.toValue(),
      title: "Pergunta teste",
      content: "Content teste",
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "Pergunta teste",
      content: "Content teste",
    });
  });

  it("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    expect(async () => {
      return await sut.execute({
        authorId: "author-2",
        questionId: newQuestion.id.toValue(),
        title: "Pergunta teste",
        content: "Content teste",
      });
    }).rejects.toBeInstanceOf(Error);

    expect(inMemoryQuestionsRepository.items).toHaveLength(1);
  });
});
