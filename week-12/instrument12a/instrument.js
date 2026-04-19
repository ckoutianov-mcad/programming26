let osc, env;
let notes = [50, 52, 54, 55, 57, 59, 61, 62];//notes
let c = [0, 30, 60, 90, 160, 240, 270, 300]; //color
let keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k']; //keys pressed


function setup() {
    createCanvas(800, 300);
    colorMode(HSB);
    env = new p5.Envelope();
    env.setADSR(0.01, 0.1, 1, 0.25);
    osc = new p5.Oscillator('triangle');
    osc.start();
    osc.amp(env);
}

function draw() {
  background(16, 107, 255);
  //keys to play notes
  for (let i = 0; i < 8; i++) {
    fill(0, 0, 100); //default key colors
    if (keyIsPressed && key == keys[i]) {
      fill(c[i], 100, 100);
      osc.freq(midiToFreq(notes[i])); //different notes
    }
    rect(30 + i * 90, 50, 80, 80);
  }
}

function keyPressed() {
    env.play();
}