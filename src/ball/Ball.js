export default class Ball {
  constructor( config ) {
    this.color = config.color;
    this.size = config.size;
    this.initialSpeed = config.initialSpeed;
    this.startDirection = 1;
    this.speedX = this.startDirection * this.initialSpeed;
    this.speedY = this.startDirection * this.initialSpeed;
    this.maxSpeed = config.maxSpeed;
    this.startPosX = config.startPosX;
    this.startPosY = config.startPosY;
    this.posX = this.startPosX - this.size / 2;
    this.posY = this.startPosY - this.size / 2;
    this.minY = config.minY;
    this.maxY = config.maxY;
  }

  draw( context ) {
    context.fillStyle = this.color;
    context.fillRect( this.posX, this.posY, this.size, this.size );
    this.posX += this.speedX;

    if ( this.posY === this.minY || this.posY + this.size === this.maxY ) {
      this.speedY = -this.speedY;
      this.posY += this.speedY;
    } else if ( this.speedY < 0 && this.posY + this.speedY < this.minY ) {
      this.posY = this.minY;
    } else if ( this.speedY > 0 && this.posY + this.size + this.speedY > this.maxY ) {
      this.posY = this.maxY - this.size;
    } else {
      this.posY += this.speedY;
    }
  }

  getPosition() {
    return { left: this.posX, right: this.posX + this.size, top: this.posY, bottom: this.posY + this.size };
  }

  bounce() {
    this.speedX = -this.speedX;
  }

  reset() {
    this.posX = this.startPosX - this.size / 2;
    this.posY = this.startPosY - this.size / 2;
    this.startDirection = -this.startDirection;
    this.speedX = this.startDirection * this.initialSpeed;
    this.speedY = this.startDirection * this.initialSpeed;
  }
};
