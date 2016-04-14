// (Left) Menu class
// this is where the user can add sounds by category

function LeftMenu(x_, y_, l_) { // constructor: XY top left corner and spacing
  this.x = x_;
  this.y = y_;
  this.leading = l_; // space between each category
  this.font;
  this.fontsize = 12; 
  this.buttons = []; 
  
  for(i = 0; i < category_path.length; i++){ // create 'Add' (+) buttons
    this.buttons[i] = new cHandler(this.x, this.y, 15);
    this.buttons[i].setIcon('pics/add_icon.png');
  }
  
  this.preload = function(f_){ // set font on preload (please!)
    this.font = loadFont(f_);
  }
  
  this.display = function() {
    push();
    fill(255);
    if(this.font) textFont(this.font);
    textSize(this.fontsize); // Font size
    textAlign(LEFT); // Text alignment (LEFT, CENTER, RIGHT)
    textStyle(BOLD); // Text style (NORMAL, BOLD, ITALIC)
    for(i = 0; i < category_path.length; i++){
      text(category_path[i].slice(3, category_path[i].length-1), this.x, this.y + i * this.leading);
      this.buttons[i].setPos(this.x+75, this.y + i * this.leading - this.fontsize + 3); // offsetY of -12 found heuristically (note: find proper relation on future versions)
      this.buttons[i].setIconOffset(0, -0.25);
      this.buttons[i].display();
    }
    pop();
  }
  
  this.clicked = function(){
    for(i = 0; i < category_path.length; i++){
      this.buttons[i].clicked();
      if(this.buttons[i].getValue()){
        append(players, new Player(random(300, 400), random(200, 300), i));
        player_count ++;
      }
    }
  }
  this.released = function(){
    for(i = 0; i < category_path.length; i++){
     this.buttons[i].released();
    }
  }
}