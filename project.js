const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const startBtn = document.querySelector('.btn');
const start = document.querySelector('.start');

let player = {
    x : canvas.width / 2,
    y : 520,
    radius : 10,
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
        if (dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId)
            start.style.display = 'flex';
        }
    })
}

function boundryCheck() {
    if (player.y < player.radius) {
        player.y = player.radius;
    }
    if (player.y > canvas.height - player.radius) {
        player.y = canvas.height - player.radius;
    }
    if (player.x < player.radius) {
        player.x = player.radius;
    }
    if (player.x > canvas.width - player.radius) {
        player.x = canvas.width - player.radius;
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
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
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

class Enemy {
    constructor (x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw () {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update () {
        this. draw()
        this.y = this.y + this.velocity.y
    };
}

let enemies = [];

function init(){
    player = {
        x : canvas.width / 2,
        y : 520,
        radius : 10,
        speed : 5,
    }
    enemies = []
}

function spawnEnemies () {
    setInterval(() => {
        
        const x = Math.random() * canvas.width;
        const y = 0;
        const radius = Math.random() * (50 - 8) + 8 ;
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        const angle = 0* Math.PI / 180;       //Math.atan2(x, y)
        const velocity = {
            //x : Math.cos(angle),
            y : Math.cos(angle)
        };
        enemies.push (new Enemy (x, y, radius, color, velocity));
    }, 1000);
};

startBtn.addEventListener('click', () => {
    init();
    spawnEnemies ()
    drawGame();
    start.style.display = 'none';
})

