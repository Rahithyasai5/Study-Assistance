# 📚  Study Assistant

## Overview

AI Study Assistant is a web application that helps students study more effectively using Artificial Intelligence. Users can enter a study topic or paste their notes, and the application generates either flashcards or multiple-choice quizzes using the Groq Large Language Model (LLM).
The application is built using React for the frontend, Node.js and Express for the backend, and the Groq API for AI-generated content.

---

# Project Workflow

The following explains exactly how the project was built and how it works.

---

## Step 1: Create the React Frontend

The project was initialized using Vite with React.

```bash
npm create vite@latest
```

Install dependencies

```bash
npm install
```

Installed libraries

```bash
npm install react-router-dom axios
```

The frontend contains:

- Home Page
- Flashcards Page
- Quiz Page
- Result Page
- Navbar
- Context API

---

## Step 2: Create the Backend

Inside the project, a separate Express server was created.

```bash
mkdir server
cd server
npm init -y
```

Installed packages

```bash
npm install express cors dotenv groq-sdk
```

Backend responsibilities:

- Receive user input
- Call the Groq API
- Return structured JSON
- Handle API errors

---

## Step 3: Configure the Groq API

A `.env` file was created inside the server folder.

```env
GROQ_API_KEY=YOUR_API_KEY
```

The API key is loaded using dotenv.

```javascript
import dotenv from "dotenv";

dotenv.config();
```

---

## Step 4: User Enters Study Content

The Home Page allows users to

- Enter any topic
- Paste notes
- Select number of questions
- Select difficulty
- Choose Flashcards or Quiz mode

Example:

```
Machine Learning
```

or

```
Paste lecture notes here...
```

---

## Step 5: Send Request to Backend

When the Generate button is clicked,

React sends a POST request.

Example

```javascript
const response = await API.post("/generate", {
    topic,
    count,
    difficulty,
    mode
});
```

The backend receives

```json
{
  "topic":"Machine Learning",
  "count":10,
  "difficulty":"Beginner",
  "mode":"Flashcards"
}
```

---

## Step 6: Prompt Engineering

The backend creates a prompt depending on the selected mode.

For Flashcards

```
Generate exactly 10 flashcards.

Return JSON only.

[
{
"question":"",
"answer":""
}
]
```

For Quiz

```
Generate exactly 10 quiz questions.

Return JSON only.

Each question must have

Question

4 Options

Correct Answer
```

Prompt engineering ensures that the AI always returns structured data.

---

## Step 7: AI Generates Content

The backend calls the Groq API.

```javascript
const completion =
await groq.chat.completions.create({...});
```

The LLM generates JSON.

Example Flashcard

```json
[
 {
   "question":"What is AI?",
   "answer":"Artificial Intelligence"
 }
]
```

Example Quiz

```json
[
 {
   "question":"Which algorithm is supervised?",
   "options":[
      "...",
      "...",
      "...",
      "..."
   ],
   "correctAnswer":"Decision Tree"
 }
]
```

---

## Step 8: Parse JSON

The frontend receives

```javascript
response.data.text
```

The JSON is parsed.

```javascript
const data = JSON.parse(text);
```

If parsing fails,

the application displays an error instead of crashing.

---

## Step 9: Store Data

Generated content is stored using React Context API.

Flashcards

```javascript
setFlashcards(data);
```

Quiz

```javascript
setQuiz(data);
```

This makes the data available across different pages.

---

## Step 10: Display Flashcards

Users can

- Flip cards
- Move to next card
- Move to previous card

A progress bar tracks progress.

---

## Step 11: Display Quiz

Users answer multiple-choice questions.

Each answer is checked against

```javascript
correctAnswer
```

The score is calculated automatically.

---

## Step 12: Show Result

After completing the quiz,

the Result Page displays

- Correct Answers
- Wrong Answers
- Percentage
- Performance Message
- Emoji
- Retry Wrong Answers
- Back Home

---

## Step 13: Dashboard

The Home Page dashboard displays

- Total Flashcards Generated
- Total Quizzes Taken
- Best Score
- Last Study Date

Values are stored using Local Storage.

Example

```javascript
localStorage.setItem("bestScore", bestScore);
```

---

## Step 14: Dark Mode

Users can switch between

- Light Mode
- Dark Mode

Theme changes are applied using CSS.

---

## Step 15: Responsive Design

Media Queries ensure the application works on

- Desktop
- Tablet
- Mobile

---

# Error Handling

The application handles several failure scenarios.

### Empty Input

User must enter a topic before generating content.

### Invalid JSON

If AI returns malformed JSON,

```javascript
try{
JSON.parse(text)
}
catch{
alert("AI returned invalid JSON");
}
```

---

### API Failure

```javascript
catch(error){
alert("Failed to generate study content");
}
```

---

### Loading State

While waiting for AI

```
Generating...
```

is displayed.

---

### Empty Flashcards

```
No Flashcards Found
```

---

### Empty Quiz

```
No Quiz Available
```

---

# Technologies Used

## Frontend

- React
- React Router
- Context API
- CSS

## Backend

- Node.js
- Express.js

## AI

- Groq API
- Llama 3.3 70B Versatile

---

# Folder Structure

```
study-assistance

├── public
├── src
│   ├── components
│   ├── context
│   ├── pages
│   ├── services
│   ├── App.jsx
│   └── main.jsx
│
├── server
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── package.json
└── README.md
```

---

# How to Run

Install frontend

```bash
npm install
```

Install backend

```bash
cd server
npm install
```

Run backend

```bash
npm start
```

Run frontend

```bash
npm run dev
```

---

# AI Usage

This project uses the **Groq API** with the **Llama 3.3 70B Versatile** model.

The backend uses prompt engineering to instruct the model to return valid JSON, which is then parsed into flashcards or quizzes for the frontend.

---

# Known Limitations

- AI responses depend on the input topic.
- Occasionally, the model may return invalid JSON.
- Dashboard statistics are stored locally.
- Internet connection is required.

---



# References

The following resources were used during development:

- React Documentation – https://react.dev/
- React Router Documentation – https://reactrouter.com/
- Express.js Documentation – https://expressjs.com/
- Node.js Documentation – https://nodejs.org/
- Groq API Documentation – https://console.groq.com/docs
- MDN Web Docs – https://developer.mozilla.org/
- ChatGPT (OpenAI) – Used for debugging, React guidance, UI improvements, CSS styling suggestions, README preparation, and implementation assistance.

---

# Author

**Rahithya Sai**

B.Tech – Computer Science and Engineering

GitHub:
https://github.com/Rahithyasai5
