//'Fader' class

function Fader(x_, y_, v_) {
  this.x = x_;
  this.y = y_;
  this.size_x = 30;
  this.size_y = 100;
  
  this.value = v_;
  this.changing = 0;

  print('fader exists');
  
  this.display = function() {
    fill(111, 111, 111);
    rect(this.x, this.y, this.size_x, this.size_y);

    fill(222, 33, 33);
    rect(this.x, this.y, this.size_x, this.size_y);
  }
  
  this.clicked = function(){
    if(detectMouse(this.x, this.y, this.size_x, this.size_y)){
      this.value = map(mouseY, this.y, this.y + this.size_y, 0, 1);
      print(this.value);
    }
  }
  
  this.getValue(){
    return(this.value);
  }

}