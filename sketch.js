let xvals = [];
let yvals = [];
let a = 720;
let branch_test = 1234;


function setup() {
  createCanvas(720, 400);
  strokeWeight(2);
  frameRate(30);
  //test
}

function draw() {
 if (Zuzi) console.log('Ciastko');  
clear();  

  a = a-1;
  if (a<-250) a=720;
  
  

  background(237, 34, 93);
  
  
  fill(255)
  stroke(0,0,0,0);
  textSize(50);
  text('CIASTKO', a , 2 * height / 9 );


  for (let i = 1; i < width; i++) {
    xvals[i - 1] = xvals[i];
    yvals[i - 1] = yvals[i];
  }
  // Add the new values to the end of the array
  xvals[width - 1] = 100*sin(a/10);
  yvals[width - 1] = mouseY;


  fill(50);
  noStroke();
  rect(0, height / 3, width, 2 * height / 3 + 1);
beginShape();
  for (let i = 1; i < width; i++) {
    stroke(0,255,94);
    point(i, 4 * height / 6 + xvals[i] / 3);
    
    fill(237, 34, 93,100)
    stroke(237, 34, 93);
    point(i-(2*width/5), 3 * height / 6 + yvals[i] / 3);
//point(i-(2*width/5), yvals[i]);
    
    vertex(i-(2*width/5),3 * height / 6 + yvals[i] / 3)
      


  }
  vertex(3*width/5, height);
  //vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  //Przyciemniony prostokąt
  stroke(0,0,0,0);
  fill(0,0,0,100);
  rect(3*width/5,0,2*width/5,height);
  
  
  
  
  //Coordy myszki
  fill(100)
  stroke(0,0,0,0);
  textSize(10);
  text('MouseX:', 10 ,height -20);
  text(mouseX, 50 ,height -20);
  text('MouseY:', 10 ,height -10);
  text(mouseY, 50 ,height -10);
  
}