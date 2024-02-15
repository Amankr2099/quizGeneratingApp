import React, { useContext } from "react";
import { QuizContext } from "./allContext";

export const Result = () => {
  const { quizState } = useContext(QuizContext);

  const history = quizState.attemptHistory;
  const timeLeft = quizState.timeLeft;

  return (
    <>
      <div className="container border border-success rounded p-2 mt-5">
        <div className="card bg-success text-white">
          <div className="card-body text-center">
            <h5 className="card-title">Quiz Result</h5>
            <p className="card-text">Attempts: {history.length} </p>
            <p className="card-text">Points: {quizState.points}</p>
            <p className="card-text">Time: {" "}
          {`${Math.floor(timeLeft / 60)}:${
            timeLeft % 60 < 10 ? "0" + (timeLeft % 60) : timeLeft % 60
          }`}{" "}
          minutes</p>
          </div>
        </div>
        <h4 className="text-center mt-5">Attempt History</h4>
        {history.map((attempt, id) => {
          // console.log(attempt);
          return (
            <div key={id} className="mt-1 rounded p-3 bg-secondary text-white">
              <h5>{attempt.question}</h5>
              <p>Your answer: {attempt.userAnswer}</p>
              <p>Correct answer: {attempt.correctAnswer}</p>
            </div>
          );
        })}

        <div className="text-center mt-3 p-3">
        <button
          className="btn btn-danger ms-auto"
          onClick={()=>window.location.reload(false)}
        >
          Quiz Again
        </button>
        </div>
        
        
      </div>
    </>
  );
};
