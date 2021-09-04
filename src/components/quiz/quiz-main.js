import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  VStack,
  Button,
  Progress,
} from '@chakra-ui/react';
import shuffle from 'lodash/shuffle';
import htmr from 'htmr'
import { getQuiz } from '../../lib/api';
import { Loading } from '../Loading';
import { QuizAnswerList } from './quiz-answer-list';
import { QuizAnswerItem } from './quiz-answer-item';

export default function QuizMain() {
  const location = useLocation();
  const history = useHistory();
  const [score, setScore] = useState(0);
  const [disableNextBtn, setDisableNextBtn] = useState(true);
  const [disableAllAnswer, setDisableAllAnswer] = useState(false);
  const [showTheCorrectAnswer, setShowTheCorrectAnswer] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);

  const { isError, error, isLoading, data, isSuccess } = useQuery(
    ['quiz', location.state],
    () => getQuiz(location.state),
    {
      staleTime: Infinity,
      enable: Boolean(location.state),
      cacheTime: 0
    }
  );

  useEffect(() => {
    if (isSuccess && data != null) {
      setAnswers(
        shuffle([
          data[currentQuiz].correct_answer,
          ...data[currentQuiz].incorrect_answers,
        ])
      );
    }
  }, [data, currentQuiz, isSuccess]);

  useEffect(() => {
    function beforeUnload(event) {
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', beforeUnload)

    return () => window.removeEventListener('beforeunload', beforeUnload)
  })

  function nextBtn() {
    setCurrentQuiz(currentQuiz + 1);
    setDisableAllAnswer(false);
    setDisableNextBtn(true);
    setShowTheCorrectAnswer(false);
  }

  function updateScore() {
    setScore(score + 100 / data.length);
  }

  if (location.state == null) {
    history.replace('/');
  }

  if (data != null && data.length === 0) {
    history.replace('/');
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    // card
    return <p role="alert">{error.message}</p>;
  }

  return (
    data != null && (
      <Flex flexDirection="column" justify="space-between" h="100vh">
        <Container maxW="container.xl">
          <Flex justify="space-between" w="100%" mt={8}>
            <Text fontSize={{ base: 'sm', md: '2xl' }} fontWeight="bold">
              {data[currentQuiz].category}
            </Text>
            <Text fontSize={{ base: 'sm', md: '2xl' }} fontWeight="bold">
              Difficulty: {data[currentQuiz].difficulty}
            </Text>
          </Flex>
        </Container>
        <Container maxW="container.lg">
          <VStack>
            <Text
              align="center"
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="bold"
              wordBreak="break-word"
              mb={8}
            >
              {htmr(data[currentQuiz].question)}
            </Text>
            <QuizAnswerList>
              {answers.map(answer => (
                <QuizAnswerItem
                  key={answer}
                  disable={disableAllAnswer}
                  answer={answer}
                  correctAnswer={data[currentQuiz].correct_answer}
                  updateScore={updateScore}
                  showTheCorrectAnswer={showTheCorrectAnswer}
                  setShowTheCorrectAnswer={() => setShowTheCorrectAnswer(true)}
                  enableNextBtn={() => setDisableNextBtn(false)}
                  disableAllAnswer={() => setDisableAllAnswer(true)}
                />
              ))}
            </QuizAnswerList>
            <Flex pt={8} justify="flex-end" w="100%">
              {currentQuiz < data.length - 1 ? (
                <Button
                  disabled={disableNextBtn}
                  colorScheme="blue"
                  onClick={nextBtn}
                >
                  Next
                </Button>
              ) : (
                <Button
                  disabled={disableNextBtn}
                  onClick={() => history.replace('/quiz/result', { score })}
                >
                  Result
                </Button>
              )}
            </Flex>
          </VStack>
        </Container>
        <Progress
          size="sm"
          colorScheme="blue"
          value={((currentQuiz + 1) * 100) / data.length}
        />
      </Flex>
    )
  );
}
