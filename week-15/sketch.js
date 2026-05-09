const moodSongs = {
    sad: {
        file: "songs/sad.mp3",
        track: "Lacrimosa",
        composer: "Mozart"
    },
    neutral: {
        file: "songs/neutral.mp3",
        track: "Waltz No. 15",
        composer: "Brahms"
    },
    happy: {
        file: "songs/happy.mp3",
        track: "Air",
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