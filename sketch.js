/************************* VARIABLES *************************/ 
var filenames = [];
var category_path = [];
var files_count;
//var path = 'ftp://sonoscopia@ftp.sonoscopia.pt/Transarkiv/';
var path = 'http://sonoscopia.pt/wp-content/uploads/2016/04/'
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
<<<<<<< HEAD
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
  
=======
  layoutSetup();
>>>>>>> tiago

  fft = new p5.FFT();
  //criar os players
  for (var i = 0; i < player_count; i++) {
    players[i] = new Player(i * (500 / player_count) + 100, random(100, 300), int(random(4))); //novo player (x, y, categoria)
  }
  
<<<<<<< HEAD
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
=======
>>>>>>> tiago
  smooth(); // TA: added smooth 
}

/************************* RESIZE ****************************/ 
function windowResized() {
<<<<<<< HEAD
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
=======
  resizeX();
  resizeY();
>>>>>>> tiago
}

/************************* DRAW ******************************/ 
function draw() {
  // LAYOUT
  background(bkgColor);
  push();
<<<<<<< HEAD
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
=======
  noStroke();
  drawHeader();
  drawFooter();
  drawMenu();
  drawPlayArea(); 
>>>>>>> tiago
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
