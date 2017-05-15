export default class Bot {
  constructor( paddle, ball ) {
    this.paddle = paddle;
    this.ball = ball;
  }

  move() {
    let ballPos = this.ball.getPosition();
    let padPos = this.paddle.getPosition();

    if ( ballPos.top < padPos.top ) {
      this.paddle.moveUp();
    } else if ( ballPos.bottom > padPos.bottom ) {
      this.paddle.moveDown();
    } else {
      this.paddle.slowDown();
    }
  }
}
