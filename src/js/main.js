import Vec2 from './Vec2'
import MouseTracker from './MouseTracker'

CanvasRenderingContext2D.prototype.circle = function(x, y, r) {
    this.moveTo(x + r, y);
    this.arc(x, y, r, 0, 2 * Math.PI);
};

class Ball {
    constructor(pos, vel) {
        this.pos = pos;
        this.vel = vel;
    }

    move() {
        this.pos = this.pos.add(this.vel);
    }
}

var gWidth = 320;
var gHeight = 240;

var balls = [];
for (var i = 0; i < 10; i++) {
    var pos = new Vec2(Math.rand(gWidth), Math.rand(gHeight));
    var vel = new Vec2(Math.rand(-99, 100), Math.rand(-99, 100)).norm().mul(5);
    var ball = new Ball(pos, vel);
    balls.push(ball);
}

var canvas = createCanvas(gWidth, gHeight);

var mouse = new MouseTracker(canvas);

document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');

loop();

function loop() {
    var m = new Vec2(mouse.x, mouse.y);
    for (var i = 0; i < balls.length; i++) {
        var d = balls[i].pos.sub(m).norm();
        var l = balls[i].vel.len();
        balls[i].vel = balls[i].vel.add(d).norm().mul(l);

        if (balls[i].pos.x < 0) {
            balls[i].vel.x = Math.abs(balls[i].vel.x);
        }
        else if (balls[i].pos.x > gWidth) {
            balls[i].vel.x = Math.abs(balls[i].vel.x) * -1;
        }
        if (balls[i].pos.y < 0) {
            balls[i].vel.y = Math.abs(balls[i].vel.y);
        }
        else if (balls[i].pos.y > gHeight) {
            balls[i].vel.y = Math.abs(balls[i].vel.y) * -1;
        }

        balls[i].move();
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, gWidth, gHeight);
    ctx.strokeStyle = '#FFF';
    ctx.beginPath();
    for (var i = 0; i < balls.length; i++) {
        ctx.circle(balls[i].pos.x, balls[i].pos.y, 10);
    }
    ctx.stroke();

    requestAnimationFrame(loop);
}

function createCanvas(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}