let osc, env;
let notes = [50, 52, 54, 55, 57, 59, 61, 62];//notes array
let c = [0, 30, 60, 90, 120, 240, 270, 300];


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
    background(220, 0, 80);
    osc.freq(midiToFreq(notes[6]));//different notes
    //keys to play notes
    for(let i = 0; i < 8; i++) {
        fill(c[4], 100, 100);
        rect(30 + (i*90), 50, 80, 80);
        noLoop();
    }
    console.log(notes);
}

function mousePressed() {
    env.play();
}