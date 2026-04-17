//global var: song-mp3; sliderVolume-control of volume; sliderRate-speed of song; button- control play/pause
var song;
var sliderVolume;
var button;

function setup() {
  createCanvas(200, 200);
  song = loadSound("mp3/spring.mp3", loaded);
  button = createButton("play");
  button.mousePressed(togglePlaying);
  sliderVolume = createSlider(0, 1, 0.5, 0.01);
}

//control play/pause 
function togglePlaying() {
    if (!song.isPlaying()) {
        song.play();
        button.html("pause");
    } else {
        song.pause();
        button.html("play");
    }
}

//song is loaded
function loaded() {
    console.log(song.play);
}

//sliders to control volume and speed
function draw() {
  background("#E5EEE4");
  song.setVolume(sliderVolume.value());
    background("#E5EEE4");
    rectMode(CENTER);
    let s = "Play/Pause; slider = volume control";
    textSize(12);
    text(s, 100, 50, 70, 80);
}
