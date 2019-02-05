// set up a grid system (10x10)

let allScores;
let lastScore;

$.ajax({
    type: "GET",
    dataType: "json",
    url: "/scoreboard",
    success: function(data){
        allScores = data;
        for(let i=0; i<allScores.length; i++){
            console.log(allScores[i])
            $(".scoreboard").append(`<div class="row score-row" id='score-row-${i}'></div>`)
            $(`#score-row-${i}`).append(`<div class="col-2 score-cell">${i+1}. </div>`)
            $(`#score-row-${i}`).append(`<div class="col-6 score-cell">${allScores[i][0]} </div>`)
            $(`#score-row-${i}`).append(`<div class="col-2 score-cell">${allScores[i][1]}</div>`)
        };
        lastScore = allScores[allScores.length-1][1];
    },
    error: function(){
        alert(data)
    }
});



const buildGrid = (height, width) => {
    maxHeight = height - 1;
    maxWidth = width - 1;
    for(let i=0; i<height; i++){
        // building rows
        $(".grid").append(`<tr id='row${i}'></tr>`);
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

let score = 0;
$(".player-score").append(`<div class='text-center score'>Your Score: ${score}</div>`)
    
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

startState = () => {
    snakeRow = 0;
    snakeColumn = 2;
    snakeLength = 3;
    lastDirection = "right";
    nextDirection = "right";
    newPosition = "#row0column2";
    snakeBodyLocation = ["#row0column0", "#row0column1", newPosition]
    hackySolutionBecauseIHateClearInterval = 0;
    score = 0;
}

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
        }
        lastDirection = nextDirection;
        scoreCounter();
    }, 100);
}

const gameOver = () => {
    if(hackySolutionBecauseIHateClearInterval === 0){
        $(".grid").empty();
        $(".top-text").append("<h1>GAME OVER</h1>")
        if(score > lastScore){
            const playerName = prompt("HIGH SCORE. What's your name?");
            const playerScore = score;
            data = {
                "playerName": playerName, 
                "playerScore": playerScore
            };
            $.ajax({
                type: "POST",
                url: "/newscore",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(){
                    alert("Your score has been posted.")
                },
                error: function(xhr, ajaxOptions, thrownError){
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            })
        }
        $(".top-text").append(`<button class="start-game">Play again?</button>`);
        $(".start-game").on("click", function(){
            $(".grid").empty();
            $(".top-text").empty();
            startState();
            buildGrid(20,20);
            $("#row3column3 .holder").append("<div id='fruit'></div>")
            fruitPosition = $("#fruit").parent().parent().attr("id");
            $(".score").empty();
            $(".score").html(`<div>Your Score: ${score}</score>`);
        })
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
        $("#fruit").remove();
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
        $(".score").html(`<div>Your Score: ${score}</score>`);
    }else{
        snakeBodyLocation.shift();
    }
}


$(".top-text").append(`<br/><button class="start-game" style="margin-left: 100px">Start</button>`);
$(".start-game").on("click", function(){
    $(".grid").empty();
    $(".top-text").empty();
    buildGrid(20,20);
    $("#row3column3 .holder").append("<div id='fruit'></div>")
    fruitPosition = $("#fruit").parent().parent().attr("id");
    movement();
})