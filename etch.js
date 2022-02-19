let gridSize = 16
let mouseDown = false

const black = (square) => {
    square.style.backgroundColor = 'black'
} 
const randomColor = (square) => {
    if(square.style.backgroundColor === 'white' || square.style.backgroundColor === 'black' || square.style.backgroundColor === 'rgb(0, 0, 0)'){
        square.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16); //generates a random color -> #56eec7, obtained from https://dev.to/akhil_001/generating-random-color-with-single-line-of-js-code-fhj
    } else {
        square.style.backgroundColor = rgbManipulation(square.style.backgroundColor)
        console.log(square.style.backgroundColor)
     }
} 
let color = black
createGrid()

function rgbManipulation(rbgValue){//this function darkens a color more each time it is called
    let value = rbgValue.substring(4).slice(0, -1).split(',')
    for(let i = 0; i < value.length; i++){
        value[i] = parseInt(value[i].trim())
        value[i] = value[i] - Math.floor(value[i]/9)
        if(value[i] < 15)
            value[i] = 0
    }
    return `rgb(${value[0]}, ${value[1]}, ${value[2]})`
}


const resetButton = document.querySelector("#reset")
resetButton.addEventListener('click', resetGrid)

const rainbow = document.querySelector("#randomColor")
const colorBlack = document.querySelector("#black")

colorBlack.addEventListener('click', () => {
    color = black
    colorBlack.classList.add('selected')
    rainbow.classList.remove('selected')

})

rainbow.addEventListener('click', () => {
    color = randomColor
    rainbow.classList.add('selected')
    colorBlack.classList.remove('selected')

})




function resetGrid(){
    const squares = document.querySelectorAll('.grid div div')
    squares.forEach((square) => {
        square.style.backgroundColor = 'white'
    })
}

function createGrid() {//function to create the grid
    const grid = document.querySelector('.grid')
    for (let i = 0; i < gridSize; i++){
        const row = document.createElement('div')
        for(let j = 0; j < gridSize; j++){
            const square = document.createElement('div')
            square.style.backgroundColor = 'white'
            row.appendChild(square)
        }
        grid.appendChild(row)
    }
}

function alterSquare(square, e){
    if(e.shiftKey){
        square.style.backgroundColor = 'white'
    } else {
        color(square)    }//the function in the variable color is different depending on the mode
}




const squares = document.querySelectorAll('.grid div div')
squares.forEach((square) => {
    square.addEventListener('mouseover', function(e) {
        if(mouseDown === true)
            alterSquare(square, e)
    })
})
squares.forEach((square) => {
    square.addEventListener('mousedown', function(e) {
            alterSquare(square, e)
    })
})


document.addEventListener('mousedown', function() {
    mouseDown = true
})

document.addEventListener('mouseup', function() {
    mouseDown = false
})