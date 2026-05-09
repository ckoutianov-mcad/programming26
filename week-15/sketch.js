const moodSongs = {
    sad: {
        file: "songs/sad.mp3",
        displayName: "Lacrimosa",
        composer: "Mozart"
    },
    neutral: {
        file: "songs/neutral.mp3",
        displayName: "Waltz No. 15",
        composer: "Brahms"
    },
    happy: {
        file: "songs/happy.mp3",
        displayName: "Air",
        composer: "Bach"
    }
};

//parameters for each mood
const moodPresets = {
    sad: {
        name: "Sad",
        hue: 210, //blue
        speed: 0.003,
        amplitude: 35,
        sat: 80,
        bright: 85
    },
    neutral: {
        name: "Neutral",
        hue: 140, //green
         speed: 0.007,
        amplitude: 60,
        sat: 75,
        bright: 85
    },
    happy: {
        name: "Happy",
        hue: 55, //yellow
         speed: 0.012,
        amplitude: 90,
        sat: 85,
        bright: 90
    }
}

let lines = [];
let numLines = 30;

function setup () {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100, 1);
    createButtons();
    for (let i = 0; i < numLines; i++) {
        lines.push({ layer: 1, thickness: random(1, 3)});
    }
}

//Perlin Noise Lines
function drawAllLines (instensity) {
let mood = moodPresets[currentMood];

for (let i = 0; i < lines.length; i++){
    let lineData = lines[i];
    let layer = lineData.layer;

    //y position spread
    let yPos = map(layer, 0, numLines, height * 0.2, height * 0.8);

    beginShape();

    //line color using HSB
    let lineHue = mood.hue;
    let lineSat = mood.sat;
    let lineBright = mood.bright + intensity * 10;
    let lineAlpha = 0.7 + intensity * 0.2;

    strokeWeight(lineData.thickness);
    stroke(lineHue, lineSat, lineBright, lineAlpha);

    for (let x = 0; x <= width; x +=22) {
        let noiseVal = noise (
            x * 0.007, noiseOffset * 0.8 + layer * 0.1 + lineData.phase * 0.005);

            let maxWave = mood.amplitude;
            let waveOffset = map(noiseVal, 0, 1, -maxWave, maxWave);
            let finalY = yPos + (waveOffset * instensity);
            let sineMod = sin(frameCount * 0.02 + layer*0.5) * 3;

            finalY += sineMod;
            vertex(x, finalY);
        }
        endShape();
    }
}

function draw() {
    drawWinampBackground();//gradient function
}

function drawWinampBackground() {
    for (let y = 0; y < height; y++) {
        let t = y/height;
        stroke(240, 30 + (1-t)*20, 5 + (1-t)*8);
    line(0, y, width, y);
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
        let data = moodPresets[mood];
        let track = moodSongs[mood];
        
        // Button text: Mood name + composer
        let btnText = data.name + "\n" + track.composer;//new line
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



