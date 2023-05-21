import { InMemoryAnswersRepository } from "../repositories/in-memory-answers-repository";
import { makeAnswer } from "../factories/make-answer";
import { InMemoryAnswerCommentRepository } from "../repositories/in-memory-answer-comments-repository";
import { CommentOnAnswerUseCase } from "@/domain/forum/application/use-cases/comment-on-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository;
let sut: CommentOnAnswerUseCase;

describe("Comment on answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository
    );
  });

  it("should be able to comment on answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "Teste",
    });

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual("Teste");
  });
});
