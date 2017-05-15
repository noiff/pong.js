import defaultConfig from './defaultConfig';

import Court from '../court/Court';
import Paddle from '../paddle/Paddle';
import Ball from '../ball/Ball';
import Bot from '../bot/Bot';

export default class Game {
  constructor( canvas, config ) {
    if ( !canvas || !(canvas instanceof HTMLElement) || canvas.nodeName !== 'CANVAS' ) {
      throw new TypeError( 'first argument must be a html canvas element' );
    }

    if ( config && !(config instanceof Object) ) {
      console.warn( 'config must be an object, used default configuration' );
    }

    this.canvas = canvas;
    this.canvasContext = canvas.getContext( '2d' );
    this.config = config ? Object.assign( defaultConfig, config ) : defaultConfig;

    this.canvas.width = this.config.court.width;
    this.canvas.height = this.config.court.height;

    this.keyUpPressed = false;
    this.keyDownPressed = false;
    this.bindEvents();

    this.court = new Court( this.config.court );

    this.paddleLeft = new Paddle( {
      width: this.config.paddle.width,
      height: this.config.paddle.height,
      color: this.config.paddle.color,
      posX: 0,
      posY: this.config.court.height / 2,
      minY: 0,
      maxY: this.config.court.height,
      maxSpeed: this.config.paddle.maxSpeed
    } );

    this.paddleRight = new Paddle( {
      width: this.config.paddle.width,
      height: this.config.paddle.height,
      color: this.config.paddle.color,
      posX: this.config.court.width - this.config.paddle.width,
      posY: this.config.court.height / 2,
      minY: 0,
      maxY: this.config.court.height,
      maxSpeed: this.config.paddle.maxSpeed
    } );

    this.ball = new Ball( {
      color: this.config.ball.color,
      size: this.config.ball.size,
      initialSpeed: this.config.ball.initialSpeed,
      maxSpeed: this.config.ball.maxSpeed,
      startPosX: this.config.court.width / 2,
      startPosY: this.config.court.height / 2,
      minY: 0,
      maxY: this.config.court.height
    } );

    this.bot = new Bot( this.paddleRight, this.ball );
  }

  bindEvents() {
    window.addEventListener( 'keydown', ( event ) => {
      if ( event.keyCode === 38 ) this.keyUpPressed = true;
      if ( event.keyCode === 40 ) this.keyDownPressed = true;
    } );

    window.addEventListener( 'keyup', ( event ) => {
      if ( event.keyCode === 38 ) this.keyUpPressed = false;
      if ( event.keyCode === 40 ) this.keyDownPressed = false;
    } );
  }

  draw() {
    let leftPadPos = this.paddleLeft.getPosition();
    let rightPadPos = this.paddleRight.getPosition();
    let ballPos = this.ball.getPosition();

    if ( ballPos.left <= leftPadPos.right && ballPos.top < leftPadPos.bottom && ballPos.bottom > leftPadPos.top ) {
      this.ball.bounce();
    } else if ( ballPos.right >= rightPadPos.left && ballPos.top < rightPadPos.bottom && ballPos.bottom > rightPadPos.top ) {
      this.ball.bounce();
    } else if ( ballPos.right < 0 || ballPos.left > this.config.court.width ) {
      this.ball.reset();
    }

    if ( this.keyUpPressed ) this.paddleLeft.moveUp();
    if ( this.keyDownPressed ) this.paddleLeft.moveDown();
    if ( !this.keyUpPressed && !this.keyDownPressed ) this.paddleLeft.slowDown();

    this.bot.move();

    this.court.draw( this.canvasContext );
    this.paddleLeft.draw( this.canvasContext );
    this.paddleRight.draw( this.canvasContext );
    this.ball.draw( this.canvasContext );
  }

  start() {
    setInterval( this.draw.bind( this ), 1000/30 );
  }
};
