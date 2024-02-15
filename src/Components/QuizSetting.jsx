import React, { useContext, useState } from "react";
import { QuizContext } from "./allContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Buffering } from "./Buffering";
import { ShowError } from "./ShowError";

export const QuizSetting = ({ removeSetting, showProblem }) => {
  const { quizState, setQuizState } = useContext(QuizContext);

  const problems = quizState.quizProblems;
  const [buffering, setBuffering] = useState(false);
  const [isError, setIsError] = useState(false);

  const [time, setTime] = useState("5"); // Default time is 5 minutes
  const [questionsNumber, setQuestionsNumber] = useState("5"); // Default number of questions is 5
  const [quizTopic, setQuizTopic] = useState("");

  //fetch questions from model api

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const getQuestion = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `If the word ${quizTopic} is a general offensive or meaningless word then response as "Invalid topic".
    Otherwise generate an array of ${questionsNumber} JSON objects representing general quiz questions, where each question is related to ${quizTopic}. Each JSON object should contain the following fields:

  "question": (Provide a trivia question related to the topic.)
  "options": (Provide an array of four multiple-choice options related to the question.)
  "correctAnswer": (Correct answer to the question from given options.)

  Make sure that JSON.parse can run on the response generated.

  Example : Let's say the topic is history then response should look like
  [
    {
      "question": "Which civilization built the Great Pyramids of Giza?",
      "options": ["Mesopotamians", "Greeks", "Egyptians", "Romans"],
      "correctAnswer": "Egyptians"
    },
    {
      "question": "Who was the first emperor of Rome?",
      "options": ["Julius Caesar", "Augustus", "Nero", "Constantine"],
      "correctAnswer": "Augustus"
    },
    {
      "question": "Which ancient empire was known for its legal code, 'Hammurabi's Code'?",
      "options": ["Assyrians", "Babylonians", "Persians", "Sumerians"],
      "correctAnswer": "Babylonians"
    }
  ]
   
     ,`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      let generatedQuestions;

      try {
        //parse string response into array of json
        generatedQuestions = JSON.parse(text);
      } catch (error) {
        setBuffering(false);
        setIsError(true);
        // console.log(error);
        return 0;
      }

      generatedQuestions.forEach((object) => {
        //push each question object into global array
        problems.push(object);
      });

      setQuizState((prevState) => ({
        ...prevState,
        quizTopic: quizTopic,
        quizProblems: problems,
        numberOfQuestions: questionsNumber,
        quizTime: time,
        timeLeft: time * 60,
      }));

      setBuffering(false);
      showProblem(true);
      removeSetting(false);
    } catch (error) {
      setBuffering(false);
      setIsError(true);
      // console.log(error);
    }
  };

  const handleGenerateQuiz = () => {
    setBuffering(true);
    setIsError(false);
    getQuestion();
  };

  return (
    <>
      <div className="container mt-5 p-5">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h3>Choose your quiz preferences</h3>
          <div className="row">
            <div className="form-group">
              <label htmlFor="time" className="p-2">Select Time:</label>
              <select
                className="form-control"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              >
                <option value="5">5 Minutes</option>
                <option value="10">10 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="20">20 Minutes</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="questions" className="p-2">Number of Questions:</label>
              <select
                className="form-control"
                value={questionsNumber}
                onChange={(e) => {
                  setQuestionsNumber(e.target.value);
                }}
              >
                <option value="5">5 Questions</option>
                <option value="10">10 Questions</option>
                <option value="15">15 Questions</option>
                <option value="20">20 Questions</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quiz-topic" className="p-2">Quiz Topic:</label>
              <input
                type="text"
                className="form-control"
                placeholder="eg. Cosmology"
                id="quiz-topics-list"
                value={quizTopic}
                onChange={(e) => {
                  setQuizTopic(e.target.value);
                }}
              />
              <datalist id="quiz-topics-list">
                {["Cosmology", "Physics", "Biology", "Chemistry"].map(
                  (option, index) => (
                    <option key={index} value={option} />
                  )
                )}
              </datalist>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          className="btn btn-primary mx-auto"
          onClick={handleGenerateQuiz}
        >
          Generate Quiz
        </button>
      </div>

      {buffering && <Buffering />}
      {isError && <ShowError />}
    </>
  );
};
