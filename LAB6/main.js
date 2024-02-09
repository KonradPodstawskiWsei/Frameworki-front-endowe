const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let balls = [];
const numBalls = 100;
const radius = 10;
const minDistance = 100;
let animationFrameId;

class Ball {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= radius || this.x >= canvas.width - radius) {
            this.vx = -this.vx;
        }
        if (this.y <= radius || this.y >= canvas.height - radius) {
            this.vy = -this.vy;
        }
    }
}

function connectBalls() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const dx = balls[i].x - balls[j].x;
            const dy = balls[i].y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < minDistance) {
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.stroke();
            }
        }
    }
}

function createBalls() {
    balls = [];
    for (let i = 0; i < numBalls; i++) {
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;
        let vx = (Math.random() - 0.5) * 4;
        let vy = (Math.random() - 0.5) * 4;
        balls.push(new Ball(x, y, vx, vy));
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        ball.draw();
        ball.update();
    });
    connectBalls();
    animationFrameId = requestAnimationFrame(draw);
}

document.getElementById('start').addEventListener('click', () => {
    if (!animationFrameId) {
        draw();
    }
});

document.getElementById('reset').addEventListener('click', () => {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    createBalls();
});

createBalls();