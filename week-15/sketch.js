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

function setup () {
    createCanvas(windowWidth, widowHeight);

    colorMode(HSB, 360, 100, 100, 1);
}