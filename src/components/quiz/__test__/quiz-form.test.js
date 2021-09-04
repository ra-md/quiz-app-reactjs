import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {useHistory} from 'react-router-dom'
import QuizForm from '../quiz-form'

jest.mock('react-router-dom', () => ({
	useHistory: jest.fn()
}))

test('submit quiz data correctly', () => {

	const push = jest.fn()

	useHistory.mockImplementation(() => ({
		push
	}))

	render(<QuizForm/>)

	const category = '21'
	const difficulty = 'easy'
	const amount = '2'

	const quizCategory = screen.getByLabelText(/category/i)
	const quizDifficulty = screen.getByLabelText(/difficulty/i)
	const numberOfQuestions = screen.getByLabelText(/number of questions/i)
	const submit = screen.getByRole('button', {name: /start/i})

	userEvent.selectOptions(quizCategory, [category])
	userEvent.selectOptions(quizDifficulty, [difficulty])
	userEvent.clear(numberOfQuestions)
	userEvent.type(numberOfQuestions, amount)
	userEvent.click(submit)

	expect(push).toHaveBeenCalledWith('/quiz', {category, difficulty, amount})
})
