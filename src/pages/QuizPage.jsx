import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { StudyContext } from "../context/StudyContext";
import "./QuizPage.css";

function QuizPage() {

  const { quiz, setScore, setWrongQuestions } = useContext(StudyContext);

  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!quiz || quiz.length === 0) {
    return (
      <>
        <Navbar />

        <div className="quiz-page">

          <div className="quiz-container">

            <h2>No Quiz Found</h2>

            <button
              className="submit-btn"
              onClick={() => navigate("/")}
            >
              🏠 Back Home
            </button>

          </div>

        </div>
      </>
    );
  }

  const question = quiz[current];

  const handleOption = (option) => {
    setAnswers({
      ...answers,
      [current]: option,
    });
  };

  const submitQuiz = () => {

    let marks = 0;
    let wrong = [];

    quiz.forEach((q, index) => {

      if (answers[index] === q.correctAnswer) {
        marks++;
      } else {
        wrong.push(q);
      }

    });

    setScore(marks);
    setWrongQuestions(wrong);

    navigate("/result");
  };

  const progress = ((current + 1) / quiz.length) * 100;

  return (
    <>
      <Navbar />

      <div className="quiz-page">

        <div className="quiz-container">

          <h1 className="quiz-title">
            🌿 AI Quiz
          </h1>

          <p className="quiz-subtitle">
            Question {current + 1} of {quiz.length}
          </p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="quiz-card">

            <h2>{question.question}</h2>

            {question.options.map((option, index) => (

              <div
                key={index}
                className={`option ${
                  answers[current] === option ? "selected" : ""
                }`}
                onClick={() => handleOption(option)}
              >
                {option}
              </div>

            ))}

          </div>

          <div className="quiz-buttons">

            <button
              disabled={current === 0}
              onClick={() => setCurrent(current - 1)}
            >
              ⬅ Previous
            </button>

            {current === quiz.length - 1 ? (

              <button
                className="submit-btn"
                onClick={submitQuiz}
              >
                ✅ Submit Quiz
              </button>

            ) : (

              <button
                onClick={() => setCurrent(current + 1)}
              >
                Next ➡
              </button>

            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default QuizPage;