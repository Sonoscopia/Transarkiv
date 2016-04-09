// 'Player' class

function Player(x_, y_) {
  this.x = playAreaPos[0] + x_;
  this.y = y_;
  this.size = 55;
  this.speed = [random(-0.2, 0.2), random(-0.2, 0.2)];
  this.time = 0;
  this.lapse = 50; //5 seconds
  this.autoPlay_toggle = false;
  this.mouseLock = false;
  this.hover = false;

  this.color_stopped = color(200, 111);
  this.color_hover = color(222, 222);
  this.color_loading = color(33, 33, 33, 222);
  this.color_playing = color(233, 133);
  this.color_transport = color(255, 155);
  //botão Play
  //this.playToggle = new Toggle(this.x + this.size / 2 + 5, this.y - this.size / 2, 15);
  //this.playToggle.setMode('CIRC');
  //this.playToggle.setLabel('Play', 'Play');
  // botão 'move'
  this.moveButtonPos = [this.size / 2 + 5, this.size / 2 + 20];
  this.moveButton = new cHandler(this.x + this.moveButtonPos[0],this.y - this.moveButtonPos[1], 15);
  this.moveButton.setLabel('move', 'move');
  
  //botão next random file
  this.next = new Toggle(this.x + this.size / 2, this.y - this.size / 2, 15);
  this.next.setMode('CIRC');
  
  //circular handler and indicator - Filter
  this.filterControl = new cHandler(this.x, this.y, 15);
  this.filterControl.setValueY(0.5);
  this.filterControl.setValueX(0.2);
  this.filterControl.setLabel('filter');
  this.filterIndicator = new cRangeSlider(this.x - this.size, this.y, this.size + 30);
  this.filterIndicator.setRange(90);
  this.filterIndicator.setAngle(145);
  //this.bpFilter = new p5.BandPass();
  this.hpFilter = new p5.HighPass();
  this.lpFilter = new p5.LowPass();
  
  //sinal loading
  this.loading_x = this.x - this.size / 2;
  this.loading_y = this.y - this.size / 2;

  this.fileNumber = int(random(3));
  this.fileName = filenames[this.fileNumber];
  //carregar o som - -  aqui devia dar para utilizar uma função callback para mostrar quando está a carregar
  this.sound = loadSound(path + filenames[this.fileNumber]);
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
    
    //move object
    if (this.moveButton.getValue()) {
      this.x = mouseX - this.moveButtonPos[0] - 5;
      this.y = mouseY + this.moveButtonPos[1] - 20;
    }
    //detect mouse hover
    this.h_dist = int(dist(this.x, this.y, mouseX, mouseY));
    if (this.h_dist < this.size / 2) {
      this.hover = true;
    } else {
      this.hover = false;
    }

    //Amplitude (Rui)
    /*
    this.sound.setVolume(this.volControl.getValueY());
    this.level = this.amp.getLevel();
    this.level = this.level * 50;
    */
    
    // TA: Amplitude
    this.sound.setVolume(1.0 - this.y/600);
    this.level = this.amp.getLevel();
    this.level = this.level * 50;
    // TA: Pan
    this.sound.pan(this.x/900*2-1);
    
    //botão principal
    if (this.sound.isPlaying()) { //this.playing) {
      fill(this.color_playing);
    } else {
      fill(this.color_stopped);
    }
    if (this.hover) {
      fill(this.color_hover);
    }
    
    noStroke();
    ellipse(this.x, this.y, this.size + this.level, this.size + this.level);

    //botão Play
    //this.playToggle.setPos(this.x + this.size / 2 + 5, this.y - this.size / 2);
    //this.playToggle.display();

    //botão Move
    this.moveButton.setPos(this.x + this.size / 2 + 5, this.y - this.size / 2);
    this.moveButton.display();

    //nome do ficheiro
    /*
    fill(166, 166, 166);
    textAlign('LEFT', 'CENTER');
    text(this.fileName.slice(0, this.fileName.length-4) , this.x - this.size / 2, this.y + this.size / 2 + 15);
    */
    
    //botão next random file
    //this.next.setPos(this.x+this.size/2+5, this.y - this.size / 2);
    //this.next.display();

    //controlador de volume
    this.filterControl.setPos(this.x + this.size / 2 + 5, this.y + this.size / 2 - 20);
    this.filterControl.display();
    
    //Indicador de volume
    this.filterIndicator.setPos(this.x, this.y);
    this.filterIndicator.setValueXY(this.filterControl.getValueX(), this.filterControl.getValueY());
    this.filterIndicator.display();
    
    this.hpFilter.freq(map(this.filterIndicator.value_min, 0, 1, 60, 16000));
    
    this.lpFilter.freq(map(this.filterIndicator.value_max, 0, 1, 60, 16000));
    
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
      noStroke();
      var text_x = 20;
      var text_y = 100;
      var lineSpace = 15;
      fill(0, 111);
      //rect(text_x - 5, text_y - 15, 200, 300);
      fill(188);
      text('PROJECT INFO', text_x, text_y);
      text('Info about the project here...', text_x, text_y + lineSpace);
      text('FILE INFO', text_x, text_y + lineSpace * 7);
      text('File: ' + filenames[this.fileNumber], text_x, text_y + lineSpace * 8);
      text('Duration: ' + nf(this.sound.duration(), 3, 2) + 's', text_x, text_y + lineSpace * 9);
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

  }

  this.autoPlay = function() {
    if (this.autoPlay_toggle) {
      //print(this.sound.duration());
      this.time_modulo = int(this.time % this.playFor);
      //print('time: ' + this.time + '  - time_modulo: ' + this.time_modulo + '  -  playFor: ' + this.playFor);

      if (this.time_modulo > this.playFor - 2) {
        if (this.sound.isLoaded()) {
          if (this.sound.isPlaying()) {
            this.sound.stop();
            this.selectRandom();
          } else {
            this.sound.play();
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
    if (d < this.size / 2 && this.sound.isLoaded()) {
      if (this.sound.isPlaying()) {
        this.sound.stop();
      } else {
        this.sound.play();
      }
    }
    //botão Play
    //this.playToggle.clicked();
    this.moveButton.clicked();
    if(this.moveButton.getValue()){
      this.x = this.moveButton.getValueX();
      this.y = this.moveButton.getValueY();
    }
    /*
    if (this.playToggle.getValue()) {
      this.sound.play();
    } else {
      this.sound.stop();
    }*/

    this.filterControl.clicked();

    //detetar clique no botão next random
    this.next.clicked();
    d = int(dist(this.next_x, this.next_y, mouseX, mouseY));
    if (d < this.next_size) {
      this.selectRandom();
    }
  }
  this.released = function() {
    this.mouseLock = false;
    this.filterControl.released();
    this.moveButton.released();
  }

  this.selectRandom = function() {
    if (this.sound.isPlaying()) {
      this.sound.stop();
    }
    this.fileNumber = int(random(filenames.length));
    this.fileName = filenames[this.fileNumber];
    this.sound = loadSound(path + filenames[this.fileNumber]);
    this.amp.setInput(this.sound);
    print(this.fileNumber + ': ' + filenames[this.fileNumber]);
  }
}