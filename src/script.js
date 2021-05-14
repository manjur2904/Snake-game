
// I have taken all sound as constant variable
const foodSound = new Audio('../music/food.mp3');
const gameOver =new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');

// inputDir set the direction according to press direction on keybord
let inputDir = {x:0, y:0};

// speed define the move of snake
let speed = 5;

// 
let lastPaintTime = 0;

// snakeArr defines current location of head of the snake
let snakeArr = [{x:13, y:15}]

// food defines the exact location of food
let food = {x:6, y:7};

// score defines how much food you have eat
let score = 0;

// hiscoreval defines highst score upto you have played
let hiscoreval = 0;

// this is the main function 
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}
// isCollide function check whather snake is bumped or not
function isCollide(snake){
    // if snake bump into itself
    for(let i=1; i<snakeArr.length; i++)
    {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if snake bump into the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}

// gameEngin function controls all activities of game
function gameEngine(){
    // Part - 1 : Updating the snake array & food
    if(isCollide(snakeArr)){
        gameOver.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over. Press any key to play again...!!!");
        // from here I have restart from initial score
        snakeArr = [{x:13, y:15}];
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score : "+score;
    }
    // If snake have eaten the food, increment the score and generate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        // this if condition update the highest score
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Heigh Score : "+hiscoreval;
        }
        // I have changed the score value
        scoreBox.innerHTML = "Score : "+score;
        // here we have modified the snakeArr 
        snakeArr.unshift({
            x:snakeArr[0].x + inputDir.x,
            y:snakeArr[0].y + inputDir.y
        });
        // here I have taken 2 random values for placing the foor 
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a+(b-a)*Math.random()),
            y: Math.round(a+(b-a)*Math.random())

        }
    }
    // moving the snake
    for (let i = snakeArr.length-2; i>=0 ; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Part - 2 : Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Part - 3 : Display the food
    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}

// here we have modified the highest score
let hiscore = localStorage.getItem('hiscore');
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Heigh Score : "+hiscore;
}
/* 
setInterval() -> Calls a function or executes a code snippet repeatedly, with a fixed time delay between each call to that function.

requestAnimationFrame() -> The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. The method takes as an argument a callback to be invoked before the repaint.


*/

window.requestAnimationFrame(main);


window.addEventListener('keydown', e => {
    inputDir = {x:0, y:1}; // start the game
    musicSound.play();
    moveSound.play()
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }

})