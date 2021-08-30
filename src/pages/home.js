import React from 'react'
import {
  Box,
  VStack,
  Grid,
} from '@chakra-ui/react'
import { QuizForm } from '../components/quiz/quiz-form'

export function Home() {
	return (
		<Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <QuizForm/>
        </VStack>
      </Grid>
    </Box>
	)
}
