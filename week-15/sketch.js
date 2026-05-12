//GLOBAL VARIABLES
//audio file paths and presets(parameters)
const moodSongs = {
  sad: {
    file: "songs/sad.mp3",
    displayName: "Lacrimosa",
    composer: "Mozart",
    name: "Sad", //parameters
    hue: 210, //blue
    speed: 0.003, //movement amount
    amplitude: 35,//wave size
    sat: 80, //color saturation
    bright: 85, //color brightness
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

//audio
let currentSong = null;//holds auto-play
let amp = null; //volume of song
let isPlaying = false; //if music is playing
let currentMood = "neutral";
//visual
let lines = [];// array that holds line objects
let numLines = 30;//number of lines
let noiseOffset = 0;//position in Perlin Noise
//user interaction
let playPauseBtn = null;
let volumeSlider = null;
let trackSlider = null;
let trackSliderUpdating = false; //prevents computer to slide while user is dragging

/*SETUP: when page loads winamp wrapper, user instructions, loads songs in the background, buttons displayed, waves(neutral preset).
*/
function setup () {
    //winamp container - external sheet
    let canvas = createCanvas(windowWidth * 0.8, 400);
    canvas.parent('visualizerScreen');
    colorMode(HSB, 360, 100, 100, 1);

    //directions for user, updates when button selected
    let statusSpan = select('#nowPlayingText');
    if (statusSpan) {
        statusSpan.html("CLICK A MOOD BUTTON");
    }

    //audio
    amp = new p5.Amplitude();
    amp.setInput(); //connect when song loads

    //user controls
    createButtons();
    createVolumeControl();
    createTrackControl();

    //line objects - for each
    for (let i = 0; i < numLines; i++) {
        lines.push({ 
            layer: i, // postition (0)
            thickness: random(1.8, 3.5),//line width
            phase: random(0, 100)//starting point for Perlin noise
        });
    } 
    console.log("Mood Visualizer ready. Click a button to start");
}

/*AUDIO FUNCTIONALITY: functions used to load music in the background, checks for error, displays selected track, toggle between play/pause, updates "Now Playing" status bar.
*/
//loads and plays audio, error check
function loadAndPlayMood(mood) {
    console.log("Loading: ", mood);

    //stop current song if it is playing
    if(currentSong && isPlaying) {
        currentSong.stop();
    }

    //gets song file per selected mood
    let songPath = moodSongs[mood].file;

    //checking for song file in the background 
    currentSong = loadSound(
    songPath,
    function() {
        console.log("Loaded successfully: " + mood);
        currentSong.setVolume(0.7);
        userStartAudio();
        currentSong.play();
        isPlaying = true;
        currentMood = mood;    
        
        //update after song loads
        updateNowPlaying(mood);
        if(amp) amp.setInput(currentSong); //connects
        if (playPauseBtn) playPauseBtn.html('Pause'); //changes button text
        },
        //calls error if it fails to load
        function(err) {
        console.error("Failed to load: " + songPath);
        }
);
}

//display of current track
function updateNowPlaying(mood) {
    let nowPlayingSpan = select("#nowPlayingText");
    if (nowPlayingSpan) {
    let moodData = moodSongs[mood];
    nowPlayingSpan.html(
    "NOW PLAYING: " + moodData.displayName + " - " + moodData.composer,
    );
  }
}

//toggles between play and pause 
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
        currentSong.play();
        isPlaying = true;
        playPauseBtn.html("Pause");
        console.log("Playing");
    }
}

//updates "now playing" status bar
function updateTrackDisplay() {
    if (!currentSong || !currentSong.isLoaded() || trackSliderUpdating)
        return;
    let duration = currentSong.duration();
    let currentTime = currentSong.currentTime();
  
    if (duration > 0 && currentTime >=0) {
        //update slider position
        let percent = (currentTime / duration) * 100; //0-100%
        trackSlider.value(percent);

        //format current time
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

/*VISUAL FUNCTIONALITY: dark background for contrast, vignette for smooth dark edges, map of volume for intensity per mood, update Perlin Noise speed and intensity, displays mood selected
*/
//draw - updates color mood, measures volume, draws flowing lines 
function draw() {
  background(0);

  //measure current volume (0=no vol., 1=max vol)
  let volume = 0;
  if (amp && currentSong && isPlaying) {
    volume = amp.getLevel(); //get volume from p5.Amplitude
  }

  //map vol to visual instensity: higher intensity = bigger waves
  let intensity = constrain(volume * 8, 0.6, 1.0);

  //update perlin noise offset: sad=slow, neutral=medium, happy=fast
  noiseOffset += moodSongs[currentMood].speed;

  //draw perlin noise lines: waves react to intensity
  drawAllLines(intensity);

  //vignette - blends edges
  blendMode(MULTIPLY);//darkens underneath
  fill(0, 0, 0, 0.3);//opacity
  rect(0, 0, width, height);//canvas
  blendMode(BLEND);

  //track display
  updateTrackDisplay();
}

//Perlin Noise lines
function drawAllLines (intensity) {
let mood = moodSongs[currentMood];

//loop for each line
for (let i = 0; i < lines.length; i++){
    let lineData = lines[i];
    let layer = lineData.layer;

    //y position spread
    let yPos = map(layer, 0, numLines, height * 0.2, height * 0.8);

    beginShape();
    //line color and brightness
    let lineHue = mood.hue;
    let lineSat = mood.sat;
    let lineBright = 75;

    let lineWidth = map(lineData.thickness, 1.5, 3.5, 1.0, 1.8);//thick to thin 
    strokeWeight(lineWidth);
    stroke(lineHue, lineSat, lineBright);
    //from left to right points
    for (let x = 0; x <= width; x +=22) {
        let noiseVal = noise(
            x * 0.007, noiseOffset * 0.8 + layer * 0.1 + lineData.phase * 0.0005);//random value to move across

            //converts noise value to wave offset
            let maxWave = mood.amplitude;
            //wave size increased w/ music intensity
            let waveOffset = map(noiseVal, 0, 1, -maxWave * intensity, maxWave * intensity);
            let finalY = yPos + waveOffset;
            vertex(x, finalY);
        }
        endShape();
    }
}

/*USER INTERFACE CONTROLS: button controls, volume control, and track control. Accesbility for screen reader and hover over text.
*/

function createButtons() {
    //container div for all buttons
  let menu = createDiv("");
  menu.style("position", "fixed");
  menu.style("bottom", "80px");
  menu.style("left", "0");
  menu.style("right", "0");
  menu.style("display", "flex");
  menu.style("justify-content", "center");
  menu.style("gap", "15px");
  menu.style("z-index", "100");
  menu.style("flex-wrap", "wrap");
  menu.style("padding", "10px");
  menu.style("pointer-events", "auto");

  let moods = ["sad", "neutral", "happy"];
  //create button for each mood
  for (let i = 0; i < moods.length; i++) {
    let mood = moods[i];
    let moodData = moodSongs[mood];
    // Button text: Mood name + composer
    let btnText = moodData.name
    let btn = createButton(btnText);
    btn.parent(menu);
    //button styling
    btn.style("padding", "10px 18px");
    btn.style("border-radius", "10px");
    btn.style("border", "none");
    btn.style("cursor", "pointer");
    btn.style("font-size", "14px");
    btn.style("font-weight", "bold");
    btn.style("color", "white");
    btn.style("line-height", "1.3");
    btn.style("white-space", "pre-line");
    //button colors per mood
    if (mood === "sad") btn.style("background", "#2752b0");
    else if (mood === "neutral") btn.style("background", "#246338");
    else btn.style("background", "#bf9b39");
    //accessiblity: tooltip for mouse hover
    let tooltipText = `Play ${moodData.displayName} by ${moodData.composer}`;
    btn.attribute("title", tooltipText);
    //accessibitly: screen reader
    let screenReaderText = `${moodData.name} mood, ${moodData.displayName} by ${moodData.composer}`;
    btn.attribute("aria-label", screenReaderText);
    //button action when clicked
    btn.mousePressed(function () {
      loadAndPlayMood(mood);
    });
  }

  //play/pause button
  playPauseBtn = createButton("Pause");
  playPauseBtn.parent(menu);
  //styling
  playPauseBtn.style("padding", "10px 24px");
  playPauseBtn.style("border-radius", "10px");
  playPauseBtn.style("border", "none");
  playPauseBtn.style("background", "#2c3e50");
  playPauseBtn.style("color", "#00ff88");
  playPauseBtn.style("cursor", "pointer");
  playPauseBtn.style("font-size", "14px");
  playPauseBtn.style("font-weight", "bold");
  //accessibility: tooltip for play/pause
  playPauseBtn.attribute("title", "Play or pause the current song");
  //accessibilty: screen reader label
  playPauseBtn.attribute("aria-label", "Play or pause music playback");
  //button action when clicked
  playPauseBtn.mousePressed(togglePlayPause);
}

function createVolumeControl() {
    //div for volume control
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
  //accessiblity: screen reader
  volumeContainer.attribute("aria-label", "Volume control panel");
  //styling
  let volLabel = createSpan("VOL");
  volLabel.parent(volumeContainer);
  volLabel.style("color", "#00ff88");
  volLabel.style("font-size", "11px");
  volLabel.style("font-family", "monospace");
  volLabel.style("font-weight", "bold");
  volLabel.style("letter-spacing", "1px");
  //accessibility: screen reader
  volLabel.attribute("aria-label", "Volume");
    //styling
  volumeSlider = createSlider(0, 100, 70);
  volumeSlider.parent(volumeContainer);
  volumeSlider.style("width", "90px");
  volumeSlider.style("background", "#1a1a2a");
  volumeSlider.style("accent-color", "#00ff88");
    //updates the audio volume
  volumeSlider.input(function () {
    if (currentSong) {
      let vol = volumeSlider.value() / 100;
      currentSong.setVolume(vol);
    }
    //accessibilty: screen reader
    volumeSlider.attribute("aria-label", "Volume control, 0 to 100 percent");
    volumeSlider.attribute("aria-valuemin", 0);
    volumeSlider.attribute("aria-valuemax", 100);
    volumeSlider.attribute("aria-valuenow", 70);
    //accessiblity: tooltip for mouse hover
    volumeSlider.attribute("title", "Adjust master volume");
  });
}

function createTrackControl() {
    //div for track control
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
  //accessibility: screen reader
  trackContainer.attribute("aria-label", "Track position control panel");
  //styling
  let trackLabel = createSpan("TIME");
  trackLabel.parent(trackContainer);
  trackLabel.style("color", "#00ff88");
  trackLabel.style("font-size", "11px");
  trackLabel.style("font-family", "monospace");
  trackLabel.style("font-weight", "bold");
  trackLabel.style("letter-spacing", "1px");
  //accessibility
  trackLabel.attribute("aria-label", "Track position");
  //styling
  trackSlider = createSlider(0, 100, 0);
  trackSlider.parent(trackContainer);
  trackSlider.style("width", "130px");
  trackSlider.style("accent-color", "#00ff88");
  //accessibility: screen reader
  trackSlider.attribute(
    "aria-label",
    "Track position slider, drag to jump to any point in the song",
  );
  trackSlider.attribute("aria-valuemin", 0);
  trackSlider.attribute("aria-valuemax", 100);
  trackSlider.attribute("aria-valuenow", 0);
  //accessibility: tooltip for mouse hover
  trackSlider.attribute("title", "Drag to change track position");
    //time display
  let timeDisplay = createSpan("0:00 / 0:00");
  timeDisplay.parent(trackContainer);
  timeDisplay.style("color", "#00ff88");
  timeDisplay.style("font-size", "10px");
  timeDisplay.style("font-family", "monospace");
  timeDisplay.style("letter-spacing", "1px");
  //accessibility: screen reader
  timeDisplay.attribute("aria-label", "Current track time and total duration");
  //stoer globally to update draw()
  window.timeDisplay = timeDisplay;
//when user drags slider, song updates to that position
  trackSlider.input(function () {
    if (currentSong && currentSong.isLoaded()) {
      trackSliderUpdating = true;
      let duration = currentSong.duration();
      let newTime = (trackSlider.value() / 100) * duration;
      currentSong.jump(newTime);
      trackSliderUpdating = false;
      //accessibility: screen reader
      trackSlider.attribute("aria-valuenow", trackSlider.value());
    }
  });
}

//RESPONSIVE CANVAS
function windowResized() {
    //resize canvas when window changes
    let container = select('#visualizerScreen');
    let newWidth = min(windowWidth * 0.8, 1000);
    resizeCanvas(newWidth, 400);

    //accessibilty for screen readers
    let statusSpan = select('#nowPlayingText');
    if(statusSpan) {
        statusSpan.attribute('aria-label', 'Window resized, visualizer adjusted');
    }
}


