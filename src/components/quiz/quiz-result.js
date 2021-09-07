import React from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import { Button, Text } from '@chakra-ui/react';
import {useAnimateNumber} from '../../hooks/useAnimateNumber'

export default function QuizResult() {
	const location = useLocation()
	const history = useHistory()
	const value = useAnimateNumber({from: 0, to: location.state.score})

	if(location.state == null) {
		history.replace('/')
		return null
	}

	return location.state && (
		<>
			<Text fontSize='3xl' fontWeight='bold' mb={16}>Your score: {value}</Text>
			<Button colorScheme='blue' borderRadius='full' onClick={() => history.push('/')}>Play Again</Button>
		</>
	)
}
