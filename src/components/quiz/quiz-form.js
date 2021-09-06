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

const categories = [
	{
		name: 'Any Category',
		value: 'any'
	},
	{
		name: 'General Knowledge',
		value: '9'
	},
	{
		name: 'Entertainment: Books',
		value: '10'
	},
	{
		name: 'Entertainment: Film',
		value: '11'
	},
	{
		name: 'Entertainment: Music',
		value: '12'
	},
	{
		name: 'Entertainment: Musicals & Theatres',
		value: '13'
	},
	{
		name: 'Entertainment: Television',
		value: '14'
	},
	{
		name: 'Entertainment: Video Games',
		value: '15'
	},
	{
		name: 'Entertainment: Board Games',
		value: '16'
	},
	{
		name: 'Entertainment: Japanese Anime & Manga',
		value: '31'
	},
	{
		name: 'Entertainment: Cartoon & Animations',
		value: '32'
	},
	{
		name: 'Entertainment: Comics',
		value: '29'
	},
	{
		name: 'Science & Nature',
		value: '17'
	},
	{
		name: 'Science: Computers',
		value: '18'
	},
	{
		name: 'Science: Mathematics',
		value: '19'
	},
	{
		name: 'Science: Gadgets',
		value: '30'
	},
	{
		name: 'Mythology',
		value: '20'
	},
	{
		name: 'Sports',
		value: '21'
	},
	{
		name: 'Geography',
		value: '22'
	},
	{
		name: 'History',
		value: '23'
	},
	{
		name: 'Politics',
		value: '24'
	},
	{
		name: 'Art',
		value: '25'
	},
	{
		name: 'Celebrities',
		value: '26'
	},
	{
		name: 'Animals',
		value: '27'
	},
	{
		name: 'Vehicles',
		value: '28'
	},
]

const difficulties = [
	{
		name: 'Any Difficulty',
		value: 'any'
	},
	{
		name: 'Easy',
		value: 'easy'
	},
	{
		name: 'Medium',
		value: 'medium'
	},
	{
		name: 'Hard',
		value: 'hard'
	},
]

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
