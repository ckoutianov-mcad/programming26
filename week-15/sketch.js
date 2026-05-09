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

function setup () {
    createCanvas(windowWidth, windowHeight);

    colorMode(HSB, 360, 100, 100, 1);
}

function draw() {
    drawWinampBackground();//gradient function
}

function drawWinampBackground() {
    for (let y = 0; y < height; y++) {
        let t = y/height;
        stroke(240, 30 + (1-t)*20, 5 + (1-t)*8);
    line(0, y, width, y);
        // let hue = 240; //blue
        // let sat = 30 + (1 - t) * 20; //30-50% saturation
        // let bright = 5 + (1 - t) * 8; // 5-13% brightness (very dark)
        // stroke(hue, sat, bright);
        // line(0, y, width, y);
    // }
    
    // push();
    // blendMode(MULTIPLY);
    // fill(0, 0, 0, 0.15);
    // noStroke();
    // ellipse(width/2, height/2, width * 0.8, height * 0.8);
    // pop();
    }
}

// function createButtons() {
//     let menu = createDiv('');
//     menu.style('position', 'fixed');
//     menu.style('bottom', "80px");
//     menu.style("left", "0");
//     menu.style("right", "0");
//     menu.style("display", "flex");
//     menu.style("justify-content", "center");
//     menu.style("gap", "15px");
//     menu.style("z-index", "100");

//     let moods = ['sad', 'neutral', 'happy'];

//     for(let i = 0; i < moods.length; i++) {
//         let mood = moods[i];
//         let data = moodPresets[mood];
//         let track = moodSongs[mood];
        
//         let btnText = data.name + track.composer;
//         let btn = createButton(btnText);
//         btn.parent(menu);
//         btn.style('padding', '10px 18px');
//         btn.style("border", "none");
//         btn.style("font-size", "12px");
//         btn.style('color', 'white');

//         btn.mousePressed(function() {loadAndPlayMood(mood);
//         });
//     }

//     playPauseBtn = createButton('Play');
//     playPauseBtn.parent(menu);
//     playPauseBtn.style('padding', '10px 24px');
//     playPauseBtn.style('border-radius', '30px');
//     playPauseBtn.style('border', 'none');
//     playPauseBtn.style('background', '#000000');
//     playPauseBtn.style('color', '#00ff88');
//     playPauseBtn.style('font-size', '14px');
//     playPauseBtn.style('font-weight', 'bold');

//     playPauseBtn.mousePressed(togglePlayPause);
// }

