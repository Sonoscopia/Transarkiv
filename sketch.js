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

<<<<<<< HEAD
var menu, menu_x, menu_y, menu_leading = 40; 
var menuWidth = 150, footerHeight = 100;
var minWindowWidth = 640, minWindowHeight = 480;
var playAreaPos;
var spectrum_size, spectrum_init_x, spectrum_init_y;

var debugZoneByColor = false; //TA: paint zones with basic colors so that we can clearly see them when developing
=======
>>>>>>> tiago
/************************* PRELOAD ***************************/ 
function preload() {
  fileNames(); // array filenames[] (precisa de ser iniciado em preload)
}

/************************* SETUP *****************************/ 
function setup() {
  var canvas;
  if(windowWidth > minWindowWidth){
    canvas = createCanvas(windowWidth, minWindowHeight);
  }
  else{
    canvas = createCanvas(minWindowWidth, minWindowHeight);
  }
  if(windowHeight > minWindowHeight){
    canvas = createCanvas(width, windowHeight);
  }
  else{
    canvas = createCanvas(width, minWindowHeight); 
  }
  canvas.parent("p5canvas");

  playAreaPos = [menuWidth, 0, width, height-footerHeight];
  

  fft = new p5.FFT();
  //criar os players
  for (var i = 0; i < player_count; i++) {
    players[i] = new Player(i * (500 / player_count) + 100, random(100, 300), int(random(4))); //novo player (x, y, categoria)
  }
  
  //TA: left menu UI
  menu_x = menuWidth/4;
  menu_y = playAreaPos[3] / 2;
  menu = new LeftMenu(menu_x, menu_y, menu_leading);
  menu_y = playAreaPos[3] / 2 - (menu.fontsize + menu_leading) * 4 / 2;
  menu.y = menu_y;
  
  //TA: footer UI (fader buttons and spectroscope)
  masterFader = new Fader(width - 190, height - 60, 150, 20, 0.8); //TA: hFader(x pos, y pos, width, height, value)
  masterFader.mode = 'H';
  mixRecorder = new mixRecorder(masterFader.x - 30 - 60, masterFader.y , 20); // TA: mixRecorder(x pos, y pos, size) 
  move_toggle = new Toggle(mixRecorder.x - 20 - 70, masterFader.y, 20); // TA: Toggle(x pos, y pos, size) 
  move_toggle.setLabel('AutoMove', 'AutoMove');
  autoplay_toggle = new Toggle(move_toggle.x - 20 - 65, masterFader.y, 20); // TA: Toggle(x pos, y pos, size) 
  autoplay_toggle.setLabel('AutoPlay', 'AutoPlay');
  spectrum_size = [autoplay_toggle.x - 30, footerHeight];
  spectrum_init_x = 5;
  spectrum_init_y = height - footerHeight;
  // NOTE: UI positions are relative to the position of the masterFader
  smooth(); // TA: added smooth 
}

/************************* RESIZE ****************************/ 
function windowResized() {
  //TA: resize width
  if(windowWidth > minWindowWidth && windowHeight > minWindowHeight){ 
    resizeCanvas(windowWidth, height); //TA: reset canvas size
    masterFader.x = width-190; //TA: reposition masterFader 
    mixRecorder.x = masterFader.x - mixRecorder.size - 70; //TA: reposition rec button
    move_toggle.x = mixRecorder.x - move_toggle.size - 70; //TA: reposition AutoMove button
    autoplay_toggle.x = move_toggle.x - autoplay_toggle.size - 65; //TA: reposition AutoPlay button
    spectrum_size[0] = autoplay_toggle.x - 30; //TA: reposition spectroscope
    playAreaPos = [menuWidth, 0, width, height-footerHeight];
    menu_x = menuWidth/4;
    menu.x = menu_x;
  }
  //TA: resize height
  if(windowHeight > minWindowHeight){
    resizeCanvas(width, windowHeight); //TA: reset canvas size
    masterFader.y = height-60; //TA: reposition masterFader
    mixRecorder.y = masterFader.y; //TA: reposition rec button
    move_toggle.y = masterFader.y; //TA: reposition AutoMove button
    autoplay_toggle.y = masterFader.y; //TA: reposition AutoPlay button
    spectrum_init_y = height - footerHeight; //TA: reposition spectroscope
    playAreaPos = [menuWidth, 0, width, height-footerHeight];
    menu_y = playAreaPos[3] / 2 - (menu.fontsize + menu_leading) * 4 / 2;
    menu.y = menu_y;
  }
  //NOTE: width & height resizing must be separated !!!
  // for example: the window might have reached the minimum width but the height might still be resized
}

/************************* DRAW ******************************/ 
function draw() {
  background(33);
  noStroke();
  //stroke(0, 0, 255);
  //fill(0, 111);
  //rect(0, 0, playAreaPos[0], height);
  
  //TA: footer
  push();
  if(debugZoneByColor)
    fill(0, 0, 255);
  else
    fill(12);
  rect(0, height-footerHeight, width, footerHeight); 
  //TA: menu (left)
  if(debugZoneByColor)
    fill(255, 0, 0);
  else
    fill(12);
  rect(0, 0, menuWidth, height-footerHeight);
  
  menu.display();

  //TA: mix area
  if(debugZoneByColor)
    fill(0, 255, 0);
  else
    fill(36);
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

/************************* SCOPE *****************************/ 
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

/************************* SPECTRUM **************************/ 
function displaySpectrum() {
  var spectrum = fft.analyze();
  
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