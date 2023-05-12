import { IQuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";
import { Question } from "@/domain/forum/enterprise/entities/question";

const fakeQuestionsRepository: IQuestionsRepository = {
  create: async (answer: Question) => {},
};

test("create a question", async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository);

  const { question } = await createQuestion.execute({
    authorId: "1",
    title: "title",
    content: "Conteudo da pergunta",
  });

  expect(question.id).toBeTruthy();
});
