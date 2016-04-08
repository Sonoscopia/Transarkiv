function mixRecorder(x_, y_, s_) { // TA: constructor (pos x,pos y, size, input signal)
  this.x = x_;
  this.y = y_;
  this.size = s_;

  this.isRecording = false; 
  this.inactiveColor = color(255, 102, 102); // TA: button color when not recording
  this.activeColor = color(255, 0, 0); // TA: button color when recording
  this.labelColor = color(222, 222, 222, 111); // TA: text label color
  
  this.recorder = new p5.SoundRecorder(); // TA: instantiate a sound recorder 
  this.soundFile = new p5.SoundFile(); // TA: instantiate a new sound file
  
  this.run = function() { // TA: display button
    // DISPLAY
    push();
    noStroke();
    ellipseMode(CORNER);
    if(this.isRecording){
      fill(this.activeColor);
    }
    else{
      fill(this.inactiveColor);
    }
    ellipse(this.x, this.y, this.size, this.size); // TA: rec button
    this.displayLabel(); // TA: display text label
    
    // RECORD
    if(this.isRecording){
      this.recordStart();
    }
  }
  
  this.clicked = function() { // TA: user clicked the record button
    if (this.detectMouse(this.x, this.y, this.size)) {
      if(!this.isRecording){
        this.isRecording = true;
      }
      else{
        this.recordStop();
      }
    }
    pop();
  }
  
  this.detectMouse = function(_x, _y, _s) {
    if (mouseX > _x && mouseX < _x + _s && mouseY > _y && mouseY < _y + _s) {
      return true;
    } else return false;
  }
  
  this.displayLabel = function() {
    fill(this.labelColor);
    textAlign(LEFT, CENTER);
    text('Record', this.x + this.size + 5, this.y + this.size/2);
  }
  
  this.setInput = function(_input){ // TA: connect audio signals to recording input
    // TA: if no input is given the recorder will pick audio from the master output 
    this.recorder.setInput(_input);   
  }
  
  this.recordStart = function(){ // TA: start recording  
    this.recorder.record(this.soundFile);
  }
  
  this.recordStop = function(){ // TA: stop recording and save file to disk 
    if(this.isRecording){
      this.recorder.stop();
      saveSound(this.soundFile, 'mySound.wav');
    }
    this.isRecording = false;
  }
}