let iter = 0
let iter_znak = 1;



function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255)
  noFill();
let x1 = 85,
 x2 = 10,
 x3 = 90,
 x4 = 15;
let y1 = 20,
 y2 = 20,
 y3 = 90,
 y4 = 90;
bezier(x1, y1, x2, y2, x3, y3, x4, y4);
fill(255);
let steps = 10;
for (let i = 0; i <= steps; i++) {
  let t = i / steps;
  let x = bezierPoint(x1, x2, x3, x4, t);
  let y = bezierPoint(y1, y2, y3, y4, t);
  circle(x, y, 5);
  
  

}
  let yy = bezierPoint(y1, y2, y3, y4, iter);
  circle(100, yy, 20);
  iter = iter+0.02*iter_znak;
  if (iter < 0) iter_znak = 1;
  if (iter > 1) iter_znak = -1;
}