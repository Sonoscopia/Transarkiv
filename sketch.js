/************************* VARIABLES *************************/ 
var filenames = [];
var category_path = [];
var files_count;
var path = 'sounds/';
var player_count = 4;
var players = []; //array de objetos da classe 'Player'
var vol = 1;
var masterFader, move_toggle, autoplay_toggle;
var mixRecorder;
var waveform, spectrum, fft;
var fft;

/************************* PRELOAD ***************************/ 
function preload() {
  fileNames(); // array filenames[] (precisa de ser iniciado em preload)
}

/************************* SETUP *****************************/ 
function setup() {
  layoutSetup();

  fft = new p5.FFT();
  //criar os players
  for (var i = 0; i < player_count; i++) {
    players[i] = new Player(i * (500 / player_count) + 100, random(100, 300), int(random(4))); //novo player (x, y, categoria)
  }
  
  smooth(); // TA: added smooth 
}

/************************* RESIZE ****************************/ 
function windowResized() {
  resizeX();
  resizeY();
}

/************************* DRAW ******************************/ 
function draw() {
  // LAYOUT
  background(bkgColor);
  push();
  noStroke();
  drawHeader();
  drawFooter();
  drawMenu();
  drawPlayArea(); 
  pop();

  // PLAYERS
  for (var i = 0; i < player_count; i++) {
    players[i].display();
    if (move_toggle.getValue()) {
      players[i].move();
    }
    if (autoplay_toggle.getValue()) {
      players[i].autoPlay();
    }
    else{
      players[i].playFor = 10; 
    }
  }
}

/************************* MOUSE UI **************************/ 
function mousePressed() {
  for (var i = 0; i < player_count; i++) {
    players[i].clicked();
  }

  masterFader.clicked();
  move_toggle.clicked();
  autoplay_toggle.clicked();
  mixRecorder.clicked(); // TA: user interaction
  menu.clicked();
}

function mouseReleased() {
  masterFader.released();
  for (var i = 0; i < player_count; i++) {
    players[i].released();
  }
  menu.released();
}

function detectMouse(_x, _y, _w, _h) {
  if (mouseX > _x && mouseX < _x + _w && mouseY > _y && mouseY < _y + _h) {
    return true;
  } else return false;
}
