import React from 'react'

export const Header = ()=> {
  return (
    <div
        className="bg-image"
        style={{"backgroundImage":"url('https://cdn.pixabay.com/photo/2022/03/15/08/23/school-supplies-7069762_640.jpg')","height":"300px"}}
      >
        <div
          className="mask"
          style={{"backgroundColor":"rgba(60, 60, 60, 0.237)","height":"300px"}}
        >
          <button
            className="navbar-toggler dropdown m-4 position-absolute top-0 start-0 fs-2"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon">
              <i className="fa-solid fa-bars text-white"></i>
            </span>
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">Home</a>
            <a className="dropdown-item" href="#">About</a>
            <a className="dropdown-item" href="#">Services</a>
            <a className="dropdown-item" href="#">Contact</a>
          </div>

          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white text-center">
              <h1 className="mb-3">Custom Quizzer</h1>
              <h4 className="mb-3">Personal Quiz Taker</h4>
            </div>
            <div></div>
          </div>
        </div>
      </div>
  )
}
