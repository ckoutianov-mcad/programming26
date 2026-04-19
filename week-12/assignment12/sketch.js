let song;

function preload() {
    song = loadSound('mp3/spring.mp3');
}

function setup() {
    createCanvas(400, 400);
    song.play();
}

function draw() {
    background(200);
}