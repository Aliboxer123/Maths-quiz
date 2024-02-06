export function GenerateWholeNum() {
const random = Math.floor(Math.random() * 15) + 2    
return random
}
export function generateNum(){
const numOne = GenerateWholeNum()    
const numTwo = GenerateWholeNum()
return [numOne, numTwo]    
}

export function shuffle(array){
for (let i = array.length - 1; i > 0; i--){
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]]    
}
return array    
    }