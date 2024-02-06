import Modal from "./Modal"
import Game from "./Game"
import Cardcontext from "./context"
export default function App() {
    return <Cardcontext>
        <Modal/>
        <Game/>
    </Cardcontext>    
}
