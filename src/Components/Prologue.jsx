import React, { useState } from "react";

export const Prologue = ({ onSetting }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="container p-4" style={{ marginBlock: "100px" }}>
      <div className="jumbotron text-center">
        <h1 className="display-4">
          Explore your interests with personalized quizzes!
        </h1>
        <p className="lead mt-3 fs-4">
          Select from a diverse range of topics, from movies to mathematics,
          music to mythology, and everything in between. Whether you're a
          history buff or a science whiz, our quiz generator has something for
          everyone. Challenge yourself, learn something new, and have a blast
          along the way.
        </p>
        <hr className="my-4" />
        <p>Start your quiz journey now and let the fun begin!</p>
        {clicked ? null : (
          <button
            className="btn btn-primary ms-auto"
            onClick={() => {
              onSetting(true), setClicked(true);
            }}
          >
            Start Quizzing
          </button>
        )}
      </div>
    </div>
  );
};
