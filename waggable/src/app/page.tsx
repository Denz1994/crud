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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);

  const updateQuestion = () => {
    setCurrentQuestionIndex((prev: number) => {
      return prev + 1;
    });
    setCurrentQuestion(questions[currentQuestionIndex]);
  };

  const updateQuestionDisplay = () => {
    const hasReachedFinalQuestion = currentQuestionIndex >= questions.length;
    setShowScore(currentQuestionIndex >= questions.length);
    setShowErrorPrompt(0 <= currentQuestionIndex && currentQuestionIndex >= questions.length);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    updateQuestion();
    updateQuestionDisplay();
  };

  const onResetHandler = (event) => {
    event.preventDefault();
    setCurrentQuestion(initialQuestion);
    setCurrentQuestionIndex(1);
    setShowScore(false);
    setShowErrorPrompt(false);
  };

  let questionHeader = !showErrorPrompt ? <h4>Question {currentQuestionIndex}</h4> : <h4>No Question Found</h4>;

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
                <input type="radio" name="answer" value={choice} />
                <label htmlFor="answer">{choice}</label>
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
        {questionHeader}
      </section>
      {!showScore ? questionForm : restartButton}
    </>
  );
}
