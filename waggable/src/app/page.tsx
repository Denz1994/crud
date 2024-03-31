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

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const onSubmitHandler = (event) => {
    event?.preventDefault();
    setCurrentQuestion((prev) => {
      return prev + 1;
    });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <p>{currentQuestion}</p>
      <button type="submit">Submit</button>
    </form>
  );
}
