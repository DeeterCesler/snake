// set up a grid system (10x10)



const buildGrid = (height, width) => {
    maxHeight = height - 1;
    maxWidth = width - 1;
    for(let i=0; i<height; i++){
        // building rows
        $("table").append(`<tr id='row${i}'></tr`);
        for(let j=0; j<width; j++){
            // building columns in each row
            $(`#row${i}`).append(`<td id='row${i}column${j}'></td>`);
            $(`#row${i}column${j}`).append("<div class='holder'></div>")
            // $(`#row${i}column${j} div`).text(`TEST`)
        }
    }
    // height = number of rows
    // width = number of columns per row
}

let maxHeight;
let maxWidth;


buildGrid(20,20);

let score = 0;
$("body").append(`<div class='score'>${score}</div>`)


// move a block from grid point to grid point
// start 
    
let snakeRow = 0;
let snakeColumn = 0;
let snakeDirection = "right";
let newPosition = "#row0column0";
let fruitPosition;
let snakeBodyLocation = []
let hackySolutionBecauseIHateClearInterval = 0;

$(`${newPosition} .holder`).append("<div id='snake-head'></div>");

const controls = () => {
    document.addEventListener('keypress', (event) => {
        const keyName = event.key;
        if(keyName === "d"){
            if(snakeDirection === "left"){
                return
            }else{
                snakeDirection = "right";
                return;
            }
        }
        if(keyName === "a"){
            if(snakeDirection === "right"){
                return
            }else{
                snakeDirection = "left";
                return;
            }
        }
        if(keyName === "w"){
            if(snakeDirection === "down"){
                return
            }else{
                snakeDirection = "up";
                return;
            }
        }
        if(keyName === "s"){
            if(snakeDirection === "up"){
                return
            }else{
                snakeDirection = "down";
            }
        }
        console.log(newPosition);
    })
}

const movement = () => {
    controls();
    const autoMove = setInterval(function(){
        if(snakeDirection === "right"){
            if(snakeColumn === maxWidth){
                gameOver();
            }
            if(snakeColumn < maxWidth){
                snakeColumn++;
            }
            $("#snake-head").remove();
            newPosition = "#row" + snakeRow + "column" + snakeColumn
            // console.log(newPosition);
            $(`${newPosition} .holder`).append("<div id='snake-head'></div>");
        }
        if(snakeDirection === "left"){
            if(snakeColumn === 0){
                gameOver();
            }
            if(snakeColumn > 0){
                snakeColumn--;
            }
            $("#snake-head").remove();
            newPosition = "#row" + snakeRow + "column" + snakeColumn
            // console.log(newPosition);
            $(`${newPosition} .holder`).append("<div id='snake-head'></div>");
        }
        if(snakeDirection === "up"){
            if(snakeRow === 0){
                gameOver();
            }
            if(snakeRow > 0){
                snakeRow--;
            }
            $("#snake-head").remove();
            newPosition = "#row" + snakeRow + "column" + snakeColumn
            // console.log(newPosition);
            $(`${newPosition} .holder`).append("<div id='snake-head'></div>");
        }
        if(snakeDirection === "down"){
            if(snakeRow === maxHeight){
                gameOver();
            }
            if(snakeRow < maxHeight){
                snakeRow++;
            }
            $("#snake-head").remove();
            newPosition = "#row" + snakeRow + "column" + snakeColumn
            // console.log(newPosition);
            $(`${newPosition} .holder`).append("<div id='snake-head'></div>");
        }
        scoreCounter();
    }, 500);
    snakeBodyLocation[0] = {}
}

movement();

// log a point if the snake head eats a fruit
$("#row3column3 .holder").append("<div id='fruit'></div>")

fruitPosition = $("#fruit").parent().parent().attr("id");

console.log(fruitPosition);

const gameOver = () => {
    if(hackySolutionBecauseIHateClearInterval === 0){
        $("table").remove();
        $("body").append("<h1>GAME OVER</h1>")
    }
    hackySolutionBecauseIHateClearInterval++;
}


const newFruitPosition = () => {
    const randomRow = Math.floor(Math.random() * (maxWidth +1));
    const randomColumn = Math.floor(Math.random() * (maxHeight+1));
    fruitPosition = "row" + randomRow + "column" + randomColumn;
    if("#" + fruitPosition === newPosition){
        newFruitPosition();
    }
    else {$(`#${fruitPosition} .holder`).append("<div id='fruit'></div>")}
}

function addSnakeLength(){
    // add to an array where the snake head was last
    // pass it down
}

const scoreCounter = () => {
    if("#" + fruitPosition === newPosition){
        score++;
        addSnakeLength();
        $("#fruit").remove();
        newFruitPosition();
        $(".score").empty();
        $(".score").html(`<div class='score'>${score}</score>`);
    }
}

// move a snake around the screen
// Make it die if it hits a wall
// Make it die if it hits itself
// make it grow if it eats a fruit
// Figure out a way to vary the grid sizes

$("body").prepend("<h2>Use W, A, S, and D to move the green. <br/> Try and collect the red, and don't hit the walls!</h2>")