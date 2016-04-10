/* Range Slider class 
NOTES: 
  Ideally one would control the range slider by clicking/dragging on it. 
  For now we'll use the cHandler class to control the range slider min and max values
*/
function cRangeSlider(x_, y_, s_) {
  this.x = x_;
  this.y = y_;
  this.size = s_;
  
  this.value_min = 0.4; // range slider minimum value
  this.value_max = 0.6; // range slider maximum value
  this.value = (this.value_max - this.value_min)/2 + this.value_min; // center value
  this.minDiff = 0.005; // minimum difference betwen value_min and value_max, otherwise the range slider would become invisible

  this.range = radians(270);
  this.angle;
  this.angle_start = radians(90);
  this.angle_end = this.range - this.angle_start; 

  this.color = color(255, 211);
  this.bgcolor = color(255, 111);
  this.strokeWeight = 3;
  this.label = '';


  this.display = function() {
    push();
    noFill();
    ellipseMode(CENTER);
    strokeWeight(this.strokeWeight);
    
    // Circular (fixed) line
    stroke(0, 211);
    arc(this.x, this.y, this.size, this.size, this.angle_start, this.angle_start + this.range);

    this.angle = this.value * this.range;
    // Circular (moving) range representation 
    stroke(this.color);
    arc(this.x, this.y, this.size, this.size, this.angle_start + this.value_min*this.range, this.angle_start + this.value_max*this.range);

    pop();
  }


  // Setters --------------------------------

  /*
  this.setValue = function(v_) {
    this.value = v_;
    if (this.value > 1) {
      this.value = 1;
    } else if (this.value < 0) {
      this.value = 0;
    }
  }
  */
  
  this.setValueXY = function(x_, y_) {
    this.value = y_;
    if (this.value > 1) {
      this.value = 1;
    } else if (this.value < 0) {
      this.value = 0;
    }
    
    this.value_max = this.value + x_;
    this.value_min = this.value - x_;
    if (this.value_max > 1) {
      this.value_max = 1;
    }
    if (this.value_max < this.value + this.minDiff) {
      this.value_max = this.value + this.minDiff;
    }
    if (this.value_min < 0) {
      this.value_min = 0;
    }
    if (this.value_min > this.value - this.minDiff) {
      this.value_min = this.value - this.minDiff;
    }
  }

  this.setPos = function(x_, y_) {
    this.x = x_;
    this.y = y_;
  }
  this.setAngle = function(a_) {
    this.angle_start = radians(a_);
  }
  this.setColor = function(r_, g_, b_, a_) {
    this.color = color(r_, g_, b_, a_);
  }
  this.setBgcolor = function(r_, g_, b_, a_) {
    this.bgcolor = color(r_, g_, b_, a_);
  }
  this.setWeight = function(w_) {
    this.strokeWeight = w_;
  }
  this.setRange = function(r_) {
    this.range = radians(r_);
  }
  this.setSize = function(s_) {
    this.sizze = s_;
  }
}