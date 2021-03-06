// 'Player' class

function Player(x_, y_, c_) {
  this.x = playAreaPos[0] + x_;
  this.y = y_;
  this.category = c_; 
  this.size = playerSize;
  this.speed = [random(-0.2, 0.2), random(-0.2, 0.2)];
  this.time = 0;
  this.lapse = 50; //5 seconds
  this.autoPlay_toggle = false;
  this.mouseLock = false;
  this.hover = false;
  this.loop = true; // by default loop is ON
  this.pan, this.vol; 

  this.color_stopped = color(200, 111);
  this.color_hover = color(222, 222);
  this.color_loading = color(33, 33, 33, 222);
  this.color_playing = color(233, 133);
  this.color_transport = color(255, 155);

  // botão Play
  this.playButtonOffset = [this.size / 2 + 10, - 15 / 2]; // 15 = this.button.size
  this.playButton = new cHandler(this.x + this.playButtonOffset[0],this.y + this.playButtonOffset[1], 15);
  //this.playButton.setLabel('play', 'stop');
  this.playButton.setIconOff(path+'play_icon.png');
  this.playButton.setIconOn(path+'stop_icon.png');
  this.playButton.setIconOffOffset(2, 2);
  this.playButton.setIconOnOffset(1.5, 1.5);

  // botão Delete
  this.deleteButtonOffset = [this.size / 2 + 3, - this.size / 2 - 6];
  this.deleteButton = new cHandler(this.x + this.deleteButtonOffset[0], this.y + this.deleteButtonOffset[1], 15);
  //this.deleteButton.setLabel('delete', 'delete');
  this.deleteButton.setIcon(path+'delete_icon.png');
  this.deleteButton.setIconOffset(0.6, 1.1);

  //botão Filter
  this.filterControlOffset = [this.size / 2 + 3, this.size / 2 - 10];
  this.filterControl = new cHandler(this.x + this.filterControlOffset[0], this.y + this.filterControlOffset[1], 15);
  this.filterControl.setValueY(random(0,1));
  this.filterControl.setValueX(random(0,1));
  //this.filterControl.setLabel('filter');
  this.filterControl.setIcon(path+'filter_icon.png');
  this.filterControl.setIconOffset(-1.5, 1.5);
  // filter circular fader
  this.filterIndicator = new cRangeSlider(this.x - this.size, this.y, this.size + 30);
  this.filterIndicator.setRange(90);
  this.filterIndicator.setAngle(135);
  
  //sinal loading
  this.loading_x = this.x - this.size / 2;
  this.loading_y = this.y - this.size / 2;

  // filters
  this.hpFilter = new p5.HighPass();
  this.lpFilter = new p5.LowPass();
  // sampler
  this.fileNumber = int(random(filenames[this.category].length));
  this.fileName = filenames[this.category][this.fileNumber];
  //carregar o som - -  aqui devia dar para utilizar uma função callback para mostrar quando está a carregar
  this.sound = loadSound(path + filenames[this.category][this.fileNumber]);

  if (this.sound.isLoaded()) {
    print('sound is Loaded!!!!!!');
  }
  this.sound.disconnect();
  this.lpFilter.disconnect();
  this.lpFilter.connect(this.hpFilter);
  this.sound.connect(this.lpFilter);
  this.lpFilter.res(10);
  this.hpFilter.res(10);
  //this.sound.start();
  this.amp = new p5.Amplitude();
  this.amp.setInput(this.sound);
  this.level = 0;
  this.loading_x = this.x - this.size / 2;
  this.loading_y = this.y - this.size / 2;
  this.currentTime = 0;
  this.ct = 0;

  this.playFor = int(random(10, this.sound.duration() * 10));
  //int(random(10, this.sound.duration()) * 0.01); // With Autoplay, play this file for how long (milliseconds)


  this.display = function() {
    push();
    this.time = int(millis() * 0.01);
    if (this.time > 30) {
      this.autoPlay_toggle = true
    }

    if (this.mouseLock) {
      //Constrain movement to playAreaPos
      this.x = constrain(mouseX - 5, constrainPos[0], constrainPos[2]);
      this.y = constrain(mouseY - 20, constrainPos[1], constrainPos[3]);

    }
    //detect mouse hover
    this.h_dist = int(dist(this.x, this.y, mouseX, mouseY));
    if (this.h_dist < this.size / 2) {
      this.hover = true;
    } else {
      this.hover = false;
    }
    
    // TA: Amplitude
    this.vol = map(this.y, constrainPos[3], constrainPos[1], 0, 1);
    this.sound.setVolume(this.vol);
    this.level = this.amp.getLevel();
    this.level = this.level * 50;
    // TA: Pan
    this.pan = map(this.x, constrainPos[0], constrainPos[2], -1, 1);
    this.sound.pan(this.pan);
    
    //botão principal
    if (this.sound.isPlaying()) { //this.playing) {
      fill(this.color_playing);
    } else {
      fill(this.color_stopped);
    }
    if (this.hover) {
      fill(this.color_hover);
    }
    
    //noStroke();
    strokeWeight(playerStrokeWeight);
    stroke(category_colors[this.category][0], category_colors[this.category][1], category_colors[this.category][2], category_player_alpha);
    ellipse(this.x, this.y, this.size + this.level, this.size + this.level);

    //nome do ficheiro
    /*
    fill(166, 166, 166);
    textAlign('LEFT', 'CENTER');
    text(this.fileName.slice(0, this.fileName.length-4) , this.x - this.size / 2, this.y + this.size / 2 + 15);
    */
    
    //botão Play
    this.playButton.setPos(this.x + this.playButtonOffset[0], this.y + this.playButtonOffset[1]);
    this.playButton.display();
    
    //botão Delete
    this.deleteButton.setPos(this.x + this.deleteButtonOffset[0], this.y + this.deleteButtonOffset[1]);
    this.deleteButton.display();
    
    //botão Filter
    this.filterControl.setPos(this.x + this.filterControlOffset[0], this.y + this.filterControlOffset[1]);
    this.filterControl.display();
    
    //Indicador de volume
    this.filterIndicator.setPos(this.x, this.y);
    this.filterIndicator.setValueXY(this.filterControl.getValueX(), this.filterControl.getValueY());
    this.filterIndicator.display();
    
    this.hpFilter.freq(map(pow(this.filterIndicator.value_min+1,8), 1, 256, 60, 16000));
    
    this.lpFilter.freq(map(pow(this.filterIndicator.value_max+1,8), 1, 256, 60, 16000));
    
    //Barra de transporte
    this.arcSize = this.size + this.level;
    this.rad = radians(90);
    strokeWeight(1);
    noFill();
    stroke(55, 111);
    arc(this.x, this.y, this.arcSize, this.arcSize, this.rad, this.rad + radians(359));
    strokeWeight(3);
    this.currentTime = this.sound.currentTime();
    this.ct = map(this.currentTime, 0, this.sound.duration(), 0, radians(359));
    stroke(this.color_transport);
    arc(this.x, this.y, this.arcSize, this.arcSize, this.rad, this.rad + this.ct);

    //sinal loading
    if (this.sound.isLoaded()) {
      //fill(33, 255, 55, 55);
      //ellipse(this.x, this.loading_y, 20, 20);
    } else {
      fill(this.color_loading);
      ellipse(this.x, this.y, this.size, this.size);
    }

    //Texto informativo
    if (this.hover) {
      fileInfo(this.sound, this.category, this.fileNumber);
    }

    pop();
  }

  this.move = function() {
    this.x += this.speed[0];
    if (this.x > width - 50 || this.x < 50) {
      this.speed[0] *= -1;
    }
    this.y += this.speed[1];
    if (this.y > height - 50 || this.y < 50) {
      this.speed[1] *= -1;
    }
    this.t = this.time % this.lapse;
    //print('t: ' +this.t + '  -  time: ' +this.time + '  -  lapse: ' + this.lapse);

    if (this.t > this.lapse - 5) {
      this.speed[0] += random(-0.1, 0.1);
      if (abs(this.speed[0]) > 0.3) {
        this.speed[0] = random(-0.1, 0.1);
      }
      this.speed[1] += random(-0.1, 0.1);
      if (abs(this.speed[1]) > 0.3) {
        this.speed[1] = random(-0.1, 0.1);
      }
      this.lapse = int(random(15)) + 15;
    }
    // Constrain movement to playAreaPos
    this.x = constrain(this.x, constrainPos[0], constrainPos[2]);
    this.y = constrain(this.y, constrainPos[1], constrainPos[3]);

  }

  this.autoPlay = function() {
    if (this.autoPlay_toggle) {
      //print(this.sound.duration());
      this.time_modulo = int(this.time % this.playFor);
      //print('time: ' + this.time + '  - time_modulo: ' + this.time_modulo + '  -  playFor: ' + this.playFor);

      if (this.time_modulo > this.playFor - 2) {
        if (this.sound.isLoaded()) {
          if (this.sound.isPlaying()) {
            this.playButton.toggle = false; // set play/stop icon
            this.sound.stop();
            this.selectRandom();
            this.filterControl.setValueY(random(0,1));
            this.filterControl.setValueX(random(0,1));
          } 
          else {
            this.playButton.toggle = true; // set play/stop icon
            if(this.loop) this.sound.loop();
            else this.sound.play();
          }
          this.playFor = int(random(10, this.sound.duration() * 10));
        }
      }
    }
  }

  this.clicked = function() {
    //detetar clique no botão principal
    var d = int(dist(this.x, this.y, mouseX, mouseY));
    if (d < this.size / 2) {
      this.mouseLock = true;
    }
    else{
      this.mouseLock = false;
    }
    
    this.playButton.clicked();
    if(this.playButton.getValue() && !this.sound.isPlaying()){
      if(this.loop) this.sound.loop();
      else this.sound.play();
      this.playButton.setValue(false);
    }
    if(this.playButton.getValue() && this.sound.isPlaying()){
      this.sound.stop();
      this.playButton.setValue(false);
    }
    
    this.filterControl.clicked();
    
    this.deleteButton.clicked();
    if(this.deleteButton.getValue()){
        var i = players.indexOf(this);
        if(i !== -1) {
          if(this.sound.isPlaying()){
            this.sound.stop();
          }
          players.splice(i, 1);
        }
        player_count --;
    }
    
    
  }
  this.released = function() {
    this.mouseLock = false;
    //this.moveButton.released();
    this.playButton.released();
    this.filterControl.released();
    this.deleteButton.released();
  }

  this.selectRandom = function() {
    if (this.sound.isPlaying()) {
      this.sound.stop();
    }
    this.fileNumber = int(random(filenames[this.category].length));
    filenames[this.category][this.fileNumber];
    this.sound = loadSound(path + filenames[this.category][this.fileNumber]);
    // connect filter nodes
    this.sound.disconnect();
    this.lpFilter.connect(this.hpFilter);
    this.sound.connect(this.lpFilter);
    this.lpFilter.res(10);
    this.hpFilter.res(10);
    
    this.amp.setInput(this.sound);
    //print(this.fileNumber + ': ' + filenames[this.fileNumber]);
  }
}