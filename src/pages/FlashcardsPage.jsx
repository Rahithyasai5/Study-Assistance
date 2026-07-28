import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudyContext } from "../context/StudyContext";
import Navbar from "../components/Navbar";
import "./FlashcardsPage.css";

function FlashcardsPage() {
  const { flashcards } = useContext(StudyContext);

  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!flashcards || flashcards.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flash-page">
          <div className="flash-container">
            <h2>No Flashcards Found</h2>

            <button
              className="home-btn"
              onClick={() => navigate("/")}
            >
              🏠 Back Home
            </button>
          </div>
        </div>
      </>
    );
  }

  const card = flashcards[current];
  const progress = ((current + 1) / flashcards.length) * 100;

  return (
    <>
      <Navbar />

      <div className="flash-page">
        <div className="flash-container">

          <h1 className="flash-title">📚 Flashcards</h1>

          <p className="flash-subtitle">
            Card {current + 1} of {flashcards.length}
          </p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div
            className={`flash-card ${showAnswer ? "flipped" : ""}`}
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <div className="flash-card-inner">

              <div className="flash-front">
                <h2>❓ Question</h2>

                <p>{card.question}</p>

                <small className="flash-tip">
                  Click to reveal the answer
                </small>
              </div>

              <div className="flash-back">
                <h2>✅ Answer</h2>

                <p>{card.answer}</p>

                <small className="flash-tip">
                  Click to go back
                </small>
              </div>

            </div>
          </div>

          <div className="flash-buttons">

            <button
              disabled={current === 0}
              onClick={() => {
                setCurrent(current - 1);
                setShowAnswer(false);
              }}
            >
              ⬅ Previous
            </button>

            <button
              disabled={current === flashcards.length - 1}
              onClick={() => {
                setCurrent(current + 1);
                setShowAnswer(false);
              }}
            >
              Next ➡
            </button>

          </div>

          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            🏠 Back Home
          </button>

        </div>
      </div>
    </>
  );
}

export default FlashcardsPage;