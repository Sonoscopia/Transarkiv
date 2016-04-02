// cFader class
// remotely controlled circular Fader 

function cFader(x_, y_, s1_, s2_, v_) {
  this.x = x_;
  this.y = y_;
  this.size = s1_;
  this.faderSize = s2_;
  this.value = v_;
  this.angle_start = radians(90);
  this.range = radians(270);
  this.angle;

  this.color_on = color(255, 211);
  this.color_off = color(255, 111);
  this.color = this.color_on;

  this.faderOffset = [0, 0];
  this.faderColor = this.knob_color_on;
  this.strokeWeight = 3;
  this.label = '';

  this.mouseLock = false;
  this.lastMouseY = 0;


  this.display = function() {
    //fader handler
    if (this.mouseLock) {
      this.color = this.color_on;
    } else {
      this.color = this.color_off;
    }
    fill(this.color);
    ellipseMode(CORNER);
    ellipse(this.x, this.y, this.size, this.size);
    //set value
    if (this.mouseLock) {
      var mouseMove = mouseY - this.lastMouseY;
      this.value += mouseMove * -0.01;
      if (this.value > 1) {
        this.value = 1;
      } else if (this.value < 0) {
        this.value = 0;
      }
      //this.setValue(map(mouseY, this.y, this.y + this.size[1], 1, 0));
      this.lastMouseY = mouseY;
    }

    //Fader
    this.angle = this.value * this.range;
    stroke(this.color_on);
    strokeWeight(this.strokeWeight);
    noFill();
    //ellipseMode(CORNER);
    ellipseMode(CENTER);
    this.fader_x = this.x + this.faderOffset[0] + this.size / 2;
    this.fader_y = this.y + this.faderOffset[1] + this.size / 2;
    arc(this.fader_x, this.fader_y, this.faderSize, this.faderSize, this.angle_start, this.angle_start + this.angle);

    //print('value: '+this.value + ' - angulo: ' + this.angle + ' - range: ' + this.range);
  }

  this.clicked = function() {
    //print('cFader clicked !!! ');
    if (this.detectMouse(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)) {
      this.mouseLock = true;
      this.lastMouseY = mouseY;
    }
  }
  this.released = function() {
    this.mouseLock = false;
  }

  this.detectMouse = function(_x, _y, _w, _h) {
    var d = dist(mouseX, mouseY, this.x + this.size / 2, this.y + this.size / 2);
    if (d < this.size / 2) {
      return true;
    } else {
      return false;
    }
  }

  // Getters & Setters --------------------------------
  this.getValue = function() {
    return (this.value);
  }

  this.setValue = function(val_) {
    this.value = val_;
    if (this.value > 1) {
      this.value = 1;
    }
    if (this.value < 0) {
      this.value = 0;
    }
  }
  
  this.setPos = function(x_ , y_){
    this.x = x_;
    this.y = y_;
  }
  this.setFaderOffset = function(x_, y_) {
    this.faderOffset[0] = x_;
    this.faderOffset[1] = y_;
  }


  this.setLabel = function(label_) {
    this.label = label_;
  }
  this.setColor = function(r_, g_, b_, a_) {
    this.color = color(r_, g_, b_, a_);
  }
  this.setKnob_color = function(r_, g_, b_, a_) {
    this.color = color(r_, g_, b_, a_);
  }
  this.setRange = function(r_) {
    this.range = radians(r_);
  }
  this.setSize = function(s_) {
    this.sizze = s_;
  }
}