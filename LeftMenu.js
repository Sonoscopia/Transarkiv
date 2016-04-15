// (Left) Menu class
// this is where the user can add sounds by category

function LeftMenu(x_, y_, l_) { // constructor: XY top left corner and spacing
  this.x = x_;
  this.y = y_;
  this.leading = l_; // space between each category
  this.font;
  this.fontsize = 12;
  this.textColor = color(255, 255, 255, 255);
  this.buttons = []; 
  
  for(i = 0; i < category_path.length; i++){ // create 'Add' (+) buttons
    this.buttons[i] = new cHandler(this.x, this.y, 15);
    this.buttons[i].setIcon(path + 'add_icon.png');
    this.buttons[i].color_off = color(category_colors[i][0], category_colors[i][1], category_colors[i][2], category_text_alpha);
  }
  
  this.preload = function(f_){ // set font on preload (please!)
    this.font = loadFont(f_);
  }
  
  this.display = function() {
    push();
    fill(this.textColor);
    if(this.font) textFont(this.font);
    textSize(this.fontsize); // Font size
    textAlign(LEFT); // Text alignment (LEFT, CENTER, RIGHT)
    textStyle(BOLD); // Text style (NORMAL, BOLD, ITALIC)
    for(i = 0; i < category_path.length; i++){
      text(category_path[i].slice(3, category_path[i].length-1), this.x, this.y + i * this.leading);
      this.buttons[i].setPos(this.x+110, this.y + i * this.leading - this.fontsize + 5); 
      this.buttons[i].setIconOffset(0, -0.25);
      this.buttons[i].display();
    }
    pop();
  }
  
  this.clicked = function(){
    for(i = 0; i < category_path.length; i++){
      this.buttons[i].clicked();
      if(this.buttons[i].getValue() && player_count < maxPlayers){
        append(players, new Player( random(constrainPos[2]-constrainPos[0]), random(constrainPos[1], constrainPos[3]), i ) );
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