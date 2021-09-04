import React from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import { Button, Text } from '@chakra-ui/react';

export default function QuizResult() {
	const location = useLocation()
	const history = useHistory()

	if(location.state == null) {
		history.replace('/')
		return null
	}

	return location.state && (
		<>
			<Text fontSize='3xl' fontWeight='bold' mb={16}>Your score: {location.state.score}</Text>
			<Button colorScheme='blue' onClick={() => history.push('/')}>Restart</Button>
		</>
	)
}
