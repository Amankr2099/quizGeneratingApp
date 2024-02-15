import { useState } from 'react'
import {QuizContext} from './allContext'

const QuizContextProvider = ({children})=>{

    const [quizState,setQuizState]= useState(
        {
            quizTopic:'',
            numberOfQuestions:0,
            quizTime:10,
            quizProblems:[],
            timeLeft:300,
            attemptHistory:[],
            points:0,
        }
    )
   

    return(
        <QuizContext.Provider
            value={{quizState,setQuizState}}
        >
            {children}
        </QuizContext.Provider>
    )
}

export {QuizContextProvider}

