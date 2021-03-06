import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {useHistory, useLocation} from 'react-router-dom'
import QuizResult from '../quiz-result'

jest.mock('react-router-dom', () => ({
	useHistory: jest.fn(),
	useLocation: jest.fn()
}))

test('replace route to "/"" if state null', () => {

	const mockReplace = jest.fn()

	useLocation.mockImplementation(() => {
		return {
			state: null
		}
	})

	useHistory.mockImplementation(() => {
		return {
			replace: mockReplace
		}
	})

	render(<QuizResult/>)

	expect(mockReplace).toHaveBeenCalledWith('/')
})

test('render score correctly', async () => {
	const score = 100

	useLocation.mockImplementation(() => {
		return {
			state: {score}
		}
	})

	useHistory.mockImplementation(() => {
		return {
			push: jest.fn()
		}
	})

	render(<QuizResult/>)

	const scoreEl = await screen.findByText(`Your score: ${score}`)

	expect(scoreEl).toBeInTheDocument()
})

test('play again the quiz if "Play again" button clicked', () => {
	const mockPush = jest.fn()

	useLocation.mockImplementation(() => {
		return {
			state: {score: 100}
		}
	})

	useHistory.mockImplementation(() => {
		return {
			push: mockPush
		}
	})

	render(<QuizResult/>)

	userEvent.click(screen.getByRole('button', {name: /play again/i}))

	expect(mockPush).toHaveBeenCalledWith('/')
})
