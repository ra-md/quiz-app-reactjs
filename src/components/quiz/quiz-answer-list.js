import React from 'react';
import { Grid } from '@chakra-ui/react';

export function QuizAnswerList({ children }) {
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={4}
      w="100%"
    >
      {children}
    </Grid>
  );
}
