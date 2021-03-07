let colour 
let controllers = []
let connected = 0;
let sensor = 0;
let previousMillis = 0;
let previousMillis2 = 0;
let currentMillis = 0;
let secinsample = 10; //how many ms between samples
let przesuw=0;
let xvals = []; // values from sensor saved to buffer
let xtime = []; // time stamps for every sensor value
let di=0;

function setup() {
//start of setup  
  
  colour=color('#white')
  createCanvas(400, 400)
  background(120,0,0)
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
background(colour)


//Input from sensor
if(!connected){
  if((-mouseY+332)>=0 &&(-mouseY+332)<131){
    sensor = -mouseY+332;
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
  if(currentMillis - previousMillis > secinsample){
    previousMillis = currentMillis;
    //print('Hello');
    if(przesuw>300)przesuw = 0;
    przesuw = przesuw+1;
  }
  

//save input data to buffer  
  
  
    if(di)
    //for (let i = 0; i < width; i++) {
    xvals[di] = sensor; //save sensor data with every frame
    xtime[di] = currentMillis2 - previousMillis2
    di++;
      
      
      
    
  
  
  

  
  
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
strokeWeight(10);
fill(204, 153, 0);
ellipse(200, 200,10+ sensor,10+ sensor);
pop()

push()
textSize(30);
text('Lubisz ciastka?',100,140);  
pop()  
  push()
  strokeWeight(2);
  stroke(200);
  line(50, 330-sensor, 350, 330-sensor);
  line(50+przesuw,330,50+przesuw,200)
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


  
