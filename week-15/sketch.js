//GLOBAL VARIABLES
//audio file paths
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
let playPauseBtn;

//perlin noise offset
let noiseOffset = 0;
let currentMood = "neutral";


//SETUP
function setup () {
    //winamp container
    let canvas = createCanvas(windowWidth * 0.8, 400);
    canvas.parent('visualizerScreen');
    colorMode(HSB, 360, 100, 100, 1);

    //audio
    amp = new p5.Amplitude();
    amp.setInput(); //connect when song loads

    //user interaction
    createButtons();

    //line objects
    for (let i = 0; i < numLines; i++) {
        lines.push({ 
            layer: i, 
            thickness: random(1.5, 3.5),
            phase: random(0, 100)
        });
    } 
    noFill();
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
    let lineBright = mood.bright + (intensity * 15);
    let lineAlpha = 0.55 + (intensity * 0.3);

    strokeWeight(lineData.thickness);
    stroke(lineHue, lineSat, lineBright, lineAlpha);

    for (let x = 0; x <= width; x +=22) {
        let noiseVal = noise (
            x * 0.007, noiseOffset * 0.8 + layer * 0.1 + lineData.phase * 0.005);

            let maxWave = mood.amplitude;
            //wave size increased w/ music intensity
            let waveOffset = map(noiseVal, 0, 1, -maxWave, maxWave);
            let finalY = yPos + waveOffset;
            let sineMod = sin(frameCount * 0.02 + layer * 0.5) * 3;

            finalY += sineMod;
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
    push();
    blendMode(MULTIPLY);
    fill(0, 0, 0, 0.15);
    noStroke();
    ellipse(width/2, height/2, width * 0.9, height * 0.9);
    pop();
}

//draw loop
function draw() {
  drawWinampBackground(); //gradient function

  //current volume
  let volume = 0;
  if (amp && currentSong && isPlaying) {
    volume = amp.getLevel();
  }

  //map vol to instensity (0.2 min, up to 1.0); mult by 3 to make sensitive
  let intensity = constrain(volume * 3, 0.2, 1.0);

//update perlin noise offset
  noiseOffset += moodSongs[currentMood].speed;
//draw lines with reactive intensity
  drawAllLines(intensity);

// debug
  fill(255);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text("TESTING", 10, 20);
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
        currentSong.loop();
        isPlaying = true;
        currentMood = mood;
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
        console.log("No song loaded. Click a mood button first");
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
    
    let moods = ['sad', 'neutral', 'happy'];
    
    for (let i = 0; i < moods.length; i++) {
        let mood = moods[i];
        let moodData = moodSongs[mood];
        
        // Button text: Mood name + composer
        let btnText = moodData.name + "\n" + moodData.composer;//new line
        let btn = createButton(btnText);
        btn.parent(menu);
        btn.style('padding', '10px 18px');
        btn.style('border-radius', '10px');
        btn.style('border', 'none');
        btn.style('cursor', 'pointer');
        btn.style('font-size', '14px');
        btn.style('font-weight', 'bold');
        btn.style('color', 'white');
        btn.style('line-height', '1.3');
        btn.style('white-space', 'pre-line');
        
        // Button colors
        if (mood === 'sad') btn.style('background', '#2752b0');
        else if (mood === 'neutral') btn.style('background', '#246338');
        else btn.style('background', '#bf9b39');
        
        btn.mousePressed(function() {
            loadAndPlayMood(mood);
        });
    }
    
    playPauseBtn = createButton('Pause');
    playPauseBtn.parent(menu);
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


//responsive canvas
function windowResized() {
    let container = select('#visualizerScreen');
    let newWidth = min(windowWidth * 0.8, 1000);
    resizeCanvas(newWidth, 400);
}


