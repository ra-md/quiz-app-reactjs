import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useLocation, useHistory } from 'react-router-dom';
import htmr from 'htmr'
import QuizMain from '../quiz-main';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { reactQueryRender } from '../../../test/test-utils';
import fakeQuizData from '../../../test/data/quiz.json';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useHistory: jest.fn(),
}));

const server = setupServer();

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const quizFormValue = {
  category: '9',
  difficulty: 'hard',
  amount: 1,
}

test('redirect to / if state undefined', () => {
  const mockReplace = jest.fn();

  useLocation.mockImplementation(() => ({
    state: null,
  }));

  useHistory.mockImplementation(() => ({
    replace: mockReplace,
  }));

  reactQueryRender(<QuizMain />);

  expect(mockReplace).toHaveBeenCalledWith('/');
});

test('render error', async () => {
  const testErrorMessage = 'Oh no, something bad happened';

  useLocation.mockImplementation(() => ({
    state: quizFormValue,
  }));

  server.use(
    rest.get(process.env.REACT_APP_API_URL, async (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: testErrorMessage }));
    })
  );

  reactQueryRender(<QuizMain />);

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole('alert')).toHaveTextContent(testErrorMessage);
});

test('render quiz correctly', async () => {
  useLocation.mockImplementation(() => ({
    state: quizFormValue,
  }));

  server.use(
    rest.get(process.env.REACT_APP_API_URL, async (req, res, ctx) => {
      return res(ctx.json(fakeQuizData));
    })
  );

  reactQueryRender(<QuizMain />);

  // expect loading
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // expect quiz category
  expect(
    screen.getByText(fakeQuizData.results[0].category)
  ).toBeInTheDocument();

  expect(
    screen.getByText(`Difficulty: ${fakeQuizData.results[0].difficulty}`)
  ).toBeInTheDocument();

  // // expect quiz question rendered
  expect(
    screen.getByText(htmr(fakeQuizData.results[0].question))
  ).toBeInTheDocument();

  // expect quiz answer rendered
  expect(
    screen.getByText(htmr(fakeQuizData.results[0].correct_answer))
  ).toBeVisible();
  expect(
    screen.getByText(htmr(fakeQuizData.results[0].incorrect_answers[0]))
  ).toBeInTheDocument();
  expect(
    screen.getByText(htmr(fakeQuizData.results[0].incorrect_answers[1]))
  ).toBeInTheDocument();
  expect(
    screen.getByText(htmr(fakeQuizData.results[0].incorrect_answers[2]))
  ).toBeInTheDocument();
});

test('disable answer after user select the answer', async () => {
  useLocation.mockImplementation(() => ({
    state: quizFormValue,
  }));

  server.use(
    rest.get(process.env.REACT_APP_API_URL, async (req, res, ctx) => {
      return res(ctx.json(fakeQuizData));
    })
  );

  reactQueryRender(<QuizMain />);

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // expect score 0
  expect(
    screen.getByRole('button', {
      name: htmr(fakeQuizData.results[0].incorrect_answers[0]),
    })
  ).not.toHaveAttribute('disabled');
  expect(
    screen.getByRole('button', {
      name: htmr(fakeQuizData.results[0].incorrect_answers[1]),
    })
  ).not.toHaveAttribute('disabled');
  expect(
    screen.getByRole('button', {
      name: htmr(fakeQuizData.results[0].incorrect_answers[2]),
    })
  ).not.toHaveAttribute('disabled');

  // click
  userEvent.click(
    screen.getByRole('button', {
      name: htmr(fakeQuizData.results[0].correct_answer),
    })
  );

  // expect score 0
  expect(
    screen.getByRole('button', {
      name: htmr(fakeQuizData.results[0].correct_answer),
    })
  ).toHaveAttribute('disabled');
  expect(
    screen.getByRole('button', {
      name: htmr(fakeQuizData.results[0].incorrect_answers[0]),
    })
  ).toHaveAttribute('disabled');
  expect(
    screen.getByRole('button', {
      name: htmr(fakeQuizData.results[0].incorrect_answers[1]),
    })
  ).toHaveAttribute('disabled');
  expect(
    screen.getByRole('button', {
      name: htmr(fakeQuizData.results[0].incorrect_answers[2]),
    })
  ).toHaveAttribute('disabled');
});

test('user click next', async () => {
  useLocation.mockImplementation(() => ({
    state: quizFormValue,
  }));

  server.use(
    rest.get(process.env.REACT_APP_API_URL, async (req, res, ctx) => {
      return res(ctx.json(fakeQuizData));
    })
  );

  reactQueryRender(<QuizMain />);

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // expect next button disable
  expect(
    screen.getByRole('button', {
      name: /next/i,
    })
  ).toHaveAttribute('disabled');

  // user has answered the question
  userEvent.click(
    screen.getByRole('button', {
      name: htmr(fakeQuizData.results[0].correct_answer),
    })
  );

  expect(
    screen.getByRole('button', {
      name: /next/i,
    })
  ).not.toHaveAttribute('disabled');

  userEvent.click(
    screen.getByRole('button', {
      name: /next/i,
    })
  );

  // next button clicked and quiz changed
  expect(
    screen.getByText(fakeQuizData.results[1].category)
  ).toBeInTheDocument();

  expect(
    screen.getByText(`Difficulty: ${fakeQuizData.results[1].difficulty}`)
  ).toBeInTheDocument();

  expect(
    screen.getByText(htmr(fakeQuizData.results[1].question))
  ).toBeInTheDocument();

  expect(
    screen.getByText(htmr(fakeQuizData.results[1].correct_answer))
  ).toBeVisible();
  expect(
    screen.getByText(htmr(fakeQuizData.results[1].incorrect_answers[0]))
  ).toBeInTheDocument();
  expect(
    screen.getByText(htmr(fakeQuizData.results[1].incorrect_answers[1]))
  ).toBeInTheDocument();
  expect(
    screen.getByText(htmr(fakeQuizData.results[1].incorrect_answers[2]))
  ).toBeInTheDocument();
});

test('go to result page', async () => {
  const result = fakeQuizData.results[fakeQuizData.results.length - 1];

  const mockReplace = jest.fn();

  useLocation.mockImplementation(() => ({
    state: quizFormValue,
  }));

  useHistory.mockImplementation(() => ({
    replace: mockReplace,
  }));

  server.use(
    rest.get(process.env.REACT_APP_API_URL, async (req, res, ctx) => {
      return res(
        ctx.json({
          results: [result],
        })
      );
    })
  );

  reactQueryRender(<QuizMain />);

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  userEvent.click(
    screen.getByRole('button', {
      name: htmr(result.correct_answer),
    })
  );

  userEvent.click(
    screen.getByRole('button', {
      name: /result/i,
    })
  );

  expect(mockReplace).toHaveBeenCalledWith('/quiz/result', { score: 100 });
});
