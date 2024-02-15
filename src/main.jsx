import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {QuizContextProvider} from '../src/Components/QuizContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuizContextProvider>
    <App />
    </QuizContextProvider>
  </React.StrictMode>,
)
