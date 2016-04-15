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
    players[i] = new Player( (i+1) * ( (constrainPos[2]-constrainPos[0]) / player_count), random(constrainPos[1], constrainPos[3]), int(random(4))); //novo player (x, y, categoria)
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
      players[i].playFor = 10; // reset playFor value when turning AutoPlay OFF 
    }
  }
}

/************************* MOUSE UI **************************/ 
function mousePressed() {
  for (var i = 0; i < player_count; i++) {
    players[i].clicked();
  }
  
  autoplay_toggle.clicked();
  move_toggle.clicked();
  stopAll_toggle.clicked();
  mixRecorder.clicked();
  masterFader.clicked();
  
  menu.clicked();
}

function mouseReleased() {
  masterFader.released();
  for (var i = 0; i < player_count; i++) {
    players[i].released();
  }
  menu.released();
  
  if(stopAll_toggle.getValue()){
    for (var j = 0; j < player_count; j++) {
      if(players[j].sound.isPlaying()){ 
        players[j].sound.stop();
        players[j].playButton.toggle = false;
      }
    }
    stopAll_toggle.setValue(false);
  }
}

function detectMouse(_x, _y, _w, _h) {
  if (mouseX > _x && mouseX < _x + _w && mouseY > _y && mouseY < _y + _h) {
    return true;
  } else return false;
}
