let song;
let fft; let smoothing = 0.8; let bins = 512;
let waveform = [];

function preload() {
    song = loadSound('mp3/spring.mp3');
}

function setup() {
    createCanvas(400, 400);
    //song.play();
    //adding 2 args: smoothing- to reduce noise from the sound signal btwn 0-1; bin-cut up the range of frequencies bwtn (powerof2) 16-1024 values
    fft = new p5.FFT(smoothing, bins);
}

function draw() {
    background(200);
    //sounds change per the wave of the sound, w/ +-values
    waveform = fft.waveform();
    print(waveform);
    //for loop to see the wave(line) graph; positioning that graph
    for (let i=0; i<waveform.length; i++) {
        let y = height/2 + waveform[i];
        ellipse(i, y, 1, 1);
    }
}