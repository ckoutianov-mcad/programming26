let rotateBy = 5;
let circleX = 0;
let circleY = 0;
let drawTimer;
const speed = 100;
const distance = 5;

//initial canvas so that user is prompted directions
function setup() {
createCanvas(600, 600, WEBGL);
background(233);
alert("Create your own art! Use your mouse to double-click or hold. It will alert you when the canvas is finished.");
}

//control various directions and amount of 'slices' for circles
function drawCircle(x, y) {
    orbitControl();
    push();
    strokeWeight(2);
    stroke("#FF3E9B");
    fill("#FF88BA");
    circle(x, y, 130);
    pop();
}

//Interval to make sure canvas is finished
drawTimer = window.setInterval(() => {
    if (circleY - 50 <= height) {
        drawCircle(circleX, circleY, 255);
        circleY += distance;
    } else {
        circleY = 0;
        circleX += 50;
    }
    if(circleY - 10 > height && circleX - 10 > width) {
        window.clearInterval(drawTimer);
    alert('finished');
}
    }, speed);

//initial circle paused
function mousePressed() {
    noLoop();
}