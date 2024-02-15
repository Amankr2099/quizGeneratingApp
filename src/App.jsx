import { useContext, useState } from 'react'
import { Problems } from './Components/Problems'
import { Result } from './Components/Result'
import { Header } from './Components/Header'
import { Footer } from './Components/Footer'
import { QuizContext } from './Components/allContext'
import { Prologue } from './Components/Prologue'
import { QuizSetting } from './Components/QuizSetting'

function App() {

  const { quizState, setQuizState } = useContext(QuizContext);


  const [startSetting, setStartSetting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [generateQuiz, setgenerateQuiz] = useState(false);

  const handleQuizSubmit = () => {
    // setgenerateQuiz(!quizStatus)
    getResult()
  };

  const getResult = () => {
    let updatedPoints = quizState.points;
    quizState.attemptHistory.forEach((attempt)=>{
        if (attempt.userAnswer === attempt.correctAnswer) {
          updatedPoints++
        }
      })
      setQuizState(prevState => ({
        ...prevState,
        points: updatedPoints
      }));
    // console.log(quizState);
    setQuizCompleted(true); 
  }

  return (
    <> 
     <Header/>
     <Prologue onSetting={setStartSetting}/>
     { startSetting && <QuizSetting removeSetting={setStartSetting} showProblem={setgenerateQuiz} />}
     { generateQuiz && <Problems onQuizSubmit={handleQuizSubmit}/> }
     { quizCompleted && <Result/> }
     <Footer/>
    </>
  )
}

export default App
