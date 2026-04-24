//main sketch
function setup() {
  createCanvas(500, 500);

  //for loop, new butterflies
  for (let i = 0; i < 10; i++) {
    butterflies.push(
      new Butterfly({
        x: random(width),
        y: random(height),
        flapSpeed: random(0.005, 0.015),
      }),
    );
  }
}
