import { IAnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { AnswerQuestionUseCase } from "@/domain/forum/application/use-cases/answer-question";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

const fakeAnswersRepository: IAnswersRepository = {
  create: async (answer: Answer) => {},
};

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    content: "Nova respposta",
    instructorId: "1",
    questionId: "1",
  });

  expect(answer.content).toEqual("Nova respposta");
});
