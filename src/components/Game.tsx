import { useContext, useEffect, useRef, useState } from "react"
import { flashCardContext } from "./context"
import { GenerateWholeNum, generateNum, shuffle } from "../utility"
export default function Game() {

const [numOne, numTwo] = generateNum()   
    const Obj = {sum: numOne * numTwo, options: [[numOne, numTwo],
[GenerateWholeNum(), GenerateWholeNum()],
[GenerateWholeNum(), GenerateWholeNum()],
[GenerateWholeNum(), GenerateWholeNum()]
    ]
    }
    const [question, setQuestions] = useState(Obj)
    const { modalClosed, answers, setAnswers,
        timerOn, setTimerOn, scoreBoard, setScoreBoard, timer,
        setTimer, round, setRound } = useContext(flashCardContext)
    
    const timeRef = useRef(null)

    shuffle(Obj.options)
    
    useEffect(() => {
        if (modalClosed) {
       timeRef.current = setInterval(()=> setTimer(oldValue => oldValue != 0 && round != 5 ? oldValue - 1: oldValue),1000)   
        }
        if (timer == 0) {
            setRound(oldValue => oldValue + 1)
            setTimer(15)    
            setQuestions(Obj)
                setAnswers([])
        }
if (!timerOn){
        const lastAnswer = answers[answers.length - 1];
    if (answers.includes(lastAnswer) && lastAnswer[0] * lastAnswer[1] === question.sum) {
        if (round < 5) {
            setScoreBoard(oldValue => {
             oldValue[round] = true
             return oldValue   
            })
            setTimeout(() => {
                setQuestions(Obj); setTimerOn(false)
                setAnswers([])
                setRound(oldValue => oldValue + 1)
            }, 2000);
            setTimer(15)
            setTimerOn(true)
           
        } 
    }
    else if (answers.includes(lastAnswer) && lastAnswer[0] != lastAnswer[1]) {
       setTimeout(() => {
           setRound(round + 1)
           setQuestions(Obj)
           setAnswers([])
           setTimerOn(false)
       }, 2000); 
        setTimer(15)
        setTimerOn(true)
    }
        }
        return () => {
            if (timeRef.current) {
         clearInterval(timeRef.current)
     }}   
    }, [answers, timerOn, timer, modalClosed])
    
    const correctAnswers = scoreBoard.filter(data => data == true ? data : '')
    
    const questionElem = question.options.map((data, index) => {
        return <h3 onClick={() => {
            if (!timerOn) {
                setAnswers(oldValue => {
                    return [...oldValue, data]
                })
            }
        }}
            key={index} style={{
                backgroundColor: answers.includes(data) && data[0] * data[1] ==
                    question.sum ? 'green' : answers.includes(data) && data[0] * data[1]
                !== question.sum ? 'red' : 'yellow', padding: '1.4rem'
                , borderRadius: '15px', cursor: timerOn ? 'not-allowed'
                    : 'pointer', textAlign: 'center', pointerEvents: answers.includes(data) ? 'none' : '',
        transition: '3s ease-out'
        }}>{`${data[0]} x ${data[1]}`}</h3>   
    })
    return round < 5 ? <div style={{
        backgroundColor: 'brown', height: '100vh', display: 'flex', justifyContent: 'center',
        alignItems: 'center', flexDirection: 'column'
    }}>
        <div style={{borderRadius: '50%', width: '50px', height: '50px', position:'absolute', top:'20px'}}>
            <div style={{
                borderRadius: '50%', 
                backgroundColor: timer <= 10 && timer > 5 ? 'yellow': timer <= 5 ? '#FFA8A8': 'green', width: `${timer}vw`, height: `${timer}vh`,
                display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center', transition:'1s ease-in-out'
            }}><p style={{
                color: timer > 5 && timer <= 10 ? '#020085' : timer <= 5 ? '#021212': 'black'
                , marginTop: '15px', fontWeight: '500', fontSize: `${timer * 2}px`
            }}>{timer}</p></div></div>
        <h1>Question: {question.sum} </h1>
        <span style={{
            color: '#FFFFFF', fontWeight: '600', fontSize: '1.2rem', border: '1px solid', padding: '15px',
        borderRadius:'15px'}}>Round : {round + 1}</span> 
        <hr />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap:'10px' }}>
        {questionElem}
        </div>  
    </div>   : <div style={{
        backgroundColor: 'brown', height: '100vh', display: 'flex', justifyContent: 'center',
    alignItems:'center', flexDirection:'column'}}>
            <h1> Game over</h1>
            <h3>You got {correctAnswers.length} out of 5</h3>
            <span className="btn btn-primary" onClick={() => {
                setRound(0);
                setAnswers([])
                setScoreBoard([false, false, false, false, false])
                setTimer(15)
            }}>Click here to start again</span>
        </div>
}