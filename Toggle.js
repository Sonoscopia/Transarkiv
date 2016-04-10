//===============================================================================
// Toggle Class
//===============================================================================

function Toggle(x_, y_, s_) {
  this.x = x_;
  this.y = y_;
  this.size = s_;
  this.color_on = color(222, 222, 222, 222);
  this.color_off = color(222, 222, 222, 111);
  this.color_hover = color(222, 222, 222, 190);
  this.color = this.color_off;
  this.on = false;
  this.hover = false;
  this.mode = 'RECT';
  this.labelOffset = [this.size + 5, this.size / 2];
  this.label_on = '';
  this.label_off = '';
  this.label = this.label_off;
  this.icon;
  this.icon_x = 0; //icon position offset
  this.icon_y = 0;

  this.display = function() {
    //noStroke();
    if (this.on) {
      this.color = this.color_on;
      this.displayLabel(true);
    } else {
      if (this.hover) {
        this.color = this.color_hover;
      } else {
        this.color = this.color_off;
        this.displayLabel(false);
      }
    }
    push();
    fill(this.color);

    if (this.mode === 'RECT') {
      rect(this.x, this.y, this.size, this.size);
    } else if (this.mode === 'CIRC') {
      ellipseMode(CORNER);
      ellipse(this.x, this.y, this.size, this.size);
    }
    if (this.icon) { // draw button icon
      image(this.icon, this.x + this.icon_x, this.y + this.icon_y);
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
    //detect mouse hover
  this.hover_dist = int(dist(this.x, this.y, mouseX, mouseY));
  if (this.hover_dist < this.size / 2) {
    this.hover = true;
  } else {
    this.hover = false;
  }

  this.displayLabel = function(status_) {
    if (status_) {
      this.label = this.label_on;
    } else {
      this.label = this.label_off;
    }
    push();
    fill(this.color);
    textAlign(LEFT, CENTER);
    text(this.label, this.x + this.labelOffset[0], this.y + this.labelOffset[1]);
    pop();
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
  this.setcolor_off = function(r_, g_, b_, a_) {
    this.color_on = color(r_, g_, b_, a_);
  }
  this.setcolor_off = function(r_, g_, b_, a_) {
    this.color_off = color(r_, g_, b_, a_);
  }
  this.setMode = function(m_) {
    this.mode = m_;
  }
  this.setLabel = function(label_on_, label_off_) {
    this.label_on = label_on_;
    this.label_off = label_off_;
  }
  this.setLabelPos = function(x_, y_) {
    this.labelOffset = [x_, y_];
  }
  this.setLabelColor = function(r_, g_, b_, a_) {
    this.labelColor = color(r_, g_, b_, a_);
  }
  this.setIcon = function(file_) { // set image at this.x & this.y
    this.icon = loadImage(file_);
  }
  this.setIconOffset = function(x_, y_) { // set image plus XY offset
    this.icon_x = x_;
    this.icon_y = y_;

  }
}