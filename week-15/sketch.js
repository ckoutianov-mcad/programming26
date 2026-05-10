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

//perlin noise offset
let noiseOffset = 0;
let currentMood = "neutral";
let playPauseBtn;

//SETUP
function setup () {
    //winamp container
    let canvas = createCanvas(windowWidth * 0.8, 400);
    canvas.parent('visualizerScreen');
    colorMode(HSB, 360, 100, 100, 1);
    createButtons();
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

    //line color using HSB and thickness
    let lineHue = mood.hue;
    let lineSat = mood.sat;
    let lineBright = mood.bright;
    let lineAlpha = 0.55;

    strokeWeight(lineData.thickness);
    stroke(lineHue, lineSat, lineBright, lineAlpha);

    for (let x = 0; x <= width; x +=22) {
        let noiseVal = noise (
            x * 0.007, noiseOffset * 0.8 + layer * 0.1 + lineData.phase * 0.005);

            let maxWave = mood.amplitude;
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
  noiseOffset += moodSongs[currentMood].speed;
  drawAllLines(0.6);
// debug
  fill(255);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text("TESTING", 10, 20);
}

//AUDIO FUNCTIONALITY
function loadAndPlayMood(mood) {
    console.log("Loading mood: ", mood);
}

function togglePlayPause() {
    console.log("Play/Pause toggled");
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
    
    playPauseBtn = createButton('Play');
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


