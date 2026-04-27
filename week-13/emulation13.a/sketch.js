let myCanvas;
let noOfStars = 2000; //star amount, dense galaxy
let sizeDiff = 0.2; //amount each orbit increases than previous
let majorAxisMinLen = 10; //size of innermost orbit, smaller=tighter
let widthHeightRatio = 0.7; //how flat the ellipse is, 1=circle
let rotationGradient; //how much eash ellipse rotates
let rotationGradientSlider; //allows interaction
let stars = []; //each star has major/minor axislength, theta, deltatheta

function setup() {
  myCanvas = createCanvas(640, 360);
  myCanvas.parent("sketch-holder");

  rotationGradient = PI / noOfStars; //spiral effect, base rotation amount Pi/ the num of stars
  rotationGradientSlider = createSlider(
    0,
    rotationGradient * 5,
    rotationGradient,
    0.000001,
  ); // user adjustment
  rotationGradientSlider.parent('slider-control');

  for (let i = 0; i < noOfStars; i++) {
    const majorAxisLen = majorAxisMinLen + i * sizeDiff;
    const armIndex = i;//pass color index
    stars.push(new Star(majorAxisLen, armIndex));
  }
}

function draw() {
  background("black");
  noFill();
  stroke("white");
  translate(width / 2, height / 2);

  //orbit of stars from center
  for (let i = 0; i < noOfStars; i++) {
    rotate(rotationGradientSlider.value()); //tilt increases of ellipse - spiral effect
    stars[i].display(); //calls stars
    stars[i].update(); //calls change, movement
  }
}

class Star {
  //stars for each star
  constructor(majorAxisLen, armIndex) {
    //each star's orbit
    this.majorAxisLen = majorAxisLen;
    this.minorAxisLen = majorAxisLen * widthHeightRatio;
    this.theta = random(2 * PI); //starting angle
    this.deltaTheta = 0.01; //change each frame
    this.armIndex = armIndex %3;
//3 spiral arms

//colors
const armColors = [
  { r: 100, g: 150, b: 255 }, //blue
  { r: 255, g: 200, b: 100 }, //gold
  { r: 200, g: 100, b: 255 }, //purple
  
];
this.starR = armColors[this.armIndex].r;
this.starG =armColors[this.armIndex].g;
this.starB = armColors[this.armIndex].b;
  }

  display() {
    //draws star
    //creates circular motion - orbital motion
    const x = (this.majorAxisLen / 2) * cos(this.theta);
    const y = (this.minorAxisLen / 2) * sin(this.theta);
    noStroke();
    fill(this.starR, this.starG, this.starB, 200); 
    circle(x, y, 2);
  }

  update() {
    //moves star along the orbit
    this.theta = this.theta + this.deltaTheta;
  }
}