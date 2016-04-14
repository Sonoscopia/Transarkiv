// GLOBAL: This file holds global variables (similar to a stylesheet) and global functions

/****************** LAYOUT VARIABLES *************************/
var canvas;
var minWindowWidth = 640, minWindowHeight = 480;
// menu
var menu; // menu object (class LeftMenu.js)
var menu_x, menu_y;
var menu_leading = 40;// text leading (pixels)
var menuWidth = 160; 
// footer & header 
var footerHeight = 60;
var headerHeight = 60;
// play area
var playAreaPos = [];
var playAreaRightMargin = 40;
// spectroscope
var spectrum_size, spectrum_init_x, spectrum_init_y;

/****************** LAYOUT COLOURS ***************************/
var bkgColor = 12;
var playAreaColor = 36;

var debugZoneByColor = false; //TA: paint zones with basic colors so that we can clearly see them when developing

/****************** LAYOUT SETUP *****************************/
function setPlayAreaPos(){
  playAreaPos = [menuWidth, headerHeight, width-menuWidth-playAreaRightMargin, height-footerHeight-headerHeight];
}
function setMenuPos(){
  menu_x = menuWidth/4;
  menu_y = playAreaPos[3] / 2;
  menu = new LeftMenu(menu_x, menu_y, menu_leading);
  menu_y = playAreaPos[3] / 2 - (menu.fontsize + menu_leading) * 4 / 2;
  if(menu_y > headerHeight)
    menu.y = menu_y;
  else
    menu.y = headerHeight+20; 
}
function layoutSetup(){
  //canvas setup
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
  
  setPlayAreaPos();
  setMenuPos();
  
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
}

/****************** RESIZE FUNCTIONS *************************/
function resizeX(){
  //TA: resize width
  if(windowWidth > minWindowWidth && windowHeight > minWindowHeight){ 
    resizeCanvas(windowWidth, height); //TA: reset canvas size
    masterFader.x = width-190; //TA: reposition masterFader 
    mixRecorder.x = masterFader.x - mixRecorder.size - 70; //TA: reposition rec button
    move_toggle.x = mixRecorder.x - move_toggle.size - 70; //TA: reposition AutoMove button
    autoplay_toggle.x = move_toggle.x - autoplay_toggle.size - 65; //TA: reposition AutoPlay button
    spectrum_size[0] = autoplay_toggle.x - 30; //TA: reposition spectroscope
    setPlayAreaPos();
    setMenuPos();
  }
}
function resizeY(){
    //TA: resize height
  if(windowHeight > minWindowHeight){
    resizeCanvas(width, windowHeight); //TA: reset canvas size
    masterFader.y = height-60; //TA: reposition masterFader
    mixRecorder.y = masterFader.y; //TA: reposition rec button
    move_toggle.y = masterFader.y; //TA: reposition AutoMove button
    autoplay_toggle.y = masterFader.y; //TA: reposition AutoPlay button
    spectrum_init_y = height - footerHeight; //TA: reposition spectroscope
    setPlayAreaPos();
    setMenuPos();
  }
  //NOTE: width & height resizing must be separated !!!
  // for example: the window might have reached the minimum width but the height might still be resized
}

/****************** DRAW FUNCTIONS ***************************/
function drawHeader(){
  push();
  fill(255);
  textSize(28); 
  text("Transarkiv", 14, 40); 
  pop();
  vol = masterFader.getValue();
  masterVolume(vol);
  masterFader.display();
  move_toggle.display();
  autoplay_toggle.display();
  
  mixRecorder.run(); // TA: display mixRecorder button and run recorder function
}
function drawFooter(){
  drawSpectrum();
  //displayWave();
}

function drawMenu(){
  menu.display();
}
function drawPlayArea(){
  fill(playAreaColor);
  rect(playAreaPos[0], playAreaPos[1], playAreaPos[2], playAreaPos[3]);
}

/****************** SPECTRUM *********************************/ 
function drawSpectrum() {
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
/****************** SCOPE ************************************/ 
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

/****************** SOUND FILES *****************************/
function fileNames() {
  category_path[0] = '01_Ambient/';
  category_path[1] = '02_Rhythmic/';
  category_path[2] = '03_Detail/';
  category_path[3] = '04_Voice/';
  
  //instantiate nested arrays
  filenames[0] = [];
  filenames[1] = [];
  filenames[2] = [];
  filenames[3] = []; 
  
  // Category #1 - Ambient
  filenames[0][0] = '0001_MagliocchiFilipeDuo.mp3';
  filenames[0][1] = '0002_RM_MV336.mp3';
  filenames[0][2] = '0003_CostaGuimaraesViegas.mp3';

  // Category #2 - Rhythmic
  filenames[1][0] = '0001_MV_3_34_GustavoC_HenriqueF_RAmado.mp3';
  filenames[1][1] = '0002_MV334_Montagem_F.mp3';
  
  // Category #3 - Detail
  filenames[2][0] = '0001_AbdulRosso_CRA.mp3';
  filenames[2][1] = '0002_TheoCeccaldi_MarceloReis_ValentinCeccaldi_LuisVicente_Improvisation1.mp3';
  
  // Category #4 - Voice
  filenames[3][0] = '0001_Frogs.mp3';
  filenames[3][1] = '0002_Frogs.mp3';
  
  //print('filenames ready');
}