import React from 'react'
import {
  Box,
  Text,
  VStack,
  Grid,
} from '@chakra-ui/react'

export function Result() {
	return (
		<Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <Text>
            Result
          </Text>
        </VStack>
      </Grid>
    </Box>
	)
}
