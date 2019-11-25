import React, { useState, useEffect } from "react";
import "./styles/styles.css";

function App() {
  const gameEndText = "TIMES UP!";
  const gameSeconds = 5;

  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(gameSeconds);
  const [countingDown, setCountingDown] = useState(false);

  const handleChange = event => {
    const { value } = event.target;
    if (countingDown) {
      setText(value);
    }
    // countingDown ? setText(value) : setText("No cheating :P");
  };

  const countWords = str => {
    setWordCount(str.split(" ").filter(word => word !== "").length);
  };

  const reset = () => {
    setText("");
    setWordCount(0);
    setTimeRemaining(gameSeconds);
  };

  const startCountDown = status => {
    setCountingDown(!status);
    document.getElementById("textarea").focus();
  };

  useEffect(() => {
    if (countingDown === true) {
      const countdownId = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);

      if (timeRemaining === 0) {
        setTimeRemaining(gameEndText);
        countWords(text);
        setCountingDown(false);
      }
      return () => clearTimeout(countdownId);
    }
  }, [timeRemaining, countingDown]);
  // useEffect(() => {
  //   if (countingDown === true) {
  //     const countdownId = setInterval(() => {
  //       if (timeRemaining > 0) {
  //         setTimeRemaining(time => time - 1);
  //       } else if (timeRemaining === gameEndText) {
  //         setTimeRemaining(gameSeconds);
  //         countWords(text);
  //       } else {
  //         clearInterval(countdownId);
  //         setCountingDown(false);
  //         setTimeRemaining(gameEndText);
  //       }
  //     }, 1000);
  //     return () => clearInterval(countdownId);
  //   }
  // });
  // bugs : word count not working, might be resetting somewhere as the game ends
  return (
    <div className="App">
      <h1>Typing Game!</h1>
      <textarea
        id="textarea"
        name="textarea"
        value={text}
        onChange={handleChange}
      />
      <h4>Time Remaining: {timeRemaining}</h4>
      <button
        onClick={() => {
          if (timeRemaining === gameEndText) {
            reset();
          }
          startCountDown(countingDown);
        }}
      >
        {countingDown ? "PAUSE GAME" : "START GAME"}
      </button>
      <br></br>
      <button onClick={reset}>RESET</button>
      <h1>Word Count: {wordCount}</h1>
    </div>
  );
}

export default App;
