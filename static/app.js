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
    
let snakeRow = 0;
let snakeColumn = 2;
let snakeLength = 3;
let lastDirection = "right";
let nextDirection = "right";
let newPosition = "#row0column2";
let lastPosition;
let fruitPosition;
let snakeBodyLocation = ["#row0column0", "#row0column1", newPosition]
let hackySolutionBecauseIHateClearInterval = 0;

$(`${newPosition} .holder`).append("<div id='snake-head'></div>");
$(`#row0column1 .holder`).append("<div class='snake-body'></div>");
$(`#row0column0 .holder`).append("<div class='snake-body'></div>");

const controls = () => {
    document.addEventListener('keypress', (event) => {
        const keyName = event.key;
        if(keyName === "d"){
            if(lastDirection === "left"){
                return
            }else{
                nextDirection = "right";
                return;
            }
        }
        if(keyName === "a"){
            if(lastDirection === "right"){
                return
            }else{
                nextDirection = "left";
                return;
            }
        }
        if(keyName === "w"){
            if(lastDirection === "down"){
                return
            }else{
                nextDirection = "up";
                return;
            }
        }
        if(keyName === "s"){
            if(lastDirection === "up"){
                return
            }else{
                nextDirection = "down";
            }
        }
        console.log(newPosition);
    })
}

const movement = () => {
    controls();
    const autoMove = setInterval(function(){
        lastPosition = newPosition;
        if(nextDirection === "right"){
            if(snakeColumn === maxWidth){
                gameOver();
            }
            if(snakeColumn < maxWidth){
                snakeColumn++;
            }
        }
        if(nextDirection === "left"){
            if(snakeColumn === 0){
                gameOver();
            }
            if(snakeColumn > 0){
                snakeColumn--;
            }
        }
        if(nextDirection === "up"){
            if(snakeRow === 0){
                gameOver();
            }
            if(snakeRow > 0){
                snakeRow--;
            }
        }
        if(nextDirection === "down"){
            if(snakeRow === maxHeight){
                gameOver();
            }
            if(snakeRow < maxHeight){
                snakeRow++;
            }
        }
        newPosition = "#row" + snakeRow + "column" + snakeColumn
        if(snakeBodyLocation.includes(newPosition)){
            gameOver();
        }
        snakeBodyLocation.push(newPosition);
        $("#snake-head").remove();
        $(`${newPosition} .holder`).append("<div id='snake-head'></div>");
        $(".snake-body").remove();
        for(let i=snakeLength-1; i>0; i--){
            $(`${snakeBodyLocation[i]} .holder`).append("<div class='snake-body'></div>");
            console.log(lastPosition)
        }
        lastDirection = nextDirection;
        console.log(newPosition)
        scoreCounter();
    }, 100);
}

movement();

// log a point if the snake head eats a fruit
$("#row3column3 .holder").append("<div id='fruit'></div>")

fruitPosition = $("#fruit").parent().parent().attr("id");

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
    snakeBodyLocation.forEach(element => {
        if(element === "#" + fruitPosition){
            $("#fruit").remove();
            newFruitPosition();
            return
        }
    })
    if("#" + fruitPosition === newPosition){
        newFruitPosition();
    }
    else {$(`#${fruitPosition} .holder`).append("<div id='fruit'></div>")}
}

const scoreCounter = () => {
    if("#" + fruitPosition === newPosition){
        score++;
        snakeLength++;
        $("#fruit").remove();
        newFruitPosition();
        $(".score").empty();
        $(".score").html(`<div class='score'>${score}</score>`);
    }else{
        snakeBodyLocation.shift();
    }
}