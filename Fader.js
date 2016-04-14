//'Fader' class

function Fader(x_, y_, w_, h_, value_) {
  this.x = x_;
  this.y = y_;
  this.size = [w_, h_];
  this.value = value_;
  this.knob_x = this.x;
  this.knob_y = this.y;
  this.knobSize = 10;
  this.mode = 'V'; // MODE = V/H (vertical/horizontal)
  this.label = '';
  this.color = color(222, 222, 222, 111);
  this.knobColor = color(222, 222, 222, 222);
  
  this.mouseLock = false;

  this.display = function() {
    push();
    noStroke();
    //background
    fill(this.color);
    rect(this.x, this.y, this.size[0], this.size[1]);
    
    //knob
    if (this.mouseLock && mouseIsPressed) {
      this.setValue();
    }
    if (this.mode === 'V'){
      if (this.detectMouse(this.x, this.y, this.size[0], this.size[1]) && mouseIsPressed) {
        this.setValue();
      }
      this.knob_y = map(this.value, 1, 0, this.y, this.y + this.size[1]-this.knobSize);
      fill(this.knobColor);
      rect(this.x, this.knob_y, this.size[0], this.knobSize);
    }
    if (this.mode === 'H'){
      if (this.detectMouse(this.x, this.y, this.size[0], this.size[1]) && mouseIsPressed) {
        this.setValue();
      }
      this.knob_x = map(this.value, 0, 1, this.x, this.x + this.size[0]-this.knobSize);
      fill(this.knobColor);
      rect(this.knob_x, this.y, this.knobSize, this.size[1]);
    }
    // text
    fill(this.color);
    textAlign(LEFT, CENTER);
    text(this.label, this.x+this.size[0]+5, this.y+this.size[1]/2);
    pop();
  }

  this.clicked = function() {
    if (this.detectMouse(this.x, this.y, this.size[0], this.size[1])) {
      this.mouseLock = true;
    }

  }
  this.released = function() {
    this.mouseLock = false;
  }

  this.getValue = function() {
    return (this.value);
  }

  this.setValue = function() {
    if (this.mode === 'V'){
      this.value = map(mouseY, this.y, this.y + this.size[1], 1, 0);
    }
    if (this.mode === 'H'){
      this.value = map(mouseX, this.x, this.x + this.size[0], 0, 1);
    }
    if (this.value > 1) {
      this.value = 1;
    }
    if (this.value < 0) {
      this.value = 0;
    }
    //println(this.value)
  }

  this.detectMouse = function(_x, _y, _w, _h) {
    if (mouseX > _x && mouseX < _x + _w && mouseY > _y && mouseY < _y + _h) {
      return true;
    } else return false;
  }

}