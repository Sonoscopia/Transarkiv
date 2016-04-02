// cFader class
// remotely controlled circular Fader 

function cLevel(x_, y_, s_) {
  this.x = x_;
  this.y = y_;
  this.size = s_;
  this.value = 1;
  this.angle_start = radians(90);
  this.range = radians(270);
  this.angle;

  this.color = color(255, 211);
  this.bgcolor = color(255, 111);
  this.strokeWeight = 3;
  this.label = '';


  this.display = function() {
    noFill();
    ellipseMode(CENTER);
    strokeWeight(this.strokeWeight);
    stroke(0, 211);
    arc(this.x, this.y, this.size, this.size, this.angle_start, this.angle_start + this.range);
    
    if (this.value > 1) {
      this.value = 1;
    } else if (this.value < 0) {
      this.value = 0;
    }
    this.angle = this.value * this.range;
    stroke(this.color);
    
    arc(this.x, this.y, this.size, this.size, this.angle_start, this.angle_start + this.angle);

    //print('value: '+this.value + ' - angulo: ' + this.angle + ' - range: ' + this.range);
  }


  // Setters --------------------------------

  this.setValue = function(v_) {
    this.value = v_;
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