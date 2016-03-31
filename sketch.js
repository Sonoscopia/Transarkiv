var filenames = [];
var files_count;

var path = 'sounds/';

var player_count = 5;
var players = []; //array de objetos da classe 'Player'
var vol = 1;
var masterFader;
var waveform, spectrum, fft;
var fft;
var tog;

function preload() {
  fileNames(); // array filenames[] (precisa de ser iniciado em preload)
}

function setup() {
  var canvas = createCanvas(800, 500);
  canvas.parent("p5canvas");

  fft = new p5.FFT();
  //criar os players
  for (var i = 0; i < player_count; i++) {
    players[i] = new Player(i*(width/player_count)+50, random(height-200)+100); //novo player
  }

  masterFader = new Fader(width - 60, height - 130, 30, 120, 0.8); //controlo de volume geral

  tog = new Toggle(200, 200);
}

function draw() {
  background(33);
  noStroke();

  for (var i = 0; i < player_count; i++) {
    players[i].display();
    players[i].move();
    players[i].autoPlay();
  }
  displaySpectrum();
  displayWave();

  vol = masterFader.getValue();
  masterVolume(vol);
  masterFader.display();
  tog.display();
  
  
}

function mousePressed() {
  for (var i = 0; i < player_count; i++) {
    players[i].clicked();
  }

  masterFader.clicked();
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
}

function displaySpectrum() {
  var spectrum = fft.analyze();
  var spectrum_size = [400, 100];
  var spectrum_init_x = width / 2 - spectrum_size[0] / 2;
  var spectrum_init_y = height - 100;

  for (var i = 0; i < spectrum.length / 2; i++) {
    var spectrum_x = map(i, 0, spectrum.length / 2, 0, spectrum_size[0]);
    spectrum_x += spectrum_init_x;
    var spectrum_h = map(-spectrum[i], 0, 255, 0, spectrum_size[1]);
    spectrum_h += spectrum_init_y + spectrum_size[1];
    strokeWeight(1);
    stroke(spectrum[i]);
    line(spectrum_x, spectrum_init_y + spectrum_size[1], spectrum_x, spectrum_h);
  }
}