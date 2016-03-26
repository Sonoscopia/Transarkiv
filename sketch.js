
var filenames = [];
var player1;
var som;
var path = 'https://github.com/Sonoscopia/Transarkiv/tree/master/sounds/';

function preload(){
  fileNames(); // array filenames[] (precisa de ser iniciado em preload)
}

function setup() {
  createCanvas(800, 400);
  
  player1 = new Player(150, 150); //novo player
  player2 = new Player(350, 170); //novo player
  //print(path);
  
}

function draw() {
  background(55);

  player1.display();
  player2.display();
  
}

function mousePressed(){
  player1.clicked();
  player2.clicked();
}
