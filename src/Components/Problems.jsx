import React, { useState, useEffect, useContext } from "react";
import { QuizContext } from "./allContext";

export const Problems = ({ onQuizSubmit }) => {
  const [isRunning, setIsRunning] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const { quizState, setQuizState } = useContext(QuizContext);

  const problems = quizState.quizProblems;
  const userAttempts = quizState.attemptHistory;
  const [timeLeft, setTimeLeft] = useState(quizState.timeLeft);

  const handleOptionChange = (problemId, option) => {
    // Check problem in userAttempts
    const previousAttempt = userAttempts.findIndex(
      (attempt) =>
        attempt.question === problems[problemId].question
    );

    if (previousAttempt !== -1) {
      // If the combination exists, remove it
      userAttempts.splice(previousAttempt, 1);
    }
    //push with new option
    userAttempts.push({
      question: problems[problemId].question,
      userAnswer: option,
      correctAnswer: problems[problemId].correctAnswer,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsRunning(false);
    setQuizState((prevState) => ({
      ...prevState,
      attemptHistory: userAttempts,
      timeLeft: timeLeft,
    }));

    onQuizSubmit();
    setSubmitted(true);
  };

  useEffect(() => {
    let timerInterval;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const minutes = Math.floor(prevTimeLeft / 60);
          let seconds = prevTimeLeft % 60;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          if (prevTimeLeft === 0) {
            clearInterval(timerInterval);
          }

          return prevTimeLeft - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning]); // Run when isRunning change

  return (
    <>
      <div className="container mt-5">
        <div className="card bg-light p-3">
          <div className="card-body rounded text-center fs-5 ">
            <p className="card-text">Quiz Topic : {quizState.quizTopic} </p>
            <p className="card-text">
              Total Question : {quizState.numberOfQuestions}{" "}
            </p>
            <p className="card-text">
              Duration :{" "}
              {`${Math.floor(timeLeft / 60)}:${
                timeLeft % 60 < 10 ? "0" + (timeLeft % 60) : timeLeft % 60
              }`}{" "}
              minutes
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-5 p-2">
        {problems.map((problem, problemId) => (
          <div key={problemId} className="card mb-3 bg-light">
            <div className="card-body ">
              <h5 className="card-title">Question {problemId + 1}</h5>
              <p className="card-text"> {problem.question}</p>

              <div className="form-group">
                {problem.options.map((option, ObjectId) => (
                  <div key={ObjectId} className="form-check ">
                    <input
                      className="form-check-input "
                      type="radio"
                      name={`problem-${problemId}`} // Ensure unique name attribute
                      id={`option-${ObjectId}`}
                      value={ObjectId}
                      onChange={() => handleOptionChange(problemId, option)}
                    />

                    <label
                      className="form-check-label"
                      htmlFor={`option-${ObjectId}`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-5">
        {submitted ? null : (
          <button className="btn btn-danger ms-auto" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </>
  );
};
