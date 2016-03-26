// 'Player' class

function Player(x_, y_) {
  this.x = x_;
  this.y = y_;
  this.size = 80;
  this.playing = false; //
  this.loaded = false;

  this.color_stopped = color(200, 199, 199, 111);
  this.color_loading = color(222, 211, 55, 222);
  this.color_playing = color(111, 211, 55, 222);
  //botão next random file
  this.next_x = this.x + this.size / 2;
  this.next_y = this.y + this.size / 2;
  this.next_size = 20;
  //sinal loading
  this.loading_x = this.x - this.size/2;
  this.loading_y = this.y - this.size/2;

  this.fileNumber = 0;
  this.fileName = filenames[this.fileNumber];
  //carregar o som - -  aqui devia dar para utilizar uma função callback para mostrar quando está a carregar
  this.sound = loadSound('sounds/'+ filenames[this.fileNumber]);

  println('Player ready');

  this.display = function() {
    //botão next random file
    fill(222, 222, 222);
    ellipse(this.x + this.size / 2, this.y + this.size / 2, this.next_size, this.next_size);
    
    //botão principal
    if (this.playing) {
      fill(this.color_playing);
    } else {
      fill(this.color_stopped);
    }
    ellipse(this.x, this.y, this.size, this.size);
    
    //nome do ficheiro
    fill(166, 166, 166);
    text(this.fileName, this.x + this.size/2 + 15, this.y + this.size/2+ 5);
    //print('-- isLoaded: '+ this.sound.isLoaded + ' - - - ');
    this.loaded = this.sound.isLoaded;
    
    //sinal loading
    if (this.loaded) {
      fill(33, 255, 55, 155);
      ellipse(20, 20, 20, 20);
    } else {
      fill(255);
      ellipse(this.loading_x, this.loading_y, 20, 20);
    }
    
  }


  this.clicked = function() {
    //detetar clique no botão principal
    var d = int(dist(this.x, this.y, mouseX, mouseY));
    if (d < this.size / 2) {
      if (this.playing) {
        this.playing = false;
        this.sound.stop();
      } else {
        this.playing = true;
        this.sound.play();
      }
    }
    
    //detetar clique no botão next random
    d = int(dist(this.next_x, this.next_y, mouseX, mouseY));
    if (d < this.next_size) {
      this.selectRandom();
    }

  }

  this.selectRandom = function() {
    this.loaded = false;
    this.fileNumber = int(random(filenames.length));
    this.fileName = filenames[this.fileNumber];
    this.sound = loadSound(path + filenames[this.fileNumber]);
    
    print(this.fileNumber +': ' + filenames[this.fileNumber]);
    //print(this.loaded);
  }


}