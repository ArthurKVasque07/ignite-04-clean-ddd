import { expect, test } from 'vitest';
import { AnswerQuestionUseCase } from '../../domain/use-cases/answer-question';
import { IAnswersRepository } from '../../domain/repositories/answers-repository';
import { Answer } from '../../domain/entities/answer';

const fakeAnswersRepository: IAnswersRepository = {
  create: async (answer: Answer) => {
    return;
  }
} 

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    content: 'Nova respposta',
    instructorId: '1',
    questionId: '1'
  })

  expect(answer.content).toEqual('Nova respposta')
})
