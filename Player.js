// 'Player' class

function Player(x_, y_) {
  this.x = x_;
  this.y = y_;
  this.size = 50;
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
  this.playToggle = new Toggle(this.x - this.size / 2, this.y + this.size / 2, 15);
  this.playToggle.setMode('CIRC');
  //botão next random file
  this.next = new Toggle(this.x + this.size / 2, this.y - this.size / 2, 15);
  this.next.setMode('CIRC');
  //circular handler and indicator - Volume
  this.volControl = new cHandler(this.x, this.y, 15);
  this.volControl.setValueY(0.9);
  this.volControl.setLabel('vol');
  this.volIndicator = new cLevel(this.x - this.size, this.y, this.size+30);
  this.volIndicator.setRange(90);
  this.volIndicator.setAngle(145);

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
    this.time = int(millis() * 0.01);
    if (this.time > 30) {
      this.autoPlay_toggle = true
    }

    if (this.mouseLock) {
      this.x = mouseX;
      this.y = mouseY;
    }
    //detect mouse hover
    this.h_dist = int(dist(this.x, this.y, mouseX, mouseY));
    if (this.h_dist < this.size / 2) {
      this.hover = true;
    } else {
      this.hover = false;
    }

    //Amplitude
    this.sound.setVolume(this.volControl.getValueY());
    this.level = this.amp.getLevel();
    this.level = this.level * 50;
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
    //this.playToggle.setPos(this.x - this.size / 2, this.y + this.size / 2);
    //this.playToggle.display();
    //nome do ficheiro
    fill(166, 166, 166);
    textAlign('LEFT', 'CENTER');
    text(this.fileName, this.x - this.size / 2 + 25, this.y + this.size / 2 + 10);

    //botão next random file
    this.next.setPos(this.x+this.size/2+5, this.y - this.size / 2);
    this.next.display();

    //controlador de volume
    this.volControl.setPos(this.x+this.size/2+5, this.y+this.size/2-20);
    this.volControl.display();

    //Indicador de volume
    this.volIndicator.setPos(this.x, this.y);
    this.volIndicator.setValue(this.volControl.getValueY());
    this.volIndicator.display();

    //Barra de transporte
    this.arcSize = this.size;
    this.rad = radians(90);
    strokeWeight(1);
    noFill();
    stroke(55, 111);
    arc(this.x, this.y, this.arcSize, this.arcSize, this.rad, this.rad + radians(359));
    strokeWeight(5);
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
      var text_y = height - 70;
      fill(0, 111);
      rect(text_x - 5, text_y - 15, 150, 60);
      fill(188);
      text('File: ' + filenames[this.fileNumber], text_x, text_y);
      text('Duration: ' + nf(this.sound.duration(), 3, 2), text_x, text_y + 15);
    }


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
    this.playToggle.clicked();
    this.volControl.clicked();

    //detetar clique no botão next random
    this.next.clicked();
    d = int(dist(this.next_x, this.next_y, mouseX, mouseY));
    if (d < this.next_size) {
      this.selectRandom();
    }
  }
  this.released = function() {
    this.mouseLock = false;
    this.volControl.released();
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