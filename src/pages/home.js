import React from 'react'
import {
  Box,
  Center,
  Container
} from '@chakra-ui/react'
import { QuizForm } from '../components/quiz/quiz-form'

export function Home() {
	return (
    <Container>
  		<Box textAlign='center' fontSize='xl'>
        <Center minH='100vh'>
          <QuizForm/>
        </Center>
      </Box>
    </Container>
	)
}
