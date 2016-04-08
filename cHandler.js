// cFader class
// remotely controlled circular Fader 

function cHandler(x_, y_, s_) {
  this.x = x_;
  this.y = y_;
  this.size = s_;
  this.value_x = 0;
  this.value_y = 0;

  this.color_on = color(255, 211);
  this.color_off = color(255, 111);
  this.color = this.color_off;

  this.label = '';

  this.mouseLock = false;
  this.lastMouseY = 0;
  this.lastMouseY = 0;


  this.display = function() {
    
    // handler
    if (this.mouseLock) {
      this.color = this.color_on;
    } else {
      this.color = this.color_off;
    }
    push();
    noStroke();
    fill(this.color);
    textAlign(LEFT, CENTER);
    text(this.label, this.x+this.size+5, this.y+this.size/2);
    
    fill(this.color);
    ellipseMode(CORNER);
    ellipse(this.x, this.y, this.size, this.size);
    //set value
    if (this.mouseLock) {
      var mouseMove_x = mouseX - this.lastMouseX;
      var mouseMove_y = mouseY - this.lastMouseY;
      this.value_x += mouseMove_x * 0.01;
      if (this.value_x > 1) {
        this.value_x = 1;
      } else if (this.value_x < 0) {
        this.value_x = 0;
      }
      
      this.value_y += mouseMove_y * -0.01;
      if (this.value_y > 1) {
        this.value_y = 1;
      } else if (this.value_y < 0) {
        this.value_y = 0;
      }
      
      //this.setValue(map(mouseY, this.y, this.y + this.size[1], 1, 0));
      this.lastMouseX = mouseX;
      this.lastMouseY = mouseY;
    }
    
    //print('value: '+this.value);
    pop();
  }

  this.clicked = function() {
    if (this.detectMouse(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)) {
      this.mouseLock = true;
      this.lastMouseX = mouseX;
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
  this.getValueX = function() {
    return (this.value_x);
  }
  this.getValueY = function() {
    return (this.value_y);
  }
  this.getValue = function(){
    return(this.mouseLock);
  }

  this.setValueX = function(val_) {
    this.value_x = val_;
    if (this.value_x > 1) {
      this.value_x = 1;
    }
    if (this.value_x < 0) {
      this.value_x = 0;
    }
  }
    this.setValueY = function(val_) {
    this.value_y = val_;
    if (this.value_y > 1) {
      this.value_y = 1;
    }
    if (this.value_y < 0) {
      this.value_y = 0;
    }
  }
  
  this.setPos = function(x_ , y_){
    this.x = x_;
    this.y = y_;
  }
  this.setSize = function(s_) {
    this.size = s_;
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

}