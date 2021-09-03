import React from 'react'
import {
  Flex,
  Container,
} from '@chakra-ui/react'
import {QuizResult} from '../components/quiz/quiz-result'

export function Result() {
	return (
    <Container textAlign='center'>
      <Flex minH="100vh" direction='column' justify='center'>
        <QuizResult/>
      </Flex>
    </Container>
	)
}
