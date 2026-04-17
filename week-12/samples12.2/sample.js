var song;

function preload() {
  song = loadSound('mp3/spring.mp3');
  console.log(loadSound);
}

function setup() {
  createCanvas(200, 200);
  song.play();
  slider = createSlider(0, 1, 0.5, 0.01);
}

function draw() {
  background("#E5EEE4");
  song.setVolume(slider.value());
}
