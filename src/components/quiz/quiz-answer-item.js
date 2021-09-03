import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';

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
      // set button color to green
      setButtonColor('green');
      // update score
      updateScore();
    } else {
      // set button color to red
      setButtonColor('red');
    }

    // enable next button
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
    >
      {answer}
    </Button>
  );
}
