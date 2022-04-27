const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const startBtn = document.querySelector('.btn');
const start = document.querySelector('.start');

let player = {
    x : canvas.width / 2,
    y : 520,
    radious : 10,
    speed : 5,
}

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

let animationId
function drawGame() {
    animationId = requestAnimationFrame(drawGame);
    clearScreen();
    inputs();
    boundryCheck();
    drawCircle(player);

    enemies.forEach(enemy => {
        enemy.update()

        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        if (dist - enemy.radious - player.radious < 1) {
            cancelAnimationFrame(animationId)
            start.style.display = 'flex';
        }
    })
}

function boundryCheck() {
    if (player.y < player.radious) {
        player.y = player.radious;
    }
    if (player.y > canvas.height - player.radious) {
        player.y = canvas.height - player.radious;
    }
    if (player.x < player.radious) {
        player.x = player.radious;
    }
    if (player.x > canvas.width - player.radious) {
        player.x = canvas.width - player.radious;
    } 
}

function inputs () {
    if (upPressed) {
        player.y = player.y - player.speed;
    }
    if (downPressed) {
        player.y = player.y + player.speed;
    }
    if (leftPressed) {
        player.x = player.x - player.speed;
    }
    if (rightPressed) {
        player.x = player.x + player.speed;
    }
}

function drawCircle(player) {
    ctx.fillStyle = 'purple';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radious, 0, Math.PI * 2);
    ctx.fill();
}

function clearScreen() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';   
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

document.body.addEventListener('keydown', keyDown);
document.body.addEventListener('keyup', keyUp);

function keyDown(event) {
    if (event.keyCode == 38) {
        upPressed = true;
    }
    if (event.keyCode == 40) {
        downPressed = true; 
    }
    if (event.keyCode == 37) {
        leftPressed = true; 
    }
    if (event.keyCode == 39) {
        rightPressed = true; 
    }
}

function keyUp(event) {
    if (event.keyCode == 38) {
        upPressed = false;
    }
    if (event.keyCode == 40) {
        downPressed = false; 
    }
    if (event.keyCode == 37) {
        leftPressed = false; 
    }
    if (event.keyCode == 39) {
        rightPressed = false; 
    }
}

// const enemy = [        // matix 'T' 
// [0, 0, 0],
// [1, 1, 1],
// [0, 1, 0],
// ];

class Enemy {
    constructor (x, y, radious, color, velocity) {
        this.x = x
        this.y = y
        this.radious = radious
        this.color = color
        this.velocity = velocity
    }
    draw () {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radious, 0, Math.PI *2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        
        //drawEnemy();
        
        // enemy.forEach((row, y) => {
        //   row.forEach((value, x) => {     // default value = 0 
        //         if (value !== 0) {
        //             ctx.fillStyle = this.color;
        //             ctx.fillRect (x = this.x, y = this.y, 20, 20);
        //         }
        //     })
        // })

    }

    update () {
        this. draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
    
}


// function createPiece (type) {
//     if (type === 'T') {
//         return [
//             [0, 0, 0],
//             [1, 1, 1],
//             [0, 1, 0],
//         ];
//     } else if (type === 'O') {
//         return [
//             [2, 2],
//             [2, 2],
//         ];
//     } else if (type === 'L') {
//         return [
//             [0, 3, 0],
//             [0, 3, 0],
//             [0, 3, 3],
//         ];
//     } else if (type === 'J') {
//         return [
//             [0, 4, 0],
//             [0, 4, 0],
//             [4, 4, 0],
//         ];
//     } else if (type === 'I') {
//         return [
//             [0, 5, 0, 0],
//             [0, 5, 0, 0],
//             [0, 5, 0, 0],
//             [0, 5, 0, 0],
//         ];
//     } else if (type === 'S') {
//         return [
//             [0, 6, 6],
//             [6, 6, 0],
//             [0, 0, 0],
//         ];
//     } else if (type === 'Z') {
//         return [
//             [7, 7, 0],
//             [0, 7, 7],
//             [0, 0, 0],
//         ];
//     }
// }

let enemies = []

function init(){
    player = {
        x : canvas.width / 2,
        y : 520,
        radious : 10,
        speed : 5,
    }
    enemies = []
}

function spawnEnemies () {
    setInterval(() => {
        
        //const pieces = 'ILJOTSZ';
        //const matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
        
        const x = Math.random() * canvas.width
        const y = 0
        const radious = Math.random() * (50 - 8) + 8 
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`
        const angle = Math.atan(canvas.height / 2 - y, canvas.width / 2 - x)
        const velocity = {
            x : Math.cos(angle),
            y : Math.sin(angle)
        }
        enemies.push (new Enemy (x, y, radious, color, velocity))
    }, 1000);
}

startBtn.addEventListener('click', () => {
    init();
    drawGame();
    spawnEnemies ()
    start.style.display = 'none';
})

