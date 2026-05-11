# Mood Visualizer

## Concept and Inspiration
This project synthesizes three classical music moods: Sad, Neutral and Happy. It displays corresponding generative visuals.

The project explores Perlin Noise, were it is used to showcase natural terrain and flowing movement. Using this technology results in calm, smoothing, organic visual experience that reflects emotion one might experience.

Inspired by the Classic Winamp visualizers in the late 90's / early 2000's. 

## Features
Three moods:
- Sad: slow, calm blue waves accompanied by Mozart's Lacrimosa.
- Neutral: medium, balanced green waves accompanied by Brahms' Waltz No. 15.
- Happy: fast, energentic yellow waves accompanied by Bach's Air

Audio reactions:
Uses p5.Amplitude to map music volume to display wave height and line brightness.

Custom Winamp-inspiration interface:
Retro title bar, status display and color palette.

Accessibility:
Screen reader labels (aria-label) and hover tooltips (title).

## p5.js Techniques

Audio Analysis (sound)
- loadSound() : loads audio files in the background.
- p5.Amplitude & getLevel(): gets current volume to create the visuals.
- userStart Audio(): releases audio after user clicks on botton.

Generative Visuals (js)
- Perlin Noise - noise(): Creates wave movements for each lines.
- HSB color mode - colorMode(HBS): make it wasy to shift colors by changing a single hue value.
- map() : converts volume into a visual intensity to scale wave amplitude.

User Interface (dom)
- createSlider(): used for colume and track control
- createButton() and createDiv(): create mood buttons and interface panels.
- CSS styling - .style(): displays styling for buttons directly in file.
