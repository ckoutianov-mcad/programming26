//0. perlin noise vlaues 0-1
//0. starting radius 40
let r = 40;
let speed = 20;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  //center
  translate(width / 2, height / 2);

  stroke(3);
  fill(0.2);

  beginShape();
  //for loop
  for (let i = 0; i < 100000; i++) {
    //to add noise, set vars of initial x and y
    //sprial outwards - with circle
    let x = r * cos(i / speed);
    let y = r * sin(i / speed);

    //console.log("values 0-1", noise(x / speed, y / speed));
    //how to vary r by
    //th - the rotation of the vector in the noise field
    //get the value of the noise, mult by 2Pi
    let th = noise(x / speed, y / speed) * 2 * PI;
    // vector magnitude increase - as r spirals the vector shows more offset
    let vmag = (r - 40) / 2;

    //field vector - replacing framecount to angle theata (th). Which is the angle of the vector in the vector field at that point.
    circle(x + vmag * cos(th), y + vmag * sin(th), 3);
    //sprial outwards
    r += 0.001;
  }
  endShape();

  noLoop();

  
}


 

