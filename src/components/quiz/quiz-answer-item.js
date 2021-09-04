import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import htmr from 'htmr'

export function QuizAnswerItem({
  answer,
  correctAnswer,
  updateScore,
  enableNextBtn,
  disable,
  disableAllAnswer,
  showTheCorrectAnswer,
  setShowTheCorrectAnswer,
}) {
  const [buttonColor, setButtonColor] = useState('gray');

  function selectAnswer() {
    if (answer === correctAnswer) {
      setButtonColor('green');
      updateScore();
    } else {
      setButtonColor('red');
    }

    enableNextBtn();
    disableAllAnswer();
    setShowTheCorrectAnswer();
  }

  return (
    <Button
      disabled={disable}
      data-testid="quiz-answer"
      aria-label={answer}
      onClick={selectAnswer}
      colorScheme={
        answer === correctAnswer && showTheCorrectAnswer ? 'green' : buttonColor
      }
      display='inline-block'
      whiteSpace='normal'
    >
      {htmr(answer)}
    </Button>
  );
}
