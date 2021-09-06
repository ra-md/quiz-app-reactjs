import React, {lazy, Suspense} from 'react'
import { Flex } from '@chakra-ui/react'
import {Loading} from '../components/Loading'
const QuizResult = lazy(() => import('../components/quiz/quiz-result'))

export function Result() {
	return (
    <Suspense fallback={<Loading/>}>
      <Flex minH="100vh" direction='column' justify='center' align='center'>
        <QuizResult/>
      </Flex>
    </Suspense>
	)
}
