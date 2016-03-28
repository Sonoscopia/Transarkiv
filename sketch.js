var filenames = [];
var path = 'sounds/';
var player1, player2;
var vol = 1;
var masterFader;
var waveform, spectrum, fft;
var fft;


function preload() {
  fileNames(); // array filenames[] (precisa de ser iniciado em preload)
}

function setup() {
  var canvas = createCanvas(900, 400);
  canvas.parent("p5canvas");

  player1 = new Player(200, 150); //novo player
  player2 = new Player(550, 170); //novo player
  masterFader = new Fader(700, height-110, 0.8);
  fft = new p5.FFT();

}

function draw() {
  background(55);
  noStroke();
  player1.display();
  player2.display();
  displaySpectrum();
  displayWave();

  vol = masterFader.getValue();
  masterVolume(vol);
  masterFader.display();

}

function mousePressed() {
  player1.clicked();
  player2.clicked();
  masterFader.clicked();
}
function mouseReleased(){
  masterFader.released();
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

  for (var i = 0; i < spectrum.length/2; i++) {
    var spectrum_x = map(i, 0, spectrum.length/2, 0, spectrum_size[0]);
    spectrum_x += spectrum_init_x;
    var spectrum_h = map(-spectrum[i], 0, 255, 0, spectrum_size[1]);
    spectrum_h += spectrum_init_y + spectrum_size[1];
    stroke(spectrum[i]);
    line(spectrum_x, spectrum_init_y + spectrum_size[1], spectrum_x, spectrum_h);
  }
}