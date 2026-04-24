var canvasContainer = document.querySelector("#pjs");

function setCanvasSize() {
  canvasContainer.width = window.innerWidth;
  canvasContainer.height = 300;
  canvasContainer.style.width = window.innerWidth + "px";
  canvasContainer.style.height = 300 + "px";
}

function Wave(theta, y_off, stroke_color, stroke_opaque, grad_dir) {
  var n_vertices = 20;
  var w; // Width of entire wave
  var maxwaves = 3; // total # of waves to add together

  var stroke_color = stroke_color || [200, 200, 200];
  var stroke_width = 3;
  var grad_dir = grad_dir || -1;
  var stroke_opaque = stroke_opaque || 70;

  var theta = theta || random(0, 90);
  var amplitude = new Array(maxwaves); // Height of wave
  var dx = new Array(maxwaves);
  var yvalues;
  var y_off = y_off || random(-40, 40);

  function init(waves_param) {
    //    console.log(theta, y_off);
    w = width + 360;
    theta = (theta / 180) * PI;

    amplitude[0] = waves_param[0].amp ? waves_param[0].amp : random(10, 15);
    var period = waves_param[0].period
      ? waves_param[0].period
      : random(800, 900); // Num pixels before wave repeats
    dx[0] = (TWO_PI / period) * (w / n_vertices);
    //    console.log(amplitude[0], period);

    amplitude[1] = waves_param[1].amp ? waves_param[1].amp : random(20, 25);
    var period = waves_param[1].period
      ? waves_param[1].period
      : random(550, 600); // Num pixels before wave repeats
    dx[1] = (TWO_PI / period) * (w / n_vertices);
    //    console.log(amplitude[1], period);

    amplitude[2] = 20;
    var period = 2000; // Num pixels before wave repeats
    dx[2] = (TWO_PI / period) * (w / n_vertices);

    yvalues = new Array(n_vertices);
  }

  function calcWave() {
    theta += 0.015;
    // Set all height values to zero
    for (var i = 0; i < yvalues.length; i++) {
      yvalues[i] = 0;
    }

    // Accumulate wave height values
    for (var j = 0; j < maxwaves; j++) {
      var x = theta;
      for (var i = 0; i < yvalues.length; i++) {
        // Every other wave is cosine instead of sine
        yvalues[i] += sin(x) * amplitude[j];
        x += dx[j];
      }
    }
  }

  function renderWave() {
    strokeWeight(stroke_width);
    stroke(stroke_color);
    noFill();
    // A simple way to draw the wave with an ellipse at each location

    var grad_num = 10;
    for (var y_grad = 0; y_grad < grad_num; y_grad++) {
      var stroke_color_op = stroke_color.concat(
        stroke_opaque - (y_grad / grad_num) * stroke_opaque,
      );
      stroke(stroke_color_op);
      beginShape();
      vertex(-100, -5);
      for (var x = 0; x < yvalues.length; x++) {
        curveVertex(
          (x - 1) * (w / n_vertices),
          height / 2 + yvalues[x] + y_off + grad_dir * y_grad * stroke_width,
        );
      }
      vertex(width + 100, -5);
      endShape(CLOSE);
    }
  }

  return {
    init: init,
    calcWave: calcWave,
    renderWave: renderWave,
  };
}

var waves = Array();
var numOfWaves = 3;

function setup() {
  //  frameRate(30);
  setCanvasSize();
  var canvas = createCanvas(canvasContainer.width, canvasContainer.height, P2D);
  canvas.parent("pjs");

  /*
  for (var i=0; i < numOfWaves; i++) {
    var wave = new Wave();
    wave.init();
    waves.push(wave);
  }
*/

  var wave = new Wave(40.7831, -13.8384);
  wave.init([
    {
      amp: 11.6126,
      period: 801.1247,
    },
    {
      amp: 21.4767,
      period: 569.4705,
    },
  ]);
  waves.push(wave);
  wave = new Wave(75.0861, -35.4808, null, null, 1);
  wave.init([
    {
      amp: 11.9808,
      period: 890.9144,
    },
    {
      amp: 23.5858,
      period: 587.9209,
    },
  ]);
  waves.push(wave);
  wave = new Wave(85.8749, -16.2312);
  wave.init([
    {
      amp: 11.7457,
      period: 852.8326,
    },
    {
      amp: 22.5081,
      period: 551.103,
    },
  ]);
  waves.push(wave);
}

function draw() {
  clear();
  showFPS();
  for (var i = 0; i < numOfWaves; i++) {
    waves[i].calcWave();
    waves[i].renderWave();
  }
}

function showFPS() {
  var fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);
}
