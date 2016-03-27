
var filenames = [];
var player1, player2;
var som;
var vol = 1;
var masterFader;
var waveform, spectrum, fft;
var fft;
var path = 'sounds/';

function preload(){
  fileNames(); // array filenames[] (precisa de ser iniciado em preload)
}

function setup() {
  var canvas = createCanvas(900, 400);
  canvas.parent(p5canvas);
  
  player1 = new Player(150, 150); //novo player
  player2 = new Player(350, 170); //novo player
  //masterFader = new Fader(200, 200, 1);
  fft = new p5.FFT();
  
}

function draw() {
  background(55);

  player1.display();
  player2.display();
  displaySpectrum();
  displayWave();
  //masterFader.display();
  
  //vol = masterFader.getValue();
  //masterVolume(vol);
  
}

function mousePressed(){
  player1.clicked();
  player2.clicked();
}

function detectMouse(_x, _y, _w, _h) {
    if (mouseX > _x && mouseX < _x + _w && mouseY > _y && mouseY < _y + _h) {
      return true;
    } else return false;
  }

function displayWave() {
  wave_size = [400, 80];
    wave_init_x = width/2-wave_size[0]/2;
    wave_init_y = height-100;
    
    
    wavecolor = color(200, 255, 11);
    
    waveform = fft.waveform();
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
    spectrum = fft.analyze();
    spectrum_size = [400, 100];
    spectrum_init_x = width/2-spectrum_size[0]/2;
    spectrum_init_y = height-100;
    
    
    for (var i = 0; i < spectrum.length; i++) {
      var spectrum_x = map(i, 0, spectrum.length, 0, spectrum_size[0]+100);
      spectrum_x += spectrum_init_x;
      var spectrum_h = map(-spectrum[i], 0, 255, 0, spectrum_size[1]);
      spectrum_h += spectrum_init_y + spectrum_size[1];
      stroke(spectrum[i]);
      line(spectrum_x, spectrum_init_y + spectrum_size[1], spectrum_x, spectrum_h);

    }
  }