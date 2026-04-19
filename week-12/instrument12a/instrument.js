let osc, env;

function setup() {
    createCanvas(400, 400);
    env = new p5.Envelope();

    env.setADSR(0.01, 0.1, 1, 0.25);

    osc = new p5.Oscillator('triangle');
    osc.start();
    osc.amp(env);
}

function draw() {
    background(220);
}

function mousePressed() {
    env.play();
}