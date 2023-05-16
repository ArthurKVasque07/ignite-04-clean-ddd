import { InMemoryAnswersRepository } from "../repositories/in-memory-answers-repository";
import { makeAnswer } from "../factories/make-answer";
import { EditAnswerUseCase } from "@/domain/forum/application/use-cases/edit-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: "author-1",
      answerId: newAnswer.id.toValue(),
      content: "Content teste",
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "Content teste",
    });
  });

  it("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    expect(async () => {
      return await sut.execute({
        authorId: "author-2",
        answerId: newAnswer.id.toValue(),
        content: "Content teste",
      });
    }).rejects.toBeInstanceOf(Error);

    expect(inMemoryAnswersRepository.items).toHaveLength(1);
  });
});
