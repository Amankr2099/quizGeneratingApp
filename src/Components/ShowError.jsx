import React from 'react'

export const ShowError=()=> {
  return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>Unable to generate questions.</p>
        <hr />
        <p className="mb-0">Please try again later.</p>
      </div>
    </div>
  )
}
