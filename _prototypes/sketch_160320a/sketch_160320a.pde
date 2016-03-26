// Transarkiv prototype
// Web-based audio archive mixer and recorder
// by Tiago Ângelo and Rui Dias, 2016

import ddf.minim.*;

Minim minim;
CircularWaveform sample1;
Slider slider1; 
 
void setup() {
  size(640, 480);
  background(255);
  //colorMode(HSB,100,100,100,100);
  minim = new Minim(this);
  
  sample1 = new CircularWaveform();
  sample1.song = minim.loadFile("06 Beethoven_ Symphony #9 In D Minor, Op. 125, _Choral_ - 4. Chorus, Etc..wav", 1024);   
  sample1.play();

  slider1 = new Slider(width/2, height/2, 5, 80);  
  
  smooth();
}
  
void draw() {
  noStroke();
  fill(255, 5);
  rect(0,0,width,height);
  
  sample1.display();
  //slider1.display();
}

void stop() {
  
  sample1.close();
  minim.stop();
  super.stop();
   
}
