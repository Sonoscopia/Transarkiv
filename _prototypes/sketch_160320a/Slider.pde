class Slider{
  int clr = 0; // color
  int posX, posY; // center position 
  int width, height; // height and width 
  int value = 0; // slider value
  
  Slider(int x, int y, int w, int h){
    posX = x;
    posY = y;
    width = w;
    height = h; 
  }
  
  void display(){
    pushStyle();
      rectMode(RADIUS);
      
      rect(posX, posY, width, height);
    popStyle();
  }
  
  void changeValue(){
  
  }
  
  void mouseDown(int x, int y){
    
  }
}
