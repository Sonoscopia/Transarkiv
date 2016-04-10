//on setup()
function categories_menu_setup(){
  var lineSpace = 50;
  cat1_button = new Toggle(90, 150 + lineSpace * 1, 20);
  cat2_button = new Toggle(90, 150 + lineSpace * 2, 20);
  cat3_button = new Toggle(90, 150 + lineSpace * 3, 20);
  cat4_button = new Toggle(90, 150 + lineSpace * 4, 20);
  cat1_button.setMode('CIRC');
  cat2_button.setMode('CIRC');
  cat3_button.setMode('CIRC');
  cat4_button.setMode('CIRC');
  
  cat1_button.setLabel('+', '+');
  cat2_button.setLabel('+', '+');
  cat3_button.setLabel('+', '+');
  cat4_button.setLabel('+', '+');
  
  cat_colors[0] = color(255, 40, 40, 200);
  cat_colors[1] = color(40, 255, 40, 200);
  cat_colors[2] = color(40, 110, 255, 200);
  cat_colors[3] = color(255, 255, 40, 200);
  
}

//on draw()
function categories_menu() {
  var lineSpace = 50;
  fill(cat_colors[0]);
  text(categories[0], 30, 160 + lineSpace * 1);
  fill(cat_colors[1]);
  text(categories[1], 30, 160 + lineSpace * 2);
  fill(cat_colors[2]);
  text(categories[2], 30, 160 + lineSpace * 3);
  fill(cat_colors[3]);
  text(categories[3], 30, 160 + lineSpace * 4);

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
