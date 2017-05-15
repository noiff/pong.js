export default class Court {
  constructor( config ) {
    this.width = config.width;
    this.height = config.height;
    this.color = config.color;
    this.lineThickness = config.lineThickness;
    this.lineColor = config.lineColor;
  }

  draw( context ) {
    context.fillStyle = this.color;
    context.fillRect( 0, 0, this.width, this.height );
    context.fillStyle = this.lineColor;
    context.fillRect( this.width / 2 - this.lineThickness / 2, 0, this.lineThickness, this.height );
  }
}
