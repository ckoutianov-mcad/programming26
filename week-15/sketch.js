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

const moodPresets = {
    sad: {
        name: "Sad",
        hue: 210, //blue
    },
    neutral: {
        name: "Neutral",
        hue: 140, //green
    },
    happy: {
        name: "Happy",
        hue: 55, //yellow
    }
}

function setup () {
    createCanvas(windowWidth, widowHeight);

    colorMode(HSB, 360, 100, 100, 1);
}

function createButtons() {
    let menu = createDiv('');
    menu.style('position', 'fixed');
    menu.style('bottom', "80px");
    menu.style("left", "0");
    menu.style("right", "0");
    menu.style("display", "flex");
    menu.style("justify-content", "center");
    menu.style("gap", "15px");
    menu.style("z-index", "100");

    let moods = ['sad', 'neutral', 'happy'];

    for(let i = 0; i < moods.length; i++) {
        let mood = moods[i];
        let data = moodPresets[mood];
        let displayName = moodSongs[mood];
        
        let btnText = data.name + track.composer;
        let btn = createButton(btnText);
        btn.parent(menu);
        btn.style('padding', '10px 18px');
        btn.style("border", "none");
        btn.style("font-size", "12px");
        btn.style('color', 'white');

        btn.mousePressed(function() {loadAndPlayMood(mood);
        });

    }
}