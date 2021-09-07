import React from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import { Button } from '@chakra-ui/react';
import {Counter} from '../counter'

export default function QuizResult() {
	const location = useLocation()
	const history = useHistory()

	if(location.state == null) {
		history.replace('/')
		return null
	}

	return location.state && (
		<>
			{/*<Text fontSize='3xl' fontWeight='bold' mb={16}>Your score: {location.state.score}</Text>*/}
			<Counter from={0} to={location.state.score}/>
			<Button colorScheme='blue' borderRadius='full' onClick={() => history.push('/')}>Play Again</Button>
		</>
	)
}
