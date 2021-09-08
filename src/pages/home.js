import React from 'react'
import {
  Box,
  Center,
  Container
} from '@chakra-ui/react'
import QuizForm from '../components/quiz/quiz-form'
import { ColorModeSwitcher } from '../components/color-mode-switcher'

export function Home() {
	return (
    <>
    <Box position="absolute" right={0} p={2}>
      <ColorModeSwitcher/>
    </Box>
    <Container>
  		<Box textAlign='center' fontSize='xl'>
        <Center minH='100vh'>
          <QuizForm/>
        </Center>
      </Box>
    </Container>
    </>
	)
}
