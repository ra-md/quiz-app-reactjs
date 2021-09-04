import React, {lazy, Suspense} from 'react'
import {
  Flex,
  Container,
} from '@chakra-ui/react'
import {Loading} from '../components/Loading'
const QuizResult = lazy(() => import('../components/quiz/quiz-result'))

export function Result() {
	return (
    <Suspense fallback={<Loading/>}>
      <Container textAlign='center'>
        <Flex minH="100vh" direction='column' justify='center'>
          <QuizResult/>
        </Flex>
      </Container>
    </Suspense>
	)
}
