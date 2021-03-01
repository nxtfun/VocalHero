
let xspacing = 20; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 50.0; // Height of wave
let period = 1000.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

function setup() {
  createCanvas(720, 400);
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
}

function draw() {
  background(237, 34, 93);
  calcWave();
  renderWave();
  
  fill(255)
  stroke(0,0,0,0);
  textSize(50);
  text('VOCAL HERO', 20 ,8* height / 9 );
  
  
}

function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.01;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 3 + yvalues[x], 16, 16);
  }
  
  
    for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 3 - yvalues[x] +100 , 16, 16);
  }
  
}
