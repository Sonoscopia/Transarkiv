// Slider sketch
// by p1nh0 (tiagoangelo.tk)


int posX, posY; // slider center position 
int w, h; // slider width and height
int color1 = 245; // slider color above value
int color2 = 0; // slider color below value
int color3 = 255; // handle color
int color4 = 60; // handle stroke color
int handleweight; // handle stroke size
int handlesize; // handle radius
int value; // slider value


void setup(){
  size(640, 480);
  rectMode(CENTER);
  ellipseMode(CENTER);
  
  posX = width/2;
  posY = height/2;
  w = 10;
  h = 100;
  handlesize = 16;
 
 value = 20;  
  
}

void draw(){
  background(255);
  value = constrain(height-mouseY, 0 ,h);
  println(value);
  
  //SLIDER1
  noStroke();
  fill(color1);
  rect(posX, posY, w, h+handlesize); // draw slider1 above value
  //SLIDER2 
  fill(color2);
  rect(posX, (posY-h-value)/2, w, h-value); // draw slider below value
  
  // HANDLE
  stroke(color4);
  fill(color3, 127); 
  ellipse(posX, posY+(h/2)-value, handlesize, handlesize); // handle
}
