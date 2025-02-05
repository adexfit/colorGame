import React from "react";
import "../components/start.css";

const Start = () => {
  return (
    <div className="card">
      <h1>Color Game</h1>
      <p className="instruct">
        Game Instructions: Earn points by predicting correctly the right colors.
        The game will be over when you select a wrong option.
      </p>
      <button className="submitBtn">Start Game</button>
    </div>
  );
};

export default Start;
