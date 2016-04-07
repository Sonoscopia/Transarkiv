

var filenames = [];
var files_count;
var path = 'sounds/';
var player_count = 4;
var players = []; //array de objetos da classe 'Player'
var vol = 1;
var masterFader, move_toggle, autoplay_toggle;
var mixRecorder; 

var waveform, spectrum, fft;
var fft;

var menuWidth = 150, footerHeight = 100;
var minWindowWidth = 640, minWindowHeight = 480;
var playAreaPos = [menuWidth, 0];


function preload() {
  fileNames(); // array filenames[] (precisa de ser iniciado em preload)
}

function setup() {
  var canvas;
  if(windowWidth > minWindowWidth && windowHeight > minWindowHeight){
    canvas = createCanvas(windowWidth, windowHeight);
  }
  else{
    canvas = createCanvas(minWindowWidth, minWindowHeight);    
  }
  canvas.parent("p5canvas");

  fft = new p5.FFT();
  //criar os players
  for (var i = 0; i < player_count; i++) {
    players[i] = new Player(i * (500 / player_count) + 100, random(100, 300)); //novo player
  }

  masterFader = new Fader(width - 60, height - 130, 30, 120, 0.8); //controlo de volume geral
  move_toggle = new Toggle(width - 150, height - 80, 20);
  move_toggle.setLabel('Move', 'Move');
  autoplay_toggle = new Toggle(width - 150, height - 50, 20);
  autoplay_toggle.setLabel('Autoplay', 'Autoplay');
  
  mixRecorder = new mixRecorder(width - 150, height - 20, 20); // TA: instantiate mixRecorder class 
  smooth(); // TA: added smooth 
}

function windowResized() {
  if(windowWidth > minWindowWidth && windowHeight > minWindowHeight){
    resizeCanvas(windowWidth, windowHeight);
  }
}


function draw() {
  background(33);
  noStroke();
  //stroke(0, 0, 255);
  //fill(0, 111);
  //rect(0, 0, playAreaPos[0], height);
  
  //TA: footer
  push();
  fill(0, 0, 255);
  rect(0, height-footerHeight, width, footerHeight); 
  //TA: menu (left)
  fill(255, 0, 0);
  rect(0, 0, menuWidth, height-footerHeight);
  //TA: mix area
  fill(0, 255, 0);
  rect(menuWidth, 0, width, height-footerHeight);
  pop();

  
  for (var i = 0; i < player_count; i++) {
    players[i].display();
    if (move_toggle.getValue()) {
      players[i].move();
    }
    if (autoplay_toggle.getValue()) {
      players[i].autoPlay();
    }
  }
  displaySpectrum();
  //displayWave();

  vol = masterFader.getValue();
  masterVolume(vol);
  masterFader.display();
  move_toggle.display();
  autoplay_toggle.display();
  
  mixRecorder.run(); // TA: display mixRecorder button and run recorder function
}

function mousePressed() {
  for (var i = 0; i < player_count; i++) {
    players[i].clicked();
  }

  masterFader.clicked();
  move_toggle.clicked();
  autoplay_toggle.clicked();
  mixRecorder.clicked(); // TA: user interaction
}

function mouseReleased() {
  masterFader.released();
  for (var i = 0; i < player_count; i++) {
    players[i].released();
  }
}

function detectMouse(_x, _y, _w, _h) {
  if (mouseX > _x && mouseX < _x + _w && mouseY > _y && mouseY < _y + _h) {
    return true;
  } else return false;
}

function displayWave() {
  var wave_size = [400, 80];
  var wave_init_x = width / 2 - wave_size[0] / 2;
  var wave_init_y = height - 100;
  var wavecolor = color(200, 255, 11);

  var waveform = fft.waveform();
  //print(waveform);
  push();
  noFill();
  beginShape();
  stroke(wavecolor);
  strokeWeight(1);
  for (var i = 0; i < waveform.length; i++) {
    var wave_x = map(i, 0, waveform.length, wave_init_x, wave_init_x + wave_size[0]);
    var wave_y = map(waveform[i], -1, 1, wave_init_y, wave_init_y + wave_size[1]);
    vertex(wave_x, wave_y);
  }
  endShape();
  pop();
}

function displaySpectrum() {
  var spectrum = fft.analyze();
  var spectrum_size = [400, 100];
  var spectrum_init_x = 300;
  var spectrum_init_y = height - 100;

  for (var i = 0; i < spectrum.length / 2; i++) {
    var spectrum_x = map(i, 0, spectrum.length / 2, 0, spectrum_size[0]);
    spectrum_x += spectrum_init_x;
    var spectrum_h = map(-spectrum[i], 0, 255, 0, spectrum_size[1]);
    spectrum_h += spectrum_init_y + spectrum_size[1];
    push();
    strokeWeight(1);
    stroke(spectrum[i]);
    line(spectrum_x, spectrum_init_y + spectrum_size[1], spectrum_x, spectrum_h);
    pop();
  }
}