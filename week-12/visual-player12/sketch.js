let song;
let sliderVolume;
let fft; let smoothing = 0.8; let bins = 512;
let waveform = []; let r = 100;
let spectrum= [];

function preload() {
    song = loadSound('mp3/house-music-2.mp3');
}

function setup() {
    createCanvas(500, 300);
    song.play();
    //adding 2 args: smoothing- to reduce noise from the sound signal btwn 0-1; bin-cut up the range of frequencies bwtn (powerof2) 16-1024 values
    fft = new p5.FFT(smoothing, bins);
    //play/pause bttn
     button = createButton("pause");
     button.mousePressed(togglePlaying);
     //volume contrl
     sliderVolume = createSlider(0, 1, 0.5, 0.01);
}

//play, pause control
function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    button.html("pause");
  } else {
    song.pause();
    button.html("play");
  }
}

function draw() {
  background(200);
  //sounds change per the wave of the sound, w/ +-values
  waveform = fft.waveform();
  spectrum = fft.analyze();
  let vol = fft.getEnergy(20, 140); // range of frequencies - vol=aplitude of the frequency that ranges btwn 20-140
  if (vol >= 250) {
    stroke("#95c7b5");
  } else if (vol >= 240) {
    stroke("#E6F082");
  } else if (vol >= 230) {
    stroke("#df7bcb");
  } else {
    stroke("#f2fff4");
  }
 
//   print(waveform);
//   print(spectrum);
  print(vol);

  for (let k = 0; k < spectrum.length; k++) {
    let y = map(spectrum[k], 0, 255, 0, height);
    //changing to right side up
    line(k, height, k, height - y);
  }

  //TIME DOMAIN: for loop to see the wave(line) graph; positioning that graph; adjust wave movement w/map
//   for (let i=0; i<waveform.length; i++) {
//       let y = height/2 + map(waveform[i], -1, 1, -r, r);
//       ellipse(i, y, 1, 1);
//   }
song.setVolume(sliderVolume.value());
 
}