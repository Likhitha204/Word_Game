
import React, { useState, useEffect } from "react";
import "./App.css";

const sampleWords = [
  {
    word: "SCRIPT",
    description: "The Tag used to include javascript code in HTML."
  },
  {
    word: "COLOR",
    description: "CSS property used to change text color of an element."
  },
  {
    word: "STATIC",
    description: "Default value of the position property in CSS."
  },
  {
    word: "STRONG",
    description: "Correct HTML element to define important text."
  },
  {
    word: "ORDEREDLIST",
    description: "How can you make a numbered list?"
  },
  {
    word: "UNORDEREDLIST",
    description: "How can you make a bulleted list?"
  },
  {
    word: "IFRAME",
    description: "Used to display a web page within a web page."
  },
  {
    word: "EVENT",
    description: "Onblur and OnFocus are ____ Attributes."
  }
];

const getRandomWord = () => {
  const randomPlace = Math.floor(Math.random() * sampleWords.length);
  return sampleWords[randomPlace];
};

const WordGame = () => {
  const [wordData, setWordData] = useState(getRandomWord());
  const [msg, setMsg] = useState("");
  const [chosenLetters, setChosenLetters] = useState([]);
  const [hints, setHints] = useState(3);
  const [displayWord, setDisplayWord] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  useEffect(() => {
    if (wrongGuesses >= 3) {
      alert("Game Over! You made too many wrong guesses.");
      restartGameFunction();
    }
  }, [wrongGuesses]);

  const letterSelectFunction = (letter) => {
    if (!chosenLetters.includes(letter)) {
      setChosenLetters([...chosenLetters, letter]);
      if (!wordData.word.includes(letter)) {
        setWrongGuesses(wrongGuesses + 1);
      }
    }
  };

  const hintFunction = () => {
    if (hints > 0) {
      const hiddenLetterIndex = wordData.word
        .split("")
        .findIndex((letter) => !chosenLetters.includes(letter));

      if (hiddenLetterIndex !== -1) {
        setChosenLetters([
          ...chosenLetters,
          wordData.word[hiddenLetterIndex]
        ]);
        setHints(hints - 1);
      }
    }
  };

  const removeCharacterFunction = () => {
    setChosenLetters(chosenLetters.slice(0, -1));
  };

  const displayLettersFunction = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return Array.from(letters).map((letter, index) => (
      <button
        key={index}
        onClick={() => letterSelectFunction(letter)}
        disabled={chosenLetters.includes(letter)}
        className={`letter-button ${
          chosenLetters.includes(letter) ? "selected" : ""
        }`}
      >
        {letter}
      </button>
    ));
  };

  const checkWordGuessedFunction = () => {
    return wordData.word
      .split("")
      .every((letter) => chosenLetters.includes(letter));
  };

  const guessFunction = () => {
    if (checkWordGuessedFunction()) {
      setMsg("Congratulations! You have guessed the word correctly!!");
    } else {
      setMsg("You made a Wrong Guess. Try again!!");
      setDisplayWord(true);
    }
  };

  const restartGameFunction = () => {
    setWordData(getRandomWord());
    setMsg("");
    setChosenLetters([]);
    setHints(3);
    setDisplayWord(false);
    setWrongGuesses(0);
  };

  return (
    <div className="box">
      <div className="container">
        <h1>Mystery Word</h1>
        <div className="word-container">
          {Array.from(wordData.word).map((letter, index) => (
            <div
              key={index}
              className={`letter ${
                chosenLetters.includes(letter) ? "visible" : ""
              }`}
            >
              {chosenLetters.includes(letter) ? letter : ""}
            </div>
          ))}
        </div>
        <p className="word-description">HINT : {wordData.description}</p>
        {msg && (
          <div className="message">
            <p>{msg}</p>
            {displayWord && <p>Correct word was: {wordData.word}</p>}
          </div>
        )}
        <div className="button-section">
          <div className="guess-section">
            <button
              onClick={restartGameFunction}
              className="restart-button"
            >
              NEXT
            </button>
            <button
              onClick={removeCharacterFunction}
              disabled={!chosenLetters.length}
              className="remove-button"
            >
              REMOVE LETTER
            </button>
          </div>
          <div className="letter-selection">
            {displayLettersFunction()}
          </div>
          <div className="hints">
            Hints Remaining: {hints}{" "}
            <button
              onClick={hintFunction}
              disabled={hints === 0}
              className="hint-button"
            >
              Get Hint
            </button>
          </div>
          {!msg && (
            <button
              onClick={guessFunction}
              disabled={!chosenLetters.length}
              className="guess-button"
            >
              GUESS / SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordGame;
