let osc, env; 
let notes = [50, 52, 54, 55, 57, 59, 61, 62];//notes
let c = [0, 30, 60, 90, 175, 205, 270, 300]; //color
let keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k']; //keys pressed

function setup() {
  createCanvas(800, 300);
  colorMode(HSB);
  //create envelope
  env = new p5.Envelope();
  env.setADSR(0.01, 0.1, 1, 0.25);
  //create oscillator
  osc = new p5.Oscillator("sine");
  osc.start();
  osc.amp(env); //amplitude effected by envolope
}

function draw() {
  background(0, 0 , 95);

  //title - user instructions
  fill(0);
  textSize(15);
  textAlign(CENTER);
  text("Press your keyboard to play", width/2, 30);

  //keys, when pressed
  for (let i = 0; i < 8; i++) {
    fill(0, 0, 100); //default key colors
    if (keyIsPressed && key == keys[i]) {
      fill(c[i], 100, 100);//when keys pressed, color changes
      osc.freq(midiToFreq(notes[i])); //different notes
    }
    rect(30 + i * 90, 50, 80, 80, 10); //key
    //key letter
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(keys[i].toUpperCase(), 30 + i *90 +40, 50 +40);
  }
}

function keyPressed() {
    env.play();
}