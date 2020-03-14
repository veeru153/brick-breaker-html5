export default class Ball {
    constructor(game) {
        this.img = document.getElementById("imgBall");

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

        this.position = {x: 10, y: 10};
        this.speed = {x: 4, y: 4};

        this.size = 16;
    }

    draw(ctx) {
        ctx.drawImage(imgBall, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // Left or Right Wall
        if(this.position.x > this.gameWidth-this.size || this.position.x < 0) this.speed.x = -this.speed.x;

        // Top or Bottom Wall
        if(this.position.y > this.gameHeight-this.size || this.position.y < 0) this.speed.y = -this.speed.y;

        // Collision with Paddle
        let paddle = this.game.paddle;

        let ballLeft = this.position.x;
        let ballRight = this.position.x + this.size;
        let ballBottom = this.position.y + this.size;

        let paddleTop = paddle.position.y;
        let paddleBottom = paddle.position.y+paddle.height
        let paddleLeft = paddle.position.x;
        let paddleRight = paddle.position.x + paddle.width;

        // Paddle Top
        if(ballBottom >= paddleTop && (this.position.x >= paddleLeft && this.position.x <= paddleRight)) {
            this.speed.y = -this.speed.y;
        }

        // Paddle Sides
        if(this.position.y <= paddleTop && this.position.y >= paddleBottom) {
            if(ballRight <= paddleRight || ballLeft >= paddleLeft) {
                this.speed.y = -this.speed.y;
                this.speed.x = -this.speed.x;
            }
        }
    }
}