var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var  players, player1, player2, player3, player4, hurdles, hurdle1, hurdle2, hurdle3, hurdle4;

var track, ground; 
var player1_img, player2_img, player3_img, player4_img;
var hurdle_img;

function preload(){
track = loadImage("images/track.jpg");
ground = loadImage("images/ground.png");

player1_img = loadImage("images/player1.png");
player2_img = loadImage("images/player2.png");
player3_img = loadImage("images/player3.png");
player4_img = loadImage("images/player4.png");

hurdle_img = loadImage("images/Hurdle.png");
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
