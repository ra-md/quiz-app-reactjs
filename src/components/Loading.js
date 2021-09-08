import React from 'react'
import {Spinner, Center} from '@chakra-ui/react'

export function Loading() {
	return (
		<Center aria-label="loading" h='100vh'>
			<Spinner size='xl'/>
		</Center>
	)
}
