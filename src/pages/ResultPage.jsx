import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { StudyContext } from "../context/StudyContext";
import "./ResultPage.css";

function ResultPage() {

  const {
    score,
    quiz,
    wrongQuestions,
    setQuiz,
    bestScore,
    setBestScore,
  } = useContext(StudyContext);

  const navigate = useNavigate();

  if (!quiz || quiz.length === 0) {
    navigate("/");
    return null;
  }

  const percentage = Math.round((score / quiz.length) * 100);
  if (percentage > bestScore) {
  setBestScore(percentage);
}

  let message = "";
  let emoji = "";

  if (percentage === 100) {
    emoji = "🏆";
    message = "Perfect Score!";
  } else if (percentage >= 80) {
    emoji = "🎉";
    message = "Excellent Work!";
  } else if (percentage >= 60) {
    emoji = "👍";
    message = "Good Job!";
  } else {
    emoji = "📚";
    message = "Keep Practicing!";
  }

  const handleRetest = () => {
    setQuiz(wrongQuestions);
    navigate("/quiz");
  };

  return (
    <>
      <Navbar />

      <div className="result-page">

        <div className="result-card">

          <h1>
            {emoji} Quiz Completed!
          </h1>

          <p className="message">
            {message}
          </p>

          <div className="score-circle">
            <span>{percentage}%</span>
          </div>

          <div className="stats">

            <div className="stat-box">
              <h2>{score}</h2>
              <p>✅ Correct</p>
            </div>

            <div className="stat-box">
              <h2>{quiz.length - score}</h2>
              <p>❌ Incorrect</p>
            </div>

            <div className="stat-box">
              <h2>{quiz.length}</h2>
              <p>📚 Total</p>
            </div>

          </div>

          {wrongQuestions.length > 0 && (
            <button
              className="retest-btn"
              onClick={handleRetest}
            >
              🔄 Retest Wrong Answers
            </button>
          )}

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

export default ResultPage;