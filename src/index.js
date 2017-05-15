import Game from './game/Game';

const canvas = document.getElementById( 'pong' );
const config = {};
const pong = new Game( canvas );

pong.start();
