import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Text,
  Flex,
  Button,
  Progress,
} from '@chakra-ui/react';
import shuffle from 'lodash/shuffle';
import htmr from 'htmr'
import { motion, AnimatePresence } from "framer-motion"
import { getQuiz } from '../../lib/api';
import { Loading } from '../Loading';
import { QuizAnswerList } from './quiz-answer-list';
import { QuizAnswerItem } from './quiz-answer-item';

const MotionFlex = motion(Flex)

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
      <Flex flexDirection="column" justify="space-between" minH="100vh">
        <Flex px={{base: 4, md: 12}} justify="space-between" w="100%" mt={4}>
          <Text fontSize={{ base: 'sm', md: 'xl' }} fontWeight="semibold">
            {data[currentQuiz].category}
          </Text>
          <Text fontSize={{ base: 'sm', md: 'xl' }} fontWeight="semibold">
            Difficulty: {data[currentQuiz].difficulty}
          </Text>
        </Flex>
        <Flex overflow='hidden' position='relative' flexGrow={1} alignItems='center'>
          <AnimatePresence>
            <MotionFlex
              p={{base: 4, md: 24}}
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              position='absolute'
              w='100%'
              key={currentQuiz}
              initial={{ x: '100vw' }}
              animate={{ x: '0vw' }}
              exit={{ x: '-100vw' }}
              transition={{x: { type: 'spring', stiffness: 300, damping: 30 }}}
            >
              <Text
                align="center"
                fontSize={{ base: 'xl', md: '3xl' }}
                fontWeight="semibold"
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
              <Flex pt={8} alignItems='center' justify="space-between" w="100%">
                <Text ml={4}>{currentQuiz+1} of {data.length} questions</Text>
                {currentQuiz < data.length - 1 ? (
                  <Button
                    disabled={disableNextBtn}
                    colorScheme="blue"
                    borderRadius='full'
                    onClick={nextBtn}
                    minH={12}
                    minW={36}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    disabled={disableNextBtn}
                    borderRadius='full'
                    colorScheme="blue"
                    minH={12}
                    minW={36}
                    onClick={() => history.replace('/quiz/result', { score })}
                  >
                    Result
                  </Button>
                )}
              </Flex>
            </MotionFlex>
          </AnimatePresence>
        </Flex>
        <Progress
          size="sm"
          colorScheme="blue"
          value={((currentQuiz + 1) * 100) / data.length}
        />
      </Flex>
    )
  );
}
