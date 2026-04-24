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

//BUTTERFLY CLASS
class Butterfly {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.flapSpeed = props.flapSpeed;
    this.yoff = random(100);//starting point
    this.flapOffset = random(TWO_PI); // wing timing
    this.wingHue = random(360);      // random color
    this.wingBrightness = random(100,100);
  }
  
  update() {
    // movement
    this.x += sin(frameCount * 0.001) * 1;
    this.y += cos(frameCount * 0.001) * 1;
    
    this.x = constrain(this.x, 50, width - 50);
    this.y = constrain(this.y, 50, height - 50);
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(PI / 2);
    
    // butterfly
    let r = 200;
    stroke(255);
    strokeWeight(3);
    colorMode(HSB, 360, 100, 100, 100);//random colors
    fill(this.wingHue, 80, this.wingBrightness, 50);

    
    let da = PI / 300;//delta angle Pi by points
    let dx = 0.01;//noise patter along the wing
    
    //WINGS - total of 360º
    //right wing
    beginShape();
    let xoff = 0;
    for (let a = -PI / 2; a <= PI / 2; a += da) {//top to bottom - first 90º
      let n = noise(xoff, this.yoff);
      let r = sin(2 * a) * map(n, 0, 1, 50, 100);
      let x = r * cos(a);
      let y = sin(frameCount * this.flapSpeed + this.flapOffset) * r * sin(a);
      vertex(x, y);
      xoff += dx;
    }
    endShape();
    
    //left wing
    beginShape();
    xoff = 0;
    for (let a = PI / 2; a <= 3 * PI / 2; a += da) {//mirrored - remaining 270º
      let n = noise(xoff, this.yoff);
      let r = sin(2 * a) * map(n, 0, 1, 50, 100);
      let x = r * cos(a);
      let y = sin(frameCount * this.flapSpeed + this.flapOffset) * r * sin(a);
      vertex(x, y);
      xoff -= dx;
    }
    endShape();
    
    this.yoff += 0.009;
    pop();
}
}