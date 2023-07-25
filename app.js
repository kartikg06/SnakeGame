const board = document.getElementById("board");
const bgSound = new Audio("./Sounds/background.mp3");
const dieSound = new Audio("./Sounds/die.mp3");
const foodSound = new Audio("./Sounds/food.mp3");
const turnSound = new Audio("./Sounds/turn.mp3");
let inputDir = { x: 0, y: 0 };
let lastRenderTime = 0;
let snakeSpeed = 10;
let snakeBody = [{ x: 10, y: 5 }];
let food = {
    x: 5,
    y: 7
};
let score = 0;

document.addEventListener("keydown", (e) => {
    document.querySelector(".heading").innerHTML = "Game started....Enjoy";
    bgSound.play();
});

function btnClass(cls) {
    document.getElementById("Easy").addEventListener("click", () => {
        // snakeSpeed = 2;
        document.querySelector(".heading").innerHTML = "3";
        setTimeout(() => {
            document.querySelector(".heading").innerHTML = "2";
        }, 1000);
        setTimeout(() => {
            document.querySelector(".heading").innerHTML = "1";
        }, 2000);
        setTimeout(() => {
            bgSound.play();
            document.querySelector(".heading").innerHTML = "Game Started.....Enjoy";
            snakeSpeed = 5;
            inputDir = { x: 0, y: 1 };
            inputDir.x = 0;
            inputDir.y = 1;
        }, 3000);
    })
    document.getElementById("Medium").addEventListener("click", () => {
        // snakeSpeed = 2;
        document.querySelector(".heading").innerHTML = "3";
        setTimeout(() => {
            document.querySelector(".heading").innerHTML = "2";
        }, 1000);
        setTimeout(() => {
            document.querySelector(".heading").innerHTML = "1";
        }, 2000);
        setTimeout(() => {
            bgSound.play();
            document.querySelector(".heading").innerHTML = "Game Started.....Enjoy";
            snakeSpeed = 10;
            inputDir = { x: 0, y: 1 };
            inputDir.x = 0;
            inputDir.y = 1;
        }, 3000);
    })
    document.getElementById("Hard").addEventListener("click", () => {
        // snakeSpeed = 2;
        document.querySelector(".heading").innerHTML = "3";
        setTimeout(() => {
            document.querySelector(".heading").innerHTML = "2";
        }, 1000);
        setTimeout(() => {
            document.querySelector(".heading").innerHTML = "1";
        }, 2000);
        setTimeout(() => {
            bgSound.play();
            document.querySelector(".heading").innerHTML = "Game Started.....Enjoy";
            snakeSpeed = 15;
            inputDir = { x: 0, y: 1 };
            inputDir.x = 0;
            inputDir.y = 1;
        }, 3000);
    })
}

function main(current) {
    // here we have created loop which will render page after every specific time
    window.requestAnimationFrame(main);
    if ((current - lastRenderTime) / 1000 < 1 / snakeSpeed) {
        return;
    }
    lastRenderTime = current;
    // console.log(current);

    gameController();
};

function collide(snake) {
    for (let i = 1; i < snakeBody.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 25 || snake[0].x <= 0 || snake[0].y >= 25 || snake[0].y <= 0) {
        return true;
    }
}

function gameController() {
    // we firstly update food and snake positions and then secondly we display them.
    // Part1:
    if (collide(snakeBody)) {
        dieSound.play();
        bgSound.pause();
        inputDir = { x: 0, y: 0 };
        snakeBody = [{ x: 10, y: 5 }];
        score = 0;
        document.querySelector(".heading").innerHTML = "Game Over, Press any key to contine";

    }

    // After food eating
    if (food.x == snakeBody[0].x && food.y == snakeBody[0].y) {
        foodSound.play();
        score++;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            document.querySelector(".highScore").innerHTML = "Hi-Score : " + hiscoreval;
        }

        document.querySelector(".curScore").innerHTML = "Score : " + score;
        snakeBody.unshift({ x: snakeBody[0].x + inputDir.x, y: snakeBody[0].y + inputDir.y });
        food = {
            x: Math.floor(Math.random() * 25 + 1),
            y: Math.floor(Math.random() * 25 + 1)
        }
    }

    // Moving snake
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    snakeBody[0].x += inputDir.x;
    snakeBody[0].y += inputDir.y;



    // Part2:
    board.innerHTML = "";
    // Display Snake
    snakeBody.forEach((e, index) => {
        snakeHead = document.createElement("div");
        snakeHead.style.gridRowStart = e.y;
        snakeHead.style.gridColumnStart = e.x;
        snakeHead.classList.add("snake");
        board.appendChild(snakeHead);
    })

    // Display Food
    foodHead = document.createElement("div");
    foodHead.style.gridRowStart = food.y;
    foodHead.style.gridColumnStart = food.x;
    foodHead.classList.add("food");
    board.appendChild(foodHead);
}


// Storing hi-score inlocal storage
let hiscore = localStorage.getItem("hiscore");
if (hiscore == null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    document.querySelector(".highScore").innerHTML = "Hi-Score : " + hiscoreval;
}


// This is used to render animation frame
window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 };
    turnSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            console.log("Not applicable");
            break;
    }
})

