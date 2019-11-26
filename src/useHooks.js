import { useState, useEffect, useRef } from "react";

const useHooks = (gameEndText = "TIMES UP!", gameSeconds = 60) => {
  //   const gameEndText = "TIMES UP!";
  //   const gameSeconds = 5;

  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(gameSeconds);
  const [countingDown, setCountingDown] = useState(false);

  const inputRef = useRef(null);

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

  const checkGameEnd = () => {
    if (timeRemaining === gameEndText) {
      reset();
    }
    startCountDown(countingDown);
  };

  const reset = () => {
    setText("");
    setWordCount(0);
    setTimeRemaining(gameSeconds);
  };

  const startCountDown = status => {
    setCountingDown(!status);
    // document.getElementById("textarea").focus();
    inputRef.current.focus();
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

  return {
    text,
    handleChange,
    inputRef,
    timeRemaining,
    checkGameEnd,
    countingDown,
    reset,
    wordCount
  };
};

export default useHooks;
