import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { generateStudyContent } from "../services/api";
import { StudyContext } from "../context/StudyContext";
import Navbar from "../components/Navbar";
import "./HomePage.css";

function HomePage() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState("Beginner");
  const [mode, setMode] = useState("Flashcards");
  const [loading, setLoading] = useState(false);

  const {
    setFlashcards,
    setQuiz,
    flashcardCount,
    setFlashcardCount,
    quizCount,
    setQuizCount,
    bestScore,
    lastStudy,
    setLastStudy,
  } = useContext(StudyContext);

  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic or paste notes.");
      return;
    }

    try {
      setLoading(true);

      const response = await generateStudyContent({
        topic,
        count,
        difficulty,
        mode,
      });

      let text = response.text;
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();

      const data = JSON.parse(text);

      if (mode === "Flashcards") {
        setFlashcards(data);
        setFlashcardCount(flashcardCount + data.length);
      } else {
        setQuiz(data);
        setQuizCount(quizCount + 1);
      }

      setLastStudy(new Date().toLocaleDateString());

      navigate(mode === "Flashcards" ? "/flashcards" : "/quiz");
    } catch (err) {
      console.error(err);
      alert("Failed to generate study content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <h1>📚 AI Study Assistant</h1>

        <h2>
          Learn <span>Smarter</span>,
          <br />
          Not Harder.
        </h2>
      </section>

      {/* Dashboard */}
      <section className="dashboard">

        <div className="dash-card">
          <div className="dash-icon">📚</div>
          <h3>{flashcardCount}</h3>
          <p>Flashcards Generated</p>
        </div>

        <div className="dash-card">
          <div className="dash-icon">📝</div>
          <h3>{quizCount}</h3>
          <p>Quizzes Taken</p>
        </div>

        <div className="dash-card">
          <div className="dash-icon">🏆</div>
          <h3>{bestScore}%</h3>
          <p>Best Score</p>
        </div>

        <div className="dash-card">
          <div className="dash-icon">📅</div>
          <h3>{lastStudy}</h3>
          <p>Last Study</p>
        </div>

      </section>

      {/* Form Card */}
      <div className="form-card">

        <h3>📝 Your Notes or Topic</h3>

        <textarea
          placeholder="Paste your notes here or enter any topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
                <div className="controls">

          {/* Number of Questions */}
          <div className="control">
            <h4>🔢 Number of Questions</h4>

            <input
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </div>

          {/* Difficulty */}
          <div className="control">
            <h4>🎯 Difficulty</h4>

            <div className="button-group">
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <button
                  key={level}
                  type="button"
                  className={difficulty === level ? "active" : ""}
                  onClick={() => setDifficulty(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Study Mode */}
          <div className="control">
            <h4>📖 Study Mode</h4>

            <div className="button-group">

              <button
                type="button"
                className={mode === "Flashcards" ? "active" : ""}
                onClick={() => setMode("Flashcards")}
              >
                📚 Flashcards
              </button>

              <button
                type="button"
                className={mode === "Quiz" ? "active" : ""}
                onClick={() => setMode("Quiz")}
              >
                📝 Quiz
              </button>

            </div>
          </div>

        </div>

        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading
            ? "⏳ Generating..."
            : `🚀 Generate ${mode}`}
        </button>

      </div>

    </div>
  );
}

export default HomePage;