"use client";
import { useState } from "react";

interface question {
  prompt: string;
  correctAnswer: string;
  choices: string[];
}

export default function Home() {
  const question1: question = {
    prompt: "What color is the sky?",
    correctAnswer: "blue",
    choices: ["blue", "green", "red", "orange"],
  };

  const question2: question = {
    prompt: "What planet do you live on?",
    correctAnswer: "earth",
    choices: ["saturn", "mecury", "mars", "earth"],
  };

  const question3: question = {
    prompt: "Which one below is an animal?",
    correctAnswer: "monkey",
    choices: ["apple", "car", "monkey", "book"],
  };
  const questions: question[] = [question1, question2, question3];
  const initialQuestion = questions[0];

  const [showScore, setShowScore] = useState<boolean>(false);
  const [showErrorPrompt, setShowErrorPrompt] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<question | null>(initialQuestion);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const incrementQuestion = (increment: number) => {
    const newIndex = currentQuestionIndex + increment;

    // Check for exceeding boundaries
    if (newIndex < 0) {
      // Handle going below the first question (optional)
      console.warn("Reached the first question");
    } else if (newIndex >= questions.length) {
      // Handle going beyond the last question (optional)
      console.warn("Reached the last question");
    } else {
      // Update state within valid range
      setCurrentQuestionIndex(newIndex);
      setCurrentQuestion(questions[newIndex]);
    }
  };

  const updateQuestion = () => {
    incrementQuestion(1);
  };

  const updateQuestionDisplay = () => {
    const hasReachedFinalQuestion = currentQuestionIndex >= questions.length;
    setShowScore(hasReachedFinalQuestion);
    setShowErrorPrompt(0 <= currentQuestionIndex && hasReachedFinalQuestion);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    updateQuestion();
    updateQuestionDisplay();
  };

  const onResetHandler = (event) => {
    event.preventDefault();
    setCurrentQuestion(initialQuestion);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setShowErrorPrompt(false);
  };

  let questionHeader = !showErrorPrompt ? <h4>Question {currentQuestionIndex + 1}</h4> : <h4>No Question Found</h4>;
  const previousButton = (
    <button
      onClick={() => {
        incrementQuestion(-1);
      }}
    >
      &larr;
    </button>
  );
  const nextButton = (
    <button
      onClick={() => {
        incrementQuestion(1);
      }}
    >
      &rarr;
    </button>
  );

  const restartButton = (
    <button type="reset" onClick={onResetHandler}>
      Restart
    </button>
  );
  const questionForm = (
    <section>
      <form onReset={(event) => onResetHandler(event)} onSubmit={(event) => onSubmitHandler(event)}>
        <p>{currentQuestion?.prompt}</p>
        <fieldset>
          {currentQuestion?.choices.map((choice, index) => {
            return (
              <section>
                <input type="radio" name="answer" id={choice} value={choice} />
                <label htmlFor={choice}>{choice}</label>
              </section>
            );
          })}
        </fieldset>
        <button type="submit">Submit</button>
        {restartButton}
      </form>
    </section>
  );

  /**
   * TODO:
   * - Record answers
   * - Implement scoring
   * - Radio buttons should carry selected value to next question
   * - Can't click text to select radio button
   * - Decouple sections into components of their own. Pass props.
   *
   *
   */

  return (
    <>
      <section>
        <h1>Quiz</h1>
        <span>
          {questionHeader}
          {previousButton}
          {nextButton}
        </span>
      </section>
      {!showScore ? questionForm : restartButton}
    </>
  );
}
