let turn = "X"
let isGameOver = false
const changeTurn = () => { return turn === "X" ? "0" : "X"}

const didAnyoneWin = () => {
    let boxInput = document.getElementsByClassName('inputTurn')
    let winningSituations = [
        [0,1,2,5,5,0],
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-5,15,90],
        [1,4,7,5,15,90],
        [2,5,8,15,15,90],
        [0,4,8,5,15,45],
        [2,4,6,5,15,135],
    ]
    winningSituations.forEach( x => {
        if(
            (boxInput[x[0]].innerText === boxInput[x[1]].innerText)
            && (boxInput[x[2]].innerText === boxInput[x[1]].innerText)
            && (boxInput[x[0]].innerText !== "")
        ){
            document.querySelector('.turn').innerText = boxInput[x[0]].innerText + " Won"
            isGameOver = true
            document.querySelector('.winningImage').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${x[3]}vw, ${x[4]}vw) rotate(${x[5]}deg)`
            document.querySelector(".line").style.width = "20vw"
            document.querySelector(".line").style.justifyContent = "center"
            document.querySelector(".line").style.alignItems = "center"
        }
    })

    //if all boxes are filled with no winner
    let allBoxFilled = Array.from(boxInput).every(input => input.innerText !== "")
    if (allBoxFilled && !isGameOver){
        resetGame()
        document.querySelector('.turn').innerText = "It's a draw!";
    }
}
//reset game
const resetGame = () => {
    let inputTurn = document.querySelectorAll('.inputTurn')
    Array.from(inputTurn).forEach(element => {
        element.inputTurn = ""})
    turn = "X";
    isGameOver = false;
    document.querySelector(".line").style.width = "0vw"
    document.getElementsByClassName("turn")[0].innerText = "It's your turn, "+turn;
    document.querySelector('.winningImage').getElementsByTagName('img')[0].style.width = "0px"
}

//main game logic and method
let boxArr = document.getElementsByClassName("grid")
Array.from(boxArr).forEach(element => {
    let boxInput = element.querySelector('.inputTurn')
    element.addEventListener('click', () => {
        if (boxInput.innerText === '' && !isGameOver){
            boxInput.innerText = turn
            turn = changeTurn()
            didAnyoneWin()
            if (!isGameOver)
                document.getElementsByClassName(".turn")[0].innerText = "Turn for " + turn;
        }
    })
})
reset.addEventListener('click', resetGame)