import React, {useRef} from 'react'
import {useHistory} from 'react-router-dom'
import {
	FormControl,
	FormLabel,
	Select,
	Button,
	NumberInput,
	NumberInputField,
	VStack,
	Box
} from '@chakra-ui/react'
import { categories } from '../../lib/categories'
import { difficulties } from '../../lib/difficulties'

export default function QuizForm() {
	const history = useHistory()

	const categoryRef = useRef(null)
	const difficultyRef = useRef(null)
	const amountRef = useRef(null)

	function handleSubmit() {
		history.push('/quiz', {
			category: categoryRef.current.value,
			difficulty: difficultyRef.current.value,
			amount: amountRef.current.value
		})
	}

	return (
		<FormControl>
			<VStack
				spacing={4}
			  align="stretch"
			>
				<Box>
					<FormLabel htmlFor='category'>Category</FormLabel>
					<Select id='category' ref={categoryRef} variant='outline' borderRadius="full">
						{
							categories.map(category => {
								return <option value={category.value} key={category.value}>{category.name}</option>
							})
						}
					</Select>
				</Box>
				<Box>	
					<FormLabel htmlFor='difficulty'>Difficulty</FormLabel>
					<Select id='difficulty' ref={difficultyRef} variant='outline' borderRadius="full">
						{
							difficulties.map(difficulty => {
								return <option value={difficulty.value} key={difficulty.value}>{difficulty.name}</option>
							})
						}
					</Select>
				</Box>
				<Box>
					<FormLabel htmlFor='amount'>Number of questions</FormLabel>
				  <NumberInput variant='outline' defaultValue={5} max={10} min={1} id='amount'>
				    <NumberInputField ref={amountRef} borderRadius="full"/>
				  </NumberInput>
				</Box>
				<Button
	        colorScheme='blue'
	        type="submit"
	        onClick={handleSubmit}
	        borderRadius="full"
	        aria-label='start quiz'
	      >
	        Start
	      </Button>
			</VStack>
		</FormControl>
	)
}
