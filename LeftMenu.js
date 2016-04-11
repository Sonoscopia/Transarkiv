// (Left) Menu class
// this is where the user can add sounds by category

function LeftMenu(x_, y_, l_) { // constructor: XY top left corner and spacing
  this.x = x_;
  this.y = y_;
  this.leading = l_; // space between each category
  this.font;
  this.fontsize = 15; 
  
  this.preload = function(f_){ // set font on preload (please!)
    this.font = loadFont(f_);
  }
  
  this.display = function() {
    push();
    fill(255);
    if(this.font) textFont(this.font);
    textSize(15); // Font size
    textAlign(LEFT); // Text alignment (LEFT, CENTER, RIGHT)
    textStyle(BOLD); // Text style (NORMAL, BOLD, ITALIC)
    for(i = 0; i < category_path.length; i++){
      text(category_path[i].slice(3, category_path[i].length-1), this.x, this.y + i * this.leading);
    }
    pop();
  }
}