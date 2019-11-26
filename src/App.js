import React from "react";
import useHooks from "./useHooks";
import "./styles/styles.css";

function App() {
  const {
    text,
    handleChange,
    inputRef,
    timeRemaining,
    checkGameEnd,
    countingDown,
    reset,
    wordCount
  } = useHooks("FINISH!", 5);

  return (
    <div className="App">
      <h1>Typing Game!</h1>
      <textarea
        id="textarea"
        name="textarea"
        value={text}
        onChange={handleChange}
        ref={inputRef}
      />
      <h4>Time Remaining: {timeRemaining}</h4>
      <button onClick={checkGameEnd}>
        {countingDown ? "PAUSE GAME" : "START GAME"}
      </button>
      <br></br>
      <button onClick={reset}>RESET</button>
      <h1>Word Count: {wordCount}</h1>
    </div>
  );
}

export default App;
