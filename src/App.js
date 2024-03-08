import React, { useState, useEffect } from "react";
import { QUESTIONS } from "./questions";
import './App.css'

function App() {
  const [answers, setAnswers] = useState(() => {
    const storedAnswers = localStorage.getItem("answers");
    return storedAnswers
      ? JSON.parse(storedAnswers)
      : new Array(Object.keys(QUESTIONS).length).fill(null);
  });

  const [currentScore, setCurrentScore] = useState(() => {
    const storedScores = localStorage.getItem("currentScore");
    return storedScores ? JSON.parse(storedScores) : [];
  });

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("currentScore", JSON.stringify(currentScore));
  }, [currentScore]);

  const radioBtnHandler = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const scoreCalculator = () => {
    const yesCount = answers.filter((answer) => answer === "Yes").length;
    return (yesCount / Object.keys(QUESTIONS).length) * 100;
  };

  const restartHandler = () => {
    const score = scoreCalculator();
    setCurrentScore([...currentScore, score]);
    setAnswers(new Array(Object.keys(QUESTIONS).length).fill(null));
  };

  const avgScoreHandler = () => {
    if (currentScore.length === 0) return 0;
    const sum = currentScore.reduce((total, score) => total + score, 0);
    const avgScore = sum / currentScore.length
    return avgScore.toFixed(2)
  };

  return (
    <div className="app">
    <h1 className="app__title">Questionnaire</h1>
    {Object.keys(QUESTIONS).map((key, index) => (
      <div className="question" key={key}>
        <p>{QUESTIONS[key]}</p>
        <br />
        <div className="options-container">

        <label>
        <input
          type="radio"
          name={`question-${index}`}
          value="Yes"
          checked={answers[index] === "Yes"}
          onChange={() => radioBtnHandler(index, "Yes")}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name={`question-${index}`}
          value="No"
          checked={answers[index] === "No"}
          onChange={() => radioBtnHandler(index, "No")}
        />
        No
      </label>
      </div>
      </div>
    ))}
    <button className="restart-button" onClick={restartHandler}>Restart</button>
    <p className="score">Score: {scoreCalculator()}</p>
    <p className="score">Average Score: {avgScoreHandler()}</p>
  </div>
  );
}

export default App;
