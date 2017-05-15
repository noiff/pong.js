export default class Paddle {
  constructor( config ) {
    this.width = config.width;
    this.height = config.height;
    this.posX = config.posX;
    this.posY = config.posY - config.height / 2;
    this.minY = config.minY;
    this.maxY = config.maxY;
    this.maxSpeed = config.maxSpeed;
    this.color = config.color;
    this.currentSpeed = 0;
  }

  draw( context ) {
    if ( ( this.posY === this.minY && this.currentSpeed < 0 ) || ( this.posY + this.height === this.maxY && this.currentSpeed > 0 ) ) {
      this.currentSpeed = - Math.floor( this.currentSpeed * 0.7 );
      this.posY = this.posY + this.currentSpeed;
    } else if ( this.posY + this.currentSpeed < this.minY ) {
      this.posY = this.minY;
    } else if ( this.posY + this.height + this.currentSpeed > this.maxY ) {
      this.posY = this.maxY - this.height;
    } else {
      this.posY = this.posY + this.currentSpeed;
    }

    context.fillStyle = this.color;
    context.fillRect( this.posX, this.posY, this.width, this.height );
  }

  getPosition() {
    return { left: this.posX, right: this.posX + this.width, top: this.posY, bottom: this.posY + this.height };
  }

  moveDown() {
    if ( this.posY !== this.maxY ) {
      this.currentSpeed = this.currentSpeed <= this.maxSpeed ? this.currentSpeed + 2 : this.currentSpeed;
    }
  }

  moveUp() {
    if ( this.posY !== this.minY ) {
      this.currentSpeed = this.currentSpeed >= -this.maxSpeed ? this.currentSpeed - 2 : this.currentSpeed;
    }
  }

  slowDown() {
    if ( this.currentSpeed < 0 ) {
      this.currentSpeed = this.currentSpeed + 2 > 0 ? 0 : this.currentSpeed + 2;
    } else if ( this.currentSpeed > 0 ) {
      this.currentSpeed = this.currentSpeed - 2 < 0 ? 0 : this.currentSpeed - 2;
    }
  }
}
