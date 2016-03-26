// Original sketch by Alex York (http://www.openprocessing.org/sketch/8846)
// Modified by p1nh0 (tiagoangelo.tk)

class CircularWaveform{
  AudioPlayer song;
  int color1 = 22;
  int color2 = 0;
  int var1 = 100; 
  int var2 = 100;
  
  
  
  
  
  
  
  
  // CONSTRUCTOR
  CircularWaveform(String file, int bufsize){
    
    //song = minim.loadFile(file, bufsize);
  }
  //..default buffer size = 1024
 CircularWaveform(String file){
   //song = minim.loadFile(file, 1024);
 }
 CircularWaveform(){
   //song = minim.loadFile(file, 1024);
 } 
 
 void display(){
  pushMatrix();
  translate(width/2, height/2);
  rotate(radians(frameCount % 360 * 2));
    for(int j = 0; j < 360; j++) {
       
      if(song.mix.get(j)*var2 > var1) {
        stroke(color1, color1, color1);
      }
      else {
        stroke(color1,color1,color1);
      }
       
      line(cos(j)*var1, sin(j)*var1, cos(j)*abs(song.left.get(j))*var2 + cos(j)*var1, sin(j)*abs(song.right.get(j))*var2 + sin(j)*var1);
    }
    for(int k = 360; k > 0; k--) {
       
       
      if(sample1.song.mix.get(k)*var2 > var1/2.f) {
        stroke(color2,color2,color2);
      }
      else {
        stroke(color2,color2,color2);
      }
       
       
      line(cos(k)*var1, sin(k)*var1, cos(k)*abs(song.right.get(k))*var2 + cos(k)*var1, sin(k)*abs(song.left.get(k))*var2 + sin(k)*var1);  
    }
   
  popMatrix();
  }
  
  void play(){
    song.play();   
  }
  void pause(){
    song.pause();
  }
  void close(){
    song.close();
    
  }
}
