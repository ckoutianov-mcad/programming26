//GLOBAL VARIABLES
//audio file paths and presets(parameters)
const moodSongs = {
  sad: {
    file: "songs/sad.mp3",
    displayName: "Lacrimosa",
    composer: "Mozart",
    name: "Sad", //parameters
    hue: 210, //blue
    speed: 0.003,
    amplitude: 35,
    sat: 80,
    bright: 85,
  },
  neutral: {
    file: "songs/neutral.mp3",
    displayName: "Waltz No. 15",
    composer: "Brahms",
    name: "Neutral", //parameters
    hue: 140, //green
    speed: 0.007,
    amplitude: 60,
    sat: 75,
    bright: 85,
  },
  happy: {
    file: "songs/happy.mp3",
    displayName: "Air",
    composer: "Bach",
    name: "Happy", //parameters
    hue: 55, //yellow
    speed: 0.012,
    amplitude: 90,
    sat: 85,
    bright: 90,
  },
};

//line array
let lines = [];
let numLines = 30;
//audio
let currentSong = null;
let amp = null;
let isPlaying = false;
let currentMood = "neutral";
//perlin noise offset
let noiseOffset = 0;
//user interaction
let playPauseBtn = null;
let volumeSlider = null;
let trackSlider = null;
let trackSliderUpdating = false;

//SETUP
function setup () {
    //winamp container
    let canvas = createCanvas(windowWidth * 0.8, 400);
    canvas.parent('visualizerScreen');
    colorMode(HSB, 360, 100, 100, 1);

    //initial message for user
    let statusSpan = select('#nowPlayingText');
    if (statusSpan) {
        statusSpan.html("CLICK A MOOD BUTTON");
    }

    //audio
    amp = new p5.Amplitude();
    amp.setInput(); //connect when song loads

    //user interaction
    createButtons();
    createVolumeControl();
    createTrackControl();

    //line objects
    for (let i = 0; i < numLines; i++) {
        lines.push({ 
            layer: i, 
            thickness: random(1.5, 3.5),
            phase: random(0, 100)
        });
    } 
    noFill();
    console.log("Mood Visualizer ready. Click a button to start");
}

//perlin noise lines
function drawAllLines (intensity) {
let mood = moodSongs[currentMood];

for (let i = 0; i < lines.length; i++){
    let lineData = lines[i];
    let layer = lineData.layer;

    //y position spread
    let yPos = map(layer, 0, numLines, height * 0.2, height * 0.8);

    beginShape();
    //line color - brightness and alpha react to music intensity
    let lineHue = mood.hue;
    let lineSat = mood.sat;
    let lineBright = 75;

    let lineWidth = map(lineData.thickness, 1.5, 3.5, 1.0, 1.8);
    strokeWeight(lineWidth);

    stroke(lineHue, lineSat, lineBright);

    for (let x = 0; x <= width; x +=22) {
        let noiseVal = noise (
            x * 0.007, noiseOffset * 0.8 + layer * 0.1 + lineData.phase * 0.005);

            let maxWave = mood.amplitude;
            //wave size increased w/ music intensity
            let waveOffset = map(noiseVal, 0, 1, -maxWave * intensity, maxWave * intensity);
            let finalY = yPos + waveOffset;
            vertex(x, finalY);
        }
        endShape();
    }
}

//dark background
function drawWinampBackground() {
    for (let y = 0; y < height; y++) {
        let t = y/height;
        let hue = 240;
        let sat = 40;
        let bright = 8 + (t * 25);

        if(y % 2 === 0) {
            bright *=0.85;
        }
        stroke(hue, sat, bright);
        line(0, y, width, y);
    }

    //vignette
    blendMode(MULTIPLY);
    fill(0, 0, 0, 0.3);
    rect(0, 0, width, height);
    blendMode(BLEND);
    
    push();
    blendMode(DIFFERENCE);
    noFill();
    noStroke();
    ellipse(width/2, height/2, width * 0.9, height * 0.9);
    pop();
}

//draw - updates background, measures volume, draws flowing lines 
function draw() {
  drawWinampBackground(); //dark background

  //measure current volume (0=no vol. - 1=max vol)
  let volume = 0;
  if (amp && currentSong && isPlaying) {
    volume = amp.getLevel();//get vol from p5.Amplitude
  }

  //map vol to visual instensity: higher intensity = bigger waves
  let intensity = constrain(volume * 8, 0.6, 1.0);

  //update perlin noise offset: sad=slow, neutral=medium, happy=fast
  noiseOffset += moodSongs[currentMood].speed;

  //draw perlin noise lines: waves react to intensity
  drawAllLines(intensity);

  //track display
  updateTrackDisplay();
}

//display of current track
function updateNowPlaying(mood) {
let nowPlayingSpan = select('#nowPlayingText');
if (nowPlayingSpan) {
    let moodData = moodSongs[mood];
    nowPlayingSpan.html("NOW PLAYING: " + moodData.displayName + " - " + moodData.composer);
} 
}
//AUDIO FUNCTIONALITY
function loadAndPlayMood(mood) {
    console.log("Loading: ", mood);

    if(currentSong && isPlaying) {
        currentSong.stop();
    }

let songPath = moodSongs[mood].file;

currentSong = loadSound(
    songPath,
    function() {
        console.log("Loaded successfully: " + mood);
        currentSong.setVolume(0.7);
        userStartAudio();
        currentSong.loop();
        isPlaying = true;
        currentMood = mood;

        //update now playing text
        updateNowPlaying(mood);

        if (amp) amp.setInput(currentSong);
        if (playPauseBtn) playPauseBtn.html('Pause'); 
    },
    function(err) {
        console.error("Failed to load: " + songPath);
    }
);
}

function togglePlayPause() {
    if (!currentSong) {
        console.log("Click a mood button first");
        return;
    }

    if (isPlaying) {
        currentSong.pause();
        isPlaying = false;
        playPauseBtn.html('Play');
        console.log("Paused");
    } else {
        userStartAudio();
        currentSong.loop();
        isPlaying = true;
        playPauseBtn.html("Pause");
        console.log("Playing");
    }
}

function updateTrackDisplay() {
    if (!currentSong || !currentSong.isLoaded() || trackSliderUpdating)
        return;
    let duration = currentSong.duration();
    let currentTime = currentSong.currentTime();

    if (duration > 0 && currentTime >=0) {
        //update slider position
        let percent = (currentTime / duration) * 100;
        trackSlider.value(percent);

        //format
        let currentMin = floor(currentTime / 60);
        let currentSec = floor(currentTime % 60);
        let totalMin = floor(duration / 60);
        let totalSec = floor(duration % 60);

        //time string, number format
        let timeStr = currentMin + ":" + nf(currentSec, 2) + "/" + totalMin + ":" + nf(totalSec, 2);

        //update display
        if(window.timeDisplay) {
            window.timeDisplay.html(timeStr);
        }
    }
}

//USER INTERFACE - CONTROLS
function createButtons() {
    let menu = createDiv('');
    menu.style('position', 'fixed');
    menu.style('bottom', '80px');
    menu.style('left', '0');
    menu.style('right', '0');
    menu.style('display', 'flex');
    menu.style('justify-content', 'center');
    menu.style('gap', '15px');
    menu.style('z-index', '100');
    menu.style('flex-wrap', 'wrap'); //button wrap
    menu.style('padding', '10px');
    menu.style('pointer-events', 'auto')
    
    let moods = ['sad', 'neutral', 'happy'];
    
    for (let i = 0; i < moods.length; i++) {
        let mood = moods[i];
        let moodData = moodSongs[mood];
        
        // Button text: Mood name + composer
        let btnText = moodData.name + "\n" + moodData.composer;//new line
        let btn = createButton(btnText);
        btn.parent(menu);

        //accessiblity: tooltip for mouse hover
        let tooltipText = `Play ${moodData.displayName} by ${moodData.composer}`;
        btn.attribute('title', tooltipText);

        //accessibitly: screen reader
        let screenReaderText = `${moodData.name} mood, ${moodData.displayName} by ${moodData.composer}`;
        btn.attribute('aria-label', screenReaderText);
        

        //button styling
        btn.style('padding', '10px 18px');
        btn.style('border-radius', '10px');
        btn.style('border', 'none');
        btn.style('cursor', 'pointer');
        btn.style('font-size', '14px');
        btn.style('font-weight', 'bold');
        btn.style('color', 'white');
        btn.style('line-height', '1.3');
        btn.style('white-space', 'pre-line');

        
        //button colors
        if (mood === 'sad') btn.style('background', '#2752b0');
        else if (mood === 'neutral') btn.style('background', '#246338');
        else btn.style('background', '#bf9b39');
        
        //button action
        btn.mousePressed(function() {
            loadAndPlayMood(mood);
        });
    }
    
    //play/pause button
    playPauseBtn = createButton('Pause');
    playPauseBtn.parent(menu);

    //tooltip for play/pause
    playPauseBtn.attribute('title', 'Play or pause the current song');

    //screen reader label
    playPauseBtn.attribute('aria-label', 'Play or pause music playback');

    //styling
    playPauseBtn.style('padding', '10px 24px');
    playPauseBtn.style('border-radius', '10px');
    playPauseBtn.style('border', 'none');
    playPauseBtn.style('background', '#2c3e50');
    playPauseBtn.style('color', '#00ff88');
    playPauseBtn.style('cursor', 'pointer');
    playPauseBtn.style('font-size', '14px');
    playPauseBtn.style('font-weight', 'bold');
    
    
    playPauseBtn.mousePressed(togglePlayPause);
}

function createVolumeControl() {
  let volumeContainer = createDiv("");
  volumeContainer.style("position", "fixed");
  volumeContainer.style("bottom", "20px");
  volumeContainer.style("left", "20px");
  volumeContainer.style("background", "rgba(0,0,0,0.7)");
  volumeContainer.style("padding", "8px 15px");
  volumeContainer.style("border-radius", "20px");
  volumeContainer.style("z-index", "100");
  volumeContainer.style("display", "flex");
  volumeContainer.style("align-items", "center");
  volumeContainer.style("gap", "10px");
  volumeContainer.style("border", "1px solid rgba(0, 255, 136, 0.3)");

  let volLabel = createSpan("VOL");
  volLabel.parent(volumeContainer);
  volLabel.style("color", "#00ff88");
  volLabel.style("font-size", "11px");
  volLabel.style("font-family", "monospace");
  volLabel.style("font-weight", "bold");
  volLabel.style("letter-spacing", "1px");

  volumeSlider = createSlider(0, 100, 70);
  volumeSlider.parent(volumeContainer);
  volumeSlider.style("width", "90px");
  volumeSlider.style("background", "#1a1a2a");

  //slider thumb
  volumeSlider.style("accent-color", "#00ff88");

  volumeSlider.input(function () {
    if (currentSong) {
      let vol = volumeSlider.value() / 100;
      currentSong.setVolume(vol);
    }
  });
}

function createTrackControl() {
  let trackContainer = createDiv("");
  trackContainer.style("position", "fixed");
  trackContainer.style("bottom", "20px");
  trackContainer.style("right", "20px");
  trackContainer.style("background", "rgba(0,0,0,0.7)");
  trackContainer.style("padding", "8px 15px");
  trackContainer.style("border-radius", "20px");
  trackContainer.style("z-index", "100");
  trackContainer.style("display", "flex");
  trackContainer.style("align-items", "center");
  trackContainer.style("gap", "10px");
  trackContainer.style("border", "1px solid rgba(0, 255, 136, 0.3)");

  // 
  let trackLabel = createSpan("TIME");
  trackLabel.parent(trackContainer);
  trackLabel.style("color", "#00ff88");
  trackLabel.style("font-size", "11px");
  trackLabel.style("font-family", "monospace");
  trackLabel.style("font-weight", "bold");
  trackLabel.style("letter-spacing", "1px");

  trackSlider = createSlider(0, 100, 0);
  trackSlider.parent(trackContainer);
  trackSlider.style("width", "130px");
  trackSlider.style("accent-color", "#00ff88");

  let timeDisplay = createSpan("0:00 / 0:00");
  timeDisplay.parent(trackContainer);
  timeDisplay.style("color", "#00ff88");
  timeDisplay.style("font-size", "10px");
  timeDisplay.style("font-family", "monospace");
  timeDisplay.style("letter-spacing", "1px");

  window.timeDisplay = timeDisplay;

  trackSlider.input(function () {
    if (currentSong && currentSong.isLoaded()) {
      trackSliderUpdating = true;
      let duration = currentSong.duration();
      let newTime = (trackSlider.value() / 100) * duration;
      currentSong.jump(newTime);
      trackSliderUpdating = false;
    }
  });
}

//responsive canvas
function windowResized() {
    let container = select('#visualizerScreen');
    let newWidth = min(windowWidth * 0.8, 1000);
    resizeCanvas(newWidth, 400);

    let statusSpan = select('#nowPlayingText');
    if(statusSpan) {
        statusSpan.attribute('aria-label', 'Window resized, visualizer adjusted');
    }
}


