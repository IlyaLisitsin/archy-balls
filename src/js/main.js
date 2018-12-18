import Vec2 from './Vec2'
import MouseTracker from './MouseTracker'

const rand = function(max, min = 0) {
    const diff = max - min
    return Math.floor(Math.random() * diff) + min
}

const circle = function(x, y, r) {
    canvas.getContext('2d').moveTo(x + r, y)
    canvas.getContext('2d').arc(x, y, r, 0, 2 * Math.PI)
}

function createCanvas(width, height) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
}

class Ball {
    constructor(pos, vel) {
        this.pos = pos
        this.vel = vel
    }

    move() {
        this.pos = this.pos.add(this.vel)
    }
}

const gWidth = 320
const gHeight = 240

const balls = []
for (let i = 0; i < 10; i++) {
    const pos = new Vec2(rand(gWidth), rand(gHeight))
    const vel = new Vec2(rand(-99, 100), rand(-99, 100)).norm().mul(5)
    const ball = new Ball(pos, vel)
    balls.push(ball)
}

const canvas = createCanvas(gWidth, gHeight)

const mouse = new MouseTracker(canvas)

document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

loop(ctx)

function loop() {
    const m = new Vec2(mouse.x, mouse.y)
    balls.forEach(ball => {

        const d = ball.pos.sub(m).norm()
        const l = ball.vel.len()
        ball.vel = ball.vel.add(d).norm().mul(l)

        if (ball.pos.x < 0) {
            ball.vel.x = Math.abs(ball.vel.x)
        }
        else if (ball.pos.x > gWidth) {
            ball.vel.x = Math.abs(ball.vel.x) * -1
        }
        if (ball.pos.y < 0) {
            ball.vel.y = Math.abs(ball.vel.y)
        }
        else if (ball.pos.y > gHeight) {
            ball.vel.y = Math.abs(ball.vel.y) * -1
        }

        ball.move()
    })

    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, gWidth, gHeight)
    ctx.strokeStyle = '#FFF'
    ctx.beginPath()

    balls.forEach(ball => circle(ball.pos.x, ball.pos.y, 10))
    ctx.stroke()

    requestAnimationFrame(loop)
}