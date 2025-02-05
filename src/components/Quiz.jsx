import React, { useEffect, useState } from "react";
import "../components/quiz.css";
import { colors } from "../colors";

const Quiz = () => {
  const [streak, setStreak] = useState(0);
  const [question, setQuestion] = useState([]);
  const [shuffQuestion, setShuffQuestion] = useState([]);
  const [ShowAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [scPoint, setScPoint] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState("");

  useEffect(() => {
    generateRandIndex();
  }, [streak]);

  const shuff = (s) => {
    return s
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const generateRandIndex = () => {
    let randomArrIndex = [];
    let randomArrColors = [];
    for (let i = 0; i < 6; i++) {
      //generate random indexes
      let randNum = Math.floor(Math.random() * 1000);
      // prevent duplicates
      if (!randomArrIndex.includes(randNum)) {
        randomArrIndex.push(randNum);
        randomArrColors.push(colors[randNum]);
      } else {
        i--;
      }
    }
    setQuestion(randomArrColors);
    // console.log(randomArrColors);
    setShuffQuestion(shuff(randomArrColors));
  };

  const handleClick = (a) => {
    if (!gameOver) {
      setSelectedAnswer(a);
      // setShowAnswer(true);
      if (a.hex == question[0]?.hex) {
        setGameStatus("Correct");
      } else {
        setGameStatus("Wrong");
        setGameOver(true);
      }
      delay(2000, () => {
        if (a.hex == question[0]?.hex) {
          //increase the score
          setScPoint((pre) => {
            return (pre = pre + 1);
          });
          //load a new question
          setStreak((pre) => {
            return (pre = pre + 1);
          });
          // setGameStatus("Correct");
          // setShowAnswer(false);
        } else {
          // setGameStatus("Wrong");
          // setGameOver(true);
        }
        setGameStatus("");
      });
      // setGameStatus("");
      // setShowAnswer(false);
    }
  };

  const handleNewGame = () => {
    setGameOver(false);
    setShowAnswer(false);
    setScPoint(0);
    setSelectedAnswer(null);
    setStreak((pre) => {
      return (pre = pre + 1);
    });
    setGameStatus("");
  };

  return (
    <div className="quiz_card">
      <h1 data-testid="score">Current Score: {scPoint} point</h1>
      <div className="quest">
        <p data-testid="gameInstructions">
          Guess the colour below by selecting from the options:
        </p>
        <p
          // id="question"
          data-testid="colorBox"
          className="question"
          style={{
            backgroundColor: question[0]?.hex,
          }}
        >
          {""}
        </p>
        <p
          style={
            gameStatus == "Wrong"
              ? {
                  color: "red",
                }
              : {
                  color: "green",
                }
          }
          className={`fade-in-text ${
            gameStatus == "" && !gameOver ? "hide" : "show"
          }`}
          data-testid="gameStatus"
        >
          {gameStatus}
          {gameOver ? "Game Over" : ""}
        </p>
      </div>

      <div className="option_wrapper" data-testid="colorOption">
        {shuffQuestion.map((a) => (
          <div
            className={selectedAnswer === a ? "selected" : "options"}
            style={{ backgroundColor: a.hex }}
            key={a.name}
            onClick={() => handleClick(a)}
          >
            {" "}
          </div>
        ))}
      </div>
      <button className="newgame" onClick={handleNewGame}>
        New Game
      </button>
    </div>
  );
};

export default Quiz;
