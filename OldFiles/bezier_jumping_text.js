
let iter = 0
let iter_znak = 1;
let yy = 1;


function setup() {
  createCanvas(600, 400);
}

function draw() {

  background(255)




  let y1 = 0,
    y2 = 10,
    y3 = 20,
    y4 = 20;
  noFill();

  ax1 = 150;
  ay1 = -yy * 0.5 + 10 + height / 2;
  ax2 = 280;
  ay2 = -yy * 2 + 10 + height / 2;
  ax3 = 350;
  ay3 = yy * 2 + 10 + height / 2;
  ax4 = 4 * width / 5;
  ay4 = -yy * 1.6 + 10 + height / 2;


  //strokeWeight(5);

  //point(260,5+height/2)

  strokeWeight(1);





  bezier(ax1, ay1, ax2, ay2, ax3, ay3, ax4, ay4);


  yy = bezierPoint(y1, y2, y3, y4, iter);
  //circle(100, 70+yy, 20);
  if (iter < 1 & millis() > 2000) iter = iter + 0.02 * iter_znak;

  //if (iter < 0) iter_znak = 1;
  //if (iter > 1) iter_znak = -1;


  fill(0)
  textSize(45);
  text('Lu', width / 4, -0.5 * yy + height / 2)
  text('bisz', 50 + width / 4, -yy + height / 2)
  text('ciast', 150 + width / 4, height / 2)
  text('ka?', 245 + width / 4, -1.6 * yy + height / 2)



}

