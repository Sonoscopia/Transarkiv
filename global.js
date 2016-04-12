// GLOBAL: This file holds global variables (similar to a stylesheet) and global functions

// OBJECT PROPERTIES

var menu, menu_x, menu_y, menu_leading = 40; 
var menuWidth = 150, footerHeight = 100;
var minWindowWidth = 640, minWindowHeight = 480;
var playAreaPos;
var spectrum_size, spectrum_init_x, spectrum_init_y;

var debugZoneByColor = false; //TA: paint zones with basic colors so that we can clearly see them when developing

// SOUND FILES 
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