
let iter = 0;
let iter1 = 0;
let iter2 = 0;
let iter3 = 0;
let iter4 = 0;
let iter_znak = 1;



let yy = 1;
let yy1 = 1;
let yy2 = 1;
let yy3 = 1;

let odstep = 0;

let odstep2 = 15;



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
  ay1 = -yy*0.5+10+height/2;
  ax2 = 280;
  ay2 = -yy*2+10+height/2;
  ax3 = 350;
  ay3 = yy*2+10+height/2;
  ax4 = 4*width/5;
  ay4 = -yy*1.6+10+height/2;
  
  //circle(ax1,ay1,5)
  //circle(ax2,ay2,5)
  //circle(ax3,ay3,5)
  //circle(ax4,ay4,5)
  //circle(ax1,ay1,5)
  
  
  
  //strokeWeight(5);
  
  //point(260,5+height/2)
  
  strokeWeight(2);


  //Bezier paths for data to follow. They give smooth flow effect.

  yy = bezierPoint(y1, y2, y3, y4, iter);//smooth text movement
  yy1 = bezierPoint(y1, y2, y3, y4, iter1);//smooth text movement
  yy2 = bezierPoint(y1, y2, y3, y4, iter2);//smooth text movement
  yy3 = bezierPoint(y1, y2, y3, y4, iter3);//smooth text movement
  yy4 = bezierPoint(y1, y2, y3, y4, iter4);//smooth text movement
  
  
  //timers. They time everything here.
  
  if (iter < 1 & millis() > 2000)  iter = iter+0.02*iter_znak;
  if (iter1 < 1 & millis() > 2500)  iter1 = iter1+0.02;
  if (iter2 < 1 & millis() > 3400)  iter2 = iter2+0.02;
  if (iter3 < 1 & millis() > 4000)  iter3 = iter3+0.02;
  if (iter4 < 1 & millis() > 4500)  iter4 = iter4+0.03;

  
  

  
  odstep = yy4*4.5
  
  let b1x = width/4,
  b1y = -0.5*yy + height/2,
      
  b2x = 50+width/4,
  b2y = -yy1 + height/2,
  
  b3x = 150+width/4,
  b3y = height/2,
  
  b4x = 245+width/4,
  b4y = -1.6*yy2 + height/2,
  b5y = 315+width/4
  
  fill(0)
  textSize(45);
  text('Lu',b1x,b1y)
  text('bisz',b2x,b2y)
  text('ciast',b3x,b3y)
  text('ka?',b4x,b4y)
  
  line(b1x,odstep + b1y,b2x-10,odstep + b1y)
  
  line(b2x+10,odstep +b2y,b3x-25,odstep + b2y)
  
  line(b3x+10,odstep+ b3y,b4x-10,odstep + b3y)
  
  line(b4x+10,odstep + b4y,b5y,odstep + b4y)
  
  noFill()
  
  bezier(b2x-10,odstep + b1y,b2x-10+odstep2,odstep + b1y,b2x+10-odstep2,odstep +b2y,b2x+10,odstep +b2y)
  
  bezier(b3x-25,odstep + b2y,b3x-25+odstep2,odstep + b2y,b3x+10-odstep2,odstep+ b3y,b3x+10,odstep+ b3y)
  
  bezier(b4x-10,odstep + b3y,b4x-10+odstep2,odstep + b3y,b4x+10-odstep2,odstep + b4y,b4x+10,odstep + b4y)
  
}

