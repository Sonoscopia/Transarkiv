//Toggle class

function Toggle(x_, y_, s_) {
  this.x = x_;
  this.y = y_;
  this.size = s_;
  this.color_On = color(222, 222, 222, 222);
  this.color_Off = color(222, 222, 222, 111);
  this.color = this.color_Off;
  this.on = false;
  this.mode = 'RECT';
  this.label_on = '';
  this.label_off = '';
  this.label = this.label_off;

  this.display = function() {
    push();

    //noStroke();
    if (this.on) {
      this.color = this.color_On;
      this.displayLabel(true);
    } else {
      this.color = this.color_Off;
      this.displayLabel(false);
    }
    
    fill(this.color);

    if (this.mode === 'RECT') {
      rect(this.x, this.y, this.size, this.size);
    } else if (this.mode === 'CIRC') {
      ellipseMode(CORNER);
      ellipse(this.x, this.y, this.size, this.size);
      ellipseMode(CENTER);
    }
    pop();
  }

  this.clicked = function() {
    var click = this.detectMouse(this.x, this.y, this.size, this.size);
    if (click) {
      if (this.on) {
        this.on = false;
      } else {
        this.on = true;
      }
    }
  }

  this.detectMouse = function(_x, _y, _w, _h) {
    if (this.mode === 'RECT') {
      if (mouseX > _x && mouseX < _x + _w && mouseY > _y && mouseY < _y + _h) {
        return true;
      } else return false;
    } else if (this.mode === 'CIRC') {
      var d = dist(mouseX, mouseY, this.x + this.size / 2, this.y + this.size / 2);
      if (d < this.size / 2) {
        return true;
      } else return false;
    }
  }
  this.displayLabel = function(status_) {
    if (status_) {
      this.label = this.label_on;
    } else {
      this.label = this.label_off;
    }
    fill(this.color);
    textAlign(LEFT, CENTER);
    text(this.label, this.x + this.size + 5, this.y + this.size/2);
  }

  // Getters & Setters //////////////////////
  this.getValue = function() {
    return this.on;
  }

  this.setPos = function(x_, y_) {
    this.x = x_;
    this.y = y_;
  }
  this.setSize = function(s_) {
    this.size = s_;
  }
  this.setColor_on = function(r_, g_, b_, a_) {
    this.color_on = color(r_, g_, b_, a_);
  }
  this.setColor_off = function(r_, g_, b_, a_) {
    this.color_off = color(r_, g_, b_, a_);
  }
  this.setMode = function(m_) {
    this.mode = m_;
  }
  this.setLabel = function(label_on_, label_off_) {
    this.label_on = label_on_;
    this.label_off = label_off_;
  }
}