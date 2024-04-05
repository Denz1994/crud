"use client";
import { SyntheticEvent, useEffect, useState } from "react";
import { getQuestionsData } from "./data";

interface Question {
  id: number;
  prompt: string;
  correctAnswer: string;
  selectedChoice: null | string;
  choices: string[];
}
interface FetchedQuestionData {
  data: Question[];
}

export default function Home() {
  const [fetchedQuestionData, setFetchedQuestionData] = useState<FetchedQuestionData>({ data: [] });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [showErrorPrompt, setShowErrorPrompt] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const initialQuestion = fetchedQuestionData.data[0];

  useEffect(() => {
    const url = "http://localhost:3000/api/questions";
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setFetchedQuestionData(json);
        setQuestions(json.data);
        setCurrentQuestion(json.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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

  const updateQuestion = (event: SyntheticEvent) => {
    const element = event.target as HTMLFormElement;
    const selectedAnswer = element.answer.value;

    questions[currentQuestionIndex].selectedChoice = selectedAnswer;
    incrementQuestion(1);
  };

  const updateQuestionDisplay = () => {
    const hasReachedFinalQuestion = currentQuestionIndex === questions.length - 1;
    setShowScore(hasReachedFinalQuestion);
    setShowErrorPrompt(0 <= currentQuestionIndex && hasReachedFinalQuestion);
  };

  const updateScore = () => {
    let correctAnswerCounter = 0;
    for (const targetQuestion of questions) {
      if (targetQuestion.correctAnswer === targetQuestion.selectedChoice) {
        correctAnswerCounter += 1;
      }
    }
    setScore(Math.round((correctAnswerCounter / questions.length) * 100));
  };

  const onSubmitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    updateQuestion(event);
    updateQuestionDisplay();
    if (currentQuestionIndex === questions.length - 1) {
      updateScore();
    }
  };

  const onResetHandler = (event: SyntheticEvent) => {
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
      Start Over
    </button>
  );
  console.log("currentQ = ", currentQuestion);

  const questionForm = (
    <section>
      <form onReset={(event) => onResetHandler(event)} onSubmit={(event) => onSubmitHandler(event)}>
        <p>{currentQuestion?.prompt}</p>
        <fieldset>
          {currentQuestion?.choices.map((choice, index) => {
            return (
              <section key={index}>
                <input
                  type="radio"
                  name="answer"
                  id={choice}
                  value={choice}
                  onChange={() =>
                    setQuestions((prevQuestions) => {
                      const updatedQuestions = [...prevQuestions];
                      updatedQuestions[currentQuestionIndex].selectedChoice = choice;
                      return updatedQuestions;
                    })
                  }
                />
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
  const navigationGroup = (
    <>
      {previousButton}
      {nextButton}
    </>
  );

  /**
   * TODO:
   * - Radio buttons shouldn't carry selected value to next question
   * - Decouple sections into components of their own. Pass props.
   */

  return (
    <>
      <section>
        <h1>Quiz</h1>
        <span>
          {questionHeader}
          {!showScore && navigationGroup}
        </span>
      </section>
      {!showScore ? questionForm : restartButton}
      {showScore && <p>Score: {score}%</p>}
    </>
  );
}
