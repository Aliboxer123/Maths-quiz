import { createContext, useState } from "react";

export const flashCardContext = createContext()

export default function Cardcontext({ children }) {
const [round, setRound] = useState(0)
    const [answers, setAnswers] = useState([])
    const [timerOn, setTimerOn] = useState(false)
    const [scoreBoard, setScoreBoard] = useState([false, false, false, false, false])
    const [timer, setTimer] = useState(15)    
const [modalClosed, setModelClosed] = useState(false)
    return <flashCardContext.Provider value={{
        modalClosed, setModelClosed, answers, setAnswers,
        timerOn, setTimerOn, scoreBoard, setScoreBoard, timer,
    setTimer, round, setRound}
}>{children}</flashCardContext.Provider>    
}