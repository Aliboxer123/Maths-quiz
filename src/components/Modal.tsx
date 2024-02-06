import { useContext, useState } from "react"
import { flashCardContext } from "./context"
export default function Modal() {
     
    const {modalClosed ,setModelClosed} = useContext(flashCardContext)
    
    return !modalClosed && <div style={{
        backgroundColor: 'black', position: 'absolute', top: '20%', left: '35%',
        height:'350px', width:'350px', display:'flex', alignItems:'center', zIndex:'100'
    }}><p style={{
        color: 'white', textAlign:'center', margin:'auto 30px'
    }}>This challenge is sure to pick at your brain and ensure speed of thought! You get presented
            with one question and a multitude of answers,
            you have to answer the questions within a specified timeframe or you lose!</p>
        <span style={{
            position: 'absolute', color: 'white', top: '0', right: '12px', cursor: 'pointer',

        }} onClick={() => {setModelClosed(true) }}>X</span>
    </div>
}