import { AnswerQuestionUseCase } from "@/domain/forum/application/use-cases/answer-question";
import { InMemoryAnswersRepository } from "../repositories/in-memory-answers-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Create answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to create a answer", async () => {
    const result = await sut.execute({
      questionId: "1",
      instructorId: "1",
      content: "Conteudo da respposta",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
  });
});
