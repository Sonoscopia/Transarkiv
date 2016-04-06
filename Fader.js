//'Fader' class

function Fader(x_, y_, w_, h_, value_) {
  this.x = x_;
  this.y = y_;
  this.size = [w_, h_];
  this.value = value_;
  this.knob_x = this.x;
  this.knob_y = this.y;
  this.knobSize = 10;

  this.mouseLock = false;

  this.display = function() {
    noStroke();
    //background
    fill(222, 222, 222, 111);
    rect(this.x, this.y, this.size[0], this.size[1]);
    
    //knob
    if (this.mouseLock && mouseIsPressed) {
      this.setValue();
    }
    if (this.detectMouse(this.x, this.y, this.size[0], this.size[1]) && mouseIsPressed) {
      this.setValue();
    }
    this.knob_y = map(this.value, 1, 0, this.y, this.y + this.size[1]-this.knobSize);
    fill(222, 222, 222, 222);
    rect(this.x, this.knob_y, this.size[0], this.knobSize);

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
    this.value = map(mouseY, this.y, this.y + this.size[1], 1, 0);
    if (this.value > 1) {
      this.value = 1;
    }
    if (this.value < 0) {
      this.value = 0;
    }
  }

  this.detectMouse = function(_x, _y, _w, _h) {
    if (mouseX > _x && mouseX < _x + _w && mouseY > _y && mouseY < _y + _h) {
      return true;
    } else return false;
  }

}