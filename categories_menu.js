//on setup()
function categories_menu_setup(){
  
  cat1_button = new Toggle(menuPos[0] + 90, menuPos[1] + menuLineSpace * 1 - 10, 20);
  cat2_button = new Toggle(menuPos[0] + 90, menuPos[1] + menuLineSpace * 2 - 10, 20);
  cat3_button = new Toggle(menuPos[0] + 90, menuPos[1] + menuLineSpace * 3 - 10, 20);
  cat4_button = new Toggle(menuPos[0] + 90, menuPos[1] + menuLineSpace * 4 - 10, 20);
  cat1_button.setMode('CIRC');
  cat2_button.setMode('CIRC');
  cat3_button.setMode('CIRC');
  cat4_button.setMode('CIRC');
  
  cat1_button.setLabel('+', '+');
  cat2_button.setLabel('+', '+');
  cat3_button.setLabel('+', '+');
  cat4_button.setLabel('+', '+');
  
  cat1_button.setLabelPos(6, 10);
  cat2_button.setLabelPos(6, 10);
  cat3_button.setLabelPos(6, 10);
  cat4_button.setLabelPos(6, 10);
  
  cat1_button.setLabelColor(255, 255);
  cat2_button.setLabelColor(255, 255);
  cat3_button.setLabelColor(255, 255);
  cat4_button.setLabelColor(255, 255);
  
  cat_colors[0] = color(255, 40, 40, 200);
  cat_colors[1] = color(40, 255, 40, 200);
  cat_colors[2] = color(40, 110, 255, 200);
  cat_colors[3] = color(255, 255, 40, 200);
  
}

//on draw()
function categories_menu() {
  push();
  textFont("Futura");
  textSize(18);
  textAlign(LEFT, CENTER);
  fill(cat_colors[0]);
  text(categories[0], menuPos[0], menuPos[1] + menuLineSpace * 1);
  fill(cat_colors[1]);
  text(categories[1], menuPos[0], menuPos[1] + menuLineSpace * 2);
  fill(cat_colors[2]);
  text(categories[2], menuPos[0], menuPos[1] + menuLineSpace * 3);
  fill(cat_colors[3]);
  text(categories[3], menuPos[0], menuPos[1] + menuLineSpace * 4);
  
  pop();
  cat1_button.display();
  cat2_button.display();
  cat3_button.display();
  cat4_button.display();
}



// on click
function categories_menu_clicked(){
  cat1_button.clicked();
  if(cat1_button.getValue()){
    createNewPlayer(0); //novo player);
    player_count ++;
    cat1_button.setValue(false);
  }
  
  cat2_button.clicked();
  if(cat2_button.getValue()){
    createNewPlayer(1); //novo player);
    player_count ++;
    cat2_button.setValue(false);
  }
  cat3_button.clicked();
  if(cat3_button.getValue()){
    createNewPlayer(2); //novo player);
    player_count ++;
    cat3_button.setValue(false);
  }
  cat4_button.clicked();
  if(cat4_button.getValue()){
    createNewPlayer(3); //novo player);
    player_count ++;
    cat4_button.setValue(false);
  }
}

function createNewPlayer(cat_){
  append(players, new Player(random(300, 400), random(200, 300), cat_ ));
}
