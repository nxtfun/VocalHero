//color pallete:
//https://coolors.co/8ecae6-219ebc-023047-ffb703-fb8500
let jsonContainer
let colour 
let controllers = []
let connected = 0;
let sensor = 0;
let previousMillis = 0;
let previousMillis2 = 0;
let timestamp = 0;
let currentMillis = 0;
let secinsample = 10; //how many ms between samples
let przesuw=0;
let xvals = []; // values from sensor saved to buffer
let xtime = []; // time stamps for every sensor value
let xvals2 = []; // values from file saved to buffer
let xtime2 = []; // time stamps for every sensor value from file

let startButton;
let stopButton;

let di=0;
let pixpsec = 0.10;//how many pixels in 1 ms on chart
let rduration = 6000;//how long is one recording
let chartlen = pixpsec*rduration;//length of chart in px
let json = {}; //new JSON Object
let startState = 0;//state of chart  '1' after start, '0 when stopped'


//chartlen - rduration
//x        - stamp

//x = stamp * chartlen/rduration
//x= stamp*pixpsec

function preload() {
  
  jsonContainer = loadJSON('ciastko.json');

  
}

function setup() {
//start of setup
  
  startButton = createButton('START!');
  startButton.position(50,70);
  startButton.mousePressed(startButtonF);
  
  //stopButton = createButton('STOP!');
  //stopButton.position(50,90);
  //stopButton.mousePressed(stopButtonF);
  
  textFont("Montserrat");
  xvals2 = Object.values(jsonContainer.values);
  xtime2 = Object.values(jsonContainer.timestamp);
  
//console.log(xvals2);
//xvals2 = Object.values(xvals2);//to check if valid
//console.log(typeof xvals2);
console.log(xtime2[21]);
 
  
  

  
  
  
  //colour=color('#white')
  
  
  
  createCanvas(750, 400)
  //background(120,200,0)
  noStroke()
  window.addEventListener("gamepadconnected", function(e) {
  gamepadHandler(e, true);
  //console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    //e.gamepad.index, e.gamepad.id,
    //e.gamepad.buttons.length, e.gamepad.axes.length);
    connected = 1;
  });
	window.addEventListener("gamepaddisconnected", function(e) {
  //console.log("Gamepad disconnected from index %d: %s",
  //  e.gamepad.index, e.gamepad.id);      
    //colour=color(120,120,0)
    gamepadHandler(e, false);
    connected = 0;
  }); 
  
  
  //frameRate(10);
  
}
//end of setup




function draw() {
//clear();  
background ('#fb8500');
  
  
  
  push();
  fill(250)
  strokeWeight(0);
  stroke(150);
  rect(50, 155, chartlen+1, 200,10);
  pop(); 
  
//background (255,183,3)

//print(xvals2[])  ;
  
//Input from sensor
if(!connected){
  if((-mouseY+332)>=0 &&(-mouseY+332)<131){
    sensor = -mouseY+332;
  }
  else if((-mouseY+332)>=131){
    sensor = 130;
          
          }
  else{
    
    
    sensor = 0;
  }
  
}
  else{
sensor = axisInput();  
  } 
  
//time  
currentMillis = millis();
//  if(currentMillis - previousMillis > secinsample){
//    previousMillis = currentMillis;
    //print('Hello');
//    if(przesuw>300)przesuw = 0;
//    przesuw = przesuw+1;
//  }
  

  //save input data to buffer
  if(startState){
  startRecording();
  }
  else {
    previousMillis2 = currentMillis;
    //xvals = [];//erase data
    di=0;
  }
  
    
 // push()  
//strokeWeight(10);
  //fill(200)
//fill(204, 153, 0);
  //fill('#FFB703')
//ellipse(width/2 -20, height/2 +55,180,180);
//pop()
  
  
  
  
  
push()  
strokeWeight(10);
  fill(200)
//fill(204, 153, 0);
  //fill('#FFB703')
//ellipse(50, height,50+ sensor,50+ sensor);
pop()
  
    push()
  strokeWeight(2);
  stroke(200);
  line(52, 330-sensor, chartlen+48+1, 330-sensor);
  //line(50+przesuw,330,50+przesuw,200)
  pop()
  
  //draw chart
  push() 
  stroke(100);//line color
  strokeWeight(2.6);//line weight
  
    
  for (let i = 0; i < xvals.length; i++) {
    line(pixpsec*xtime[i]+50,-xvals[i]+330,pixpsec*xtime[i+1]+50,-xvals[i+1]+330);
    
  }
  
  stroke(100,200,300);
/*
  
  for (let i = 0; i < xvals2.length; i++) {
    line(pixpsec*xtime2[i]+50,-xvals2[i]+330,pixpsec*xtime2[i+1]+50,-xvals2[i+1]+330);
    
  }
  stroke(100);
*/
  
    
  


  
  //line(50, 335, 30+(chartlen), 335);
pop()
  

  
  

  
text(sensor, 10, 20);
text('Podłączony: ',10,40);
text('Millis: ',10,60);
text(round(millis()),50,60);
 
  
if(connected){
  text('TAK!',80,40);
}
  else {
    text('NIE',80,40);
  }
  


push()
textSize(30);
text('Lubisz ciastka?',250,140);  
pop()  

  
  
  
  
  
  
}



function gamepadHandler(event, connecting) {
  let gamepad = event.gamepad;
  if (connecting) {
 		 //print("Connecting to controller "+gamepad.index)
    controllers[gamepad.index] = gamepad
  } else {
    delete controllers[gamepad.index]
  }
}





function axisInput()
{ 
  if(connected){
  var gamepads = navigator.getGamepads()
  for (let i in controllers)
  {
    let controller=gamepads[i]//controllers[i]
    
    return 100+controller.axes[7]*100;
   
  }
  }
  else{
    return 0;
  }
}


function startButtonF() {
  if(!startState){
  console.log('Start!');
  xvals = [];//erase data
  startState = 1;
  di=0;
    }
}

function stopButtonF() {
  console.log('Stop!');
  startState = 0;
  previousMillis2 = currentMillis;
}


function startRecording() {
  
  timestamp = round(currentMillis - previousMillis2);//current time in ms from start of recording data
    
    
    
    
  //If data gathering time is longer than (value of time in ms), reset the timestamp.
    if(timestamp>rduration){
      //di=0;
      //previousMillis2 = currentMillis;
      
      json.values = xvals;
      json.timestamp = xtime;
      //saveJSON(json, 'ciastko.json');
      stopButtonF();
      
      //xvals = [];//erase data
      //print(xtime);
    }
  else{
    
    xvals[di] = sensor; //save sensor data with every frame
    xtime[di] = timestamp; //save time from start in ms with every frame
    di++;//iterate to next frame
  }
  
  text('time:',10,130);
  text(timestamp,40,130);
  text('frame:',10,145)
  text(di,45,145)
  
}
