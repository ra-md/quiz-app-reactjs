import React from 'react'
import {
  Box,
  Center,
} from '@chakra-ui/react'
import { QuizForm } from '../components/quiz/quiz-form'

export function Home() {
	return (
		<Box textAlign='center' fontSize='xl'>
      <Center minH='100vh'>
        <QuizForm/>
      </Center>
    </Box>
	)
}
