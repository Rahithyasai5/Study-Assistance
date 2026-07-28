import { createContext, useState, useEffect } from "react";

export const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  // Flashcards
  const [flashcards, setFlashcards] = useState([]);

  // Quiz
  const [quiz, setQuiz] = useState([]);

  // Score
  const [score, setScore] = useState(0);

  // Wrong Questions
  const [wrongQuestions, setWrongQuestions] = useState([]);

  // Dashboard Data
  const [flashcardCount, setFlashcardCount] = useState(
    Number(localStorage.getItem("flashcardCount")) || 0
  );

  const [quizCount, setQuizCount] = useState(
    Number(localStorage.getItem("quizCount")) || 0
  );

  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem("bestScore")) || 0
  );

  const [lastStudy, setLastStudy] = useState(
    localStorage.getItem("lastStudy") || "Never"
  );

  // Save Dashboard Data
  useEffect(() => {
    localStorage.setItem("flashcardCount", flashcardCount);
  }, [flashcardCount]);

  useEffect(() => {
    localStorage.setItem("quizCount", quizCount);
  }, [quizCount]);

  useEffect(() => {
    localStorage.setItem("bestScore", bestScore);
  }, [bestScore]);

  useEffect(() => {
    localStorage.setItem("lastStudy", lastStudy);
  }, [lastStudy]);

  return (
    <StudyContext.Provider
      value={{
        flashcards,
        setFlashcards,

        quiz,
        setQuiz,

        score,
        setScore,

        wrongQuestions,
        setWrongQuestions,

        flashcardCount,
        setFlashcardCount,

        quizCount,
        setQuizCount,

        bestScore,
        setBestScore,

        lastStudy,
        setLastStudy,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};