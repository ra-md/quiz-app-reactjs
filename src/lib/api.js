import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export async function getQuiz(quiz) {
  if (quiz == null) return;

  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        type: 'multiple',
        difficulty: quiz.difficulty === 'any' ? undefined : quiz.difficulty,
        category: quiz.category === 'any' ? undefined : quiz.category,
        amount: quiz.amount,
      },
    });

    return response.data.results;
  } catch (error) {
    throw new Error(error.response?.data.message);
  }
}
