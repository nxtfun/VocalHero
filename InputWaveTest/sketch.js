//color pallete:
//https://coolors.co/8ecae6-219ebc-023047-ffb703-fb8500

let zapis = 1;//zmien na zero by nie zapisywac plikow

//wysokosc szarych linii
let linia1 = 50;
let linia2 = 50;
let linia3 = 50;
let linia4 = 50;
let linia5 = 50;
let linia6 = 50;
let linia7 = 50;
let linia8 = 50;




let jsonContainer//json container to load data to
let json = {}; //new JSON Object to save data to
let radio //radio buttons
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
let radioVal; //radio button value

let di=0;
let pixpsec = 0.10;//how many pixels in 1 ms on chart
let rduration = 10000;//how long is one recording
let chartlen = pixpsec*rduration;//length of chart in px

let startState = 0;//state of chart  '1' after start, '0 when stopped'

//id and markers data
let taskType = 1; //which module, from (1-3)
let taskIndex = 0;//which task from start
let exerciseData; //example to learn
let hours;
let minutes;
let seconds;
let years;
let months;
let days;

let mic, recorder, soundFile; //audio recorder




//chartlen - rduration
//x        - stamp

//x = stamp * chartlen/rduration
//x= stamp*pixpsec

function preload() {
  
  jsonContainer = loadJSON('ciastko.json');

  
}

function setup() {
//start of setup
  
  //input text
  input = createInput();
  input.position(400, 5);
  
  
  
  //radio buttons
  radio = createRadio(); 
  radio.option('1');
  radio.option('2');
  radio.option('3');
  radio.style('width', '200px');
  radio.style('height', '20px');
  radio.position(300,5);
  
  
  //buttons
  startButton = createButton('START!');
  startButton.position(560,5);
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
 
  
  
  
  
  //audio recorder
    // create an audio in
  mic = new p5.AudioIn();

  // users must manually enable their browser microphone for recording to work properly!
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // create an empty sound file that we will use to playback the recording
  soundFile = new p5.SoundFile();
  
  

  
  
  
  //colour=color('#white')
  
  
  
  createCanvas(1100, 400)
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







//---------------------------------------------







//mic.enabled

function draw() {
//clear();  
background ('#fb8500');
  
  exerciseData=input.value();
  
  
  
  
  //radioVal = radio.value();
  
 
  
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
//sensor = round(axisInput(),2); 
  sensor = axisInput();
  //sensor = round(sensor,2);  

  } 
  
  
  push()  
strokeWeight(10);
  //fill(200)
fill(204, 153, 0);
  fill('#FFB703')
rect(0,height,width,-sensor*2+30);
pop()
  
  
  
    push()  
strokeWeight(10);
  //fill(200)
fill(250);
  //fill('#FFB703')
rect(50,20,135,70,10);
pop()
  
  
  
    text('ID:',700,20);
  text(taskIndex,720,20);//which index is now playing
  
  push();
  fill(250)
  strokeWeight(0);
  stroke(150);
  rect(50, 105, chartlen+1, 250,10);
  pop();
  
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
  
  
  
  
  
//push()  
//strokeWeight(10);
//  fill(200)
//fill(204, 153, 0);
//  fill('#FFB703')
//ellipse(750, 0,50+ sensor*2,50+ sensor*2);
//pop()
  
    push()
  strokeWeight(2);
  stroke('#0CCA4A');
  line(52, 430-sensor*2, chartlen+48+1, 430-sensor*2);
 
  
  pop()
  push()  
strokeWeight(2);
  stroke(200);
  
  
  
  
line(52,430-linia1*2, chartlen+48+1,430-linia1*2);
  
  
line(52,430-linia2*2, chartlen+48+1,430-linia2*2);
  
  
line(52,430-linia3*2, chartlen+48+1,430-linia3*2);
  
line(52,430-linia4*2, chartlen+48+1,430-linia4*2);
  
line(52,430-linia5*2, chartlen+48+1,430-linia5*2);
  
line(52,430-linia6*2, chartlen+48+1,430-linia6*2);
  
line(52,430-linia7*2, chartlen+48+1,430-linia7*2);
  
line(52,430-linia8*2, chartlen+48+1,430-linia8*2);
  
  
  
  //line(50+przesuw,330,50+przesuw,200)
  pop()
  
  //draw chart
  push() 
  stroke(100);//line color
  strokeWeight(2.6);//line weight
  
    
  for (let i = 0; i < xvals.length; i++) {
    line(pixpsec*xtime[i]+50,-xvals[i]*2+430,pixpsec*xtime[i+1]+50,-xvals[i+1]*2+430);
    
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
  

  
  

push();
textSize(40)
text((round(sensor*100))/100, 60, 70);
pop(); 
  

text('Podłączony: ',800,20);
//text('Millis: ',10,60);
//text(round(millis()),50,60);
 
  
if(connected){
  text('TAK!',870,20);
}
  else {
    text('NIE',870,20);
  }
  


push()
textSize(30);
//text('Lubisz ciastka?',250,140);
  text(exerciseData,200,140);
  
  
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
    
    //return 100+controller.axes[7]*100;
    return 100+(controller.axes[10]+controller.axes[7])*100;
   
  }
  }
  else{
    return 0;
  }
}


function startButtonF() {
  if(!startState && radio.value()){
  console.log('Start!');
  taskIndex++;
  xvals = [];//erase data
  startState = 1;
  di=0;
    
  recorder.record(soundFile);//record audio  
    
    
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
      
      recorder.stop();//stop recording audio
      
      
      
      
      hours = hour();
      minutes = minute();
      seconds = second();
      years = year();
      months = month();
      days = day();
      

      
      
      json.id = taskIndex;
      json.module = radio.value();
      json.exercise = exerciseData;
      json.date = (str(days) + '.' + str(months) + '.' + str(years));
      json.hour = (str(hours) + ':' + str(minutes) + ':' + str(seconds));
      
      
      
      json.values = xvals;
      json.timestamp = xtime;
      
      if(zapis){
      saveJSON(json,str(taskIndex) + '_' + 'mod' + str(radio.value() + '_' + str(days) + '-' + str(months) + '-' + str(years) + '_' + str(hours) + '-' + str(minutes) + '-' + str(seconds) + '_' + exerciseData));
      
      
      saveSound(soundFile,str(taskIndex) + '_' + 'mod' + str(radio.value() + '_' + str(days) + '-' + str(months) + '-' + str(years) + '_' + str(hours) + '-' + str(minutes) + '-' + str(seconds) + '_' + exerciseData)); // save file
      }
      
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

function saveCSV(){
  
}

