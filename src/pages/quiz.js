import React, {lazy, Suspense} from 'react'
import {Loading} from '../components/Loading'
const QuizMain = lazy(() => import('../components/quiz/quiz-main'))

export function Quiz() {
	return (
		<Suspense fallback={<Loading/>}>
			<QuizMain/>
		</Suspense>
	)
}
