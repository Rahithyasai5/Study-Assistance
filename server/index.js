import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();
console.log("Groq key loaded:", !!process.env.GROQ_API_KEY);
const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/generate", async (req, res) => {
  try {
    const { topic, count, difficulty, mode } = req.body;

    let systemPrompt = "";
    let userPrompt = "";

    if (mode === "Flashcards") {
      systemPrompt = `
Return ONLY valid JSON.

Generate exactly ${count} flashcards.

Difficulty: ${difficulty}

Format:

[
  {
    "question":"...",
    "answer":"..."
  }
]

Do not include markdown.
Do not include explanations.
`;

      userPrompt = `Generate ${count} ${difficulty} flashcards about "${topic}".`;
    } else {
      systemPrompt = `
Return ONLY valid JSON.

Generate exactly ${count} multiple-choice quiz questions.

Difficulty: ${difficulty}

Each question must have exactly 4 options.

Format:

[
  {
    "question":"...",
    "options":[
      "...",
      "...",
      "...",
      "..."
    ],
    "correctAnswer":"..."
  }
]

Do not include markdown.
Do not include explanations.
`;

      userPrompt = `Generate ${count} ${difficulty} quiz questions about "${topic}".`;
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.3,
    });

    res.json({
      text: completion.choices[0].message.content,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});