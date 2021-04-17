//color pallete:
//https://coolors.co/8ecae6-219ebc-023047-ffb703-fb8500

let zapis = 1;//zmien na zero by nie zapisywac plikow
var proMode = 0;//zmien na zero by nie zapisywac plikow

//wysokosc szarych linii
let linia1 = 50;
let linia2 = 50;
let linia3 = 50;
let linia4 = 50;
let linia5 = 50;
let linia6 = 50;
let linia7 = 50;
let linia8 = 50;

let databaseLocation = 'https://raw.githubusercontent.com/nxtfun/VocalHero/main/database/';

let maxSensorValue = 0.6;//value from sensor at maximum force
let minSensorValue = -1;//value from sensor at minimum force

let jsonContainer;//json container to load data to
let json = {}; //new JSON Object to save data to
let radio; //radio buttons
let colour;
let controllers = []
let connected = 0;
let sensor = 0;
let scaledSensor = 0;//sensor value scaled to 0-100 range
let scaledSensor2 = 0;//sensor value scaled to 0-(height of chart) range
let previousMillis1 = 0;
let previousMillis2 = 0;
let previousMillis3 = 0;
let timestamp = 0;
let timestamp2 = 0;
let timestamp3 = 0;
let timer1 = 0;
let currentMillis = 0;
let secinsample = 10; //how many ms between samples
let przesuw = 0;
let xvals = []; // values from sensor saved to buffer
let xtime = []; // time stamps for every sensor value
let xvals2 = []; // values from file saved to buffer
let xtime2 = []; // time stamps for every sensor value from file

let xvalsScaled = []; // values from sensor saved to buffer, scaled to chart height 
let xvalsScaled2 = []; // values from file saved to buffer, scaled to chart height 

let popUp = 0;//pop-up state. 0 means its off
let isListening = 0;//listening state


let exercise2 = []; // exercise from json


let startButton;
let stopButton;
let radioVal; //radio button value
let playButton;

let di = 0;
//let pixpsec = 0.10;//how many pixels in 1 ms on chart
let rduration = 10000;//how long is one recording
//let chartlen = pixpsec * rduration;//length of chart in px
let chartlen = 1000;//length of chart in px
let pixpsec = chartlen / rduration;//how many pixels in 1 ms on chart

let startState = 0;//state of "Start" button  0 - unlocked, 1 - locked (after start, to not push it again)
let startState2 = 0;//state of chart  '1' after countdown, '0 when stopped'
let audioRecordFlag = 0;

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

let startCountdown = 0;

let fade1 = 255;
let fade2 = 255;
let fade3 = 255;
let fade4 = 255;

let examplesArray = [];//Array of random, shuffled numbers from 1 to n, where n is number of examples in database

//loadSound('https://raw.githubusercontent.com/nxtfun/VocalHero/main/database/1_mod1_24-3-2021_23-26-6_kkk.wav')

let jsonArray = [];//array of jsons
let xvals3 = [];
let xtime3 = [];
let exercise3 = [];
let soundArray = [];
let thisManyExercises = 8; // set number of exercises in each module
let currentExercise = 1;
//let currentModule = 2;//set which module should be vieved

let nextExercise = 0;

let xvals2Length = 100;//variable to limit chart length


//chartlen - rduration
//x        - stamp

//x = stamp * chartlen/rduration
//x= stamp*pixpsec

function preload() {

  examplesArray = shuffleArray(checkHowManyExamples(currentModule));//number = current module 1 - 3



  if (thisManyExercises > examplesArray.length) {//limits number of exercises if there is less of them in database
    thisManyExercises = examplesArray.length;
  }


  //load all examples without first one
  for (let i = 1; i < thisManyExercises; i++) {

    jsonArray[i] = loadJSON(databaseLocation + str(currentModule) + '/' + str(examplesArray[i]) + '.json'); //load jsons
    soundArray[i] = loadSound(databaseLocation + str(currentModule) + '/' + str(examplesArray[i]) + '.wav');


  }



  //preload first example only
  //jsonContainer = loadJSON('ciastko.json');
  //jsonContainer = loadJSON(databaseLocation + '1/' + str(examplesArray[1]) + '.json');
  jsonArray[0] = loadJSON(databaseLocation + str(currentModule) + '/' + str(examplesArray[0]) + '.json');
  //jsonContainer = loadJSON(databaseLocation + '1/1.json');
  sound = loadSound(databaseLocation + str(currentModule) + '/' + str(examplesArray[0]) + '.wav');
  //sound = loadSound(databaseLocation + '1/1.wav');
  //console.log('Ilosc przykladow w bazie:' + checkHowManyExamples(1));

  //console.log(examplesArray);







}

function setup() {
  //start of setup

  //input text
  //input = createInput();
  //input.position(400, 5);

  if (currentModule == 3) {

    rduration = 4000;//how long is one recording
    pixpsec = chartlen / rduration;
  }

  //radio buttons
  //radio = createRadio();
  //radio.option('1');
  //radio.option('2');
  //radio.option('3');
  //radio.style('width', '200px');
  //radio.style('height', '20px');
  //radio.position(300, 5);


  //buttons
  //startButton = createButton('START!');
  //startButton.position(560, 5);
  //startButton.mousePressed(startButtonF);

  //playButton = createButton('Przykład');
  //playButton.position(560, 25);
  //playButton.mousePressed(playButtonF);

  //stopButton = createButton('STOP!');
  //stopButton.position(50,90);
  //stopButton.mousePressed(stopButtonF);

  textFont("Montserrat");
  //xvals2 = Object.values(jsonContainer.values);
  //xtime2 = Object.values(jsonContainer.timestamp);
  //exercise2 = jsonContainer.exercise;
  xvals2 = Object.values(jsonArray[0].values);
  xtime2 = Object.values(jsonArray[0].timestamp);
  exercise2 = jsonArray[0].exercise;



  if (currentModule == 3) {
    for (let iii = 0; iii < xtime2.length; iii++) {

      if (xtime2[iii] > rduration) {
        xvals2Length = iii;
        break;
      }

    }

  }
  else {
    xvals2Length = xvals2.length;
  }



  //console.log(xvals2);
  //xvals2 = Object.values(xvals2);//to check if valid
  //console.log(typeof xvals2);
  //console.log(xtime2[21]);





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



  var myCanvas = createCanvas(1100, 600);
  myCanvas.parent("canvas-parent"); //sensor information on bar fix


  //background(120,200,0)
  noStroke()
  window.addEventListener("gamepadconnected", function (e) {
    gamepadHandler(e, true);
    //console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    //e.gamepad.index, e.gamepad.id,
    //e.gamepad.buttons.length, e.gamepad.axes.length);
    connected = 1;
  });
  window.addEventListener("gamepaddisconnected", function (e) {
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
  background('#fb8500');



  if (nextExercise) { // this is called once, after exercise to load new example
    nextExercise = 0;
    /*
    if (currentExercise < thisManyExercises) {//iterate to next exercise number
      currentExercise++;
    }
*/
    currentExercise++;

    if (currentExercise > thisManyExercises) {//iterate to next exercise number
      window.open("task" + str(currentModule + 1) + ".html", "_self");
      currentExercise--;
    }


    xvals2 = Object.values(jsonArray[currentExercise - 1].values);
    xtime2 = Object.values(jsonArray[currentExercise - 1].timestamp);
    exercise2 = jsonArray[currentExercise - 1].exercise;
    sound = soundArray[currentExercise - 1];


    if (currentModule == 3) {
      for (let iii = 0; iii < xtime2.length; iii++) {

        if (xtime2[iii] > rduration) {
          xvals2Length = iii;
          break;
        }

      }

    }
    else {
      xvals2Length = xvals2.length;
    }






    xvalsScaled = [];//erase chart

  }







  //exerciseData = input.value();//changes char input to int input;
  exerciseData = exercise2;







  //radioVal = radio.value();



  //background (255,183,3)

  //print(xvals2[])  ;

  //Input from sensor
  if (!connected) {
    if (mouseY <= 547 && mouseY > 166) {
      sensor = map(mouseY, 547, 166, minSensorValue, maxSensorValue);
    }
    else if (mouseY <= 166) {
      sensor = maxSensorValue;

    }
    else {


      sensor = 0;
    }

  }
  else {
    //sensor = round(axisInput(),2); 
    sensor = axisInput();




    //sensor = round(sensor,2);  

  }

  if (sensor > maxSensorValue) {
    sensor = maxSensorValue;
  }
  if (sensor < minSensorValue) {
    sensor = minSensorValue;
  }

  scaledSensor = map(sensor, minSensorValue, maxSensorValue, 0, 100);
  scaledSensor2 = map(sensor, minSensorValue, maxSensorValue, 0, 380);




  //text(sensor, 200, 100);

  push()
  strokeWeight(10);
  //fill(200)
  fill(204, 153, 0);
  fill('#FFB703')
  rect(0, height, width, -scaledSensor2 - 55); //background line rising up with sensor
  pop()



  push()
  strokeWeight(10);
  //fill(200)
  fill(240);
  //stroke('#023047');
  strokeWeight(2);
  //fill('#FFB703')
  rect(900, 30, 150, 50, 10); //background to sensor value
  pop()


  push()// listening button

  // https://coolors.co/fc9f5b-fbd1a2-ece4b7-7dcfb6-33ca7f


  if (mouseX > 50 && mouseX < 280 && mouseY > 30 && mouseY < 80 && !startState) {
    fill('#3DA485');//before start after hoover
  }
  else if (!startState) {
    fill('#7DCFB6');//before start before hoover
  }
  else if (mouseX > 50 && mouseX < 280 && mouseY > 30 && mouseY < 80 && startState) {
    fill(200);//after start before hoover
  }
  else {
    fill(200);//after start after hoover
  }
  //stroke('#023047');
  strokeWeight(2);


  rect(50, 30, 230, 50, 00);//odsłuchaj
  pop()



  //https://coolors.co/a6ebc9-61ff7e-dbfadb-62ab37-393424


  push()//start button

  if (mouseX > 320 && mouseX < 470 && mouseY > 30 && mouseY < 80 && !startState) {
    fill('#5EEB5B');//before start after hoover
  }
  else if (!startState) {
    fill('#C9F8C9');//before start before hoover
  }
  else if (mouseX > 320 && mouseX < 470 && mouseY > 30 && mouseY < 80 && startState) {
    fill('#FF3333');//after start before hoover
  }
  else {
    fill('#FFADAD');//after start after hoover
  }


  strokeWeight(2);


  rect(320, 30, 150, 50, 25);//start button
  pop()


  //if (mouseX > 50 && mouseX < 200 && mouseY > 30 && mouseY < 80)

  //023047
  push()
  textSize(30);
  fill(20);
  textAlign(CENTER);
  if (!startState) {
    text('START', 350, 65, 100);
  }
  else {
    text('STOP', 350, 65, 100);
  }

  text('ODSŁUCHAJ', 118, 65, 100);


  pop()

  //text(mouseX, 10, 20);
  //text(mouseY, 50, 20);









  //text('ID:', 700, 20);
  //text(taskIndex, 720, 20);//which index is now playing

  push();
  fill(250, 250, 250, 210)
  strokeWeight(0);
  stroke(150);
  rect(50, 105, chartlen + 1, 450, 00);// background for graph
  pop();

  //time  
  currentMillis = millis();






  /*
  
      previousMillis1 = currentMillis; //reset timer
      timer1 = 0; //reset timer
  
      while (timer1 < 3000) {
  
  
        timer1 = millis() - previousMillis1;//current time from start
  
        if (1) {
  
  
          push()
          textSize(40);
          textAlign(CENTER);
          text('3', width / 2, 200);
          pop()
  
        }
  
      }
  */



  //  if(currentMillis - previousMillis > secinsample){
  //    previousMillis = currentMillis;
  //print('Hello');
  //    if(przesuw>300)przesuw = 0;
  //    przesuw = przesuw+1;
  //  }


  //save input data to buffer
  if (startState2) {
    startRecording();
  }
  else {
    previousMillis2 = currentMillis;
    //xvals = [];//erase data
    di = 0;
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
  line(52, 545 - scaledSensor2, chartlen + 48 + 1, 545 - scaledSensor2);


  pop()
  push()
  strokeWeight(2);
  stroke(200);




  // line(52, 430 - linia1 * 2, chartlen + 48 + 1, 430 - linia1 * 2);


  // line(52, 430 - linia2 * 2, chartlen + 48 + 1, 430 - linia2 * 2);


  // line(52, 430 - linia3 * 2, chartlen + 48 + 1, 430 - linia3 * 2);

  //line(52, 430 - linia4 * 2, chartlen + 48 + 1, 430 - linia4 * 2);

  // line(52, 430 - linia5 * 2, chartlen + 48 + 1, 430 - linia5 * 2);

  // line(52, 430 - linia6 * 2, chartlen + 48 + 1, 430 - linia6 * 2);

  // line(52, 430 - linia7 * 2, chartlen + 48 + 1, 430 - linia7 * 2);

  // line(52, 430 - linia8 * 2, chartlen + 48 + 1, 430 - linia8 * 2);



  //line(50+przesuw,330,50+przesuw,200)
  pop()

  //draw chart
  push()
  stroke(100);//line color
  strokeWeight(2.6);//line weight



  stroke(100, 200, 300);



  push();
  beginShape();


  fill(237, 34, 93, 100);
  stroke(237, 34, 93);
  //noStroke();
  strokeWeight(2);

  //chart from data
  for (let i = 0; i < xvals2Length; i++) {
    vertex(pixpsec * xtime2[i] + 50, - map(xvals2[i], minSensorValue, maxSensorValue, 0, 380) + 545);

  }
  vertex(pixpsec * xtime2[xvals2Length - 1] + 50, 554);
  vertex(pixpsec * xtime2[0] + 50, 554);
  vertex(pixpsec * xtime2[0] + 50, - map(xvals2[0], minSensorValue, maxSensorValue, 0, 380) + 545);




  endShape();



  pop();




  if (isListening && (!startState)) {

    timestamp2 = currentMillis - previousMillis1;//check how long from start of listening
    //text(timestamp2, 700, 10);


    push();
    strokeWeight(2);
    stroke(100, 100, 100, 200);

    line(pixpsec * timestamp2 + 50, 554, pixpsec * timestamp2 + 50, 106);//vertical line used as time marker during recording
    pop();




    if (timestamp2 > rduration) {
      isListening = 0;
      sound.stop();
    }
  }




  /*
    //chart from data
    for (let i = 0; i < xvals2.length; i++) {
      line(pixpsec * xtime2[i] + 50, -xvalsScaled2[i] + 545, pixpsec * xtime2[i + 1] + 50, -xvalsScaled2[i + 1] + 545);
  
    }
  */







  beginShape();


  fill(2, 48, 71, 200);
  stroke(2, 48, 71);
  strokeWeight(2);
  //chart from sensor, live
  for (let i = 0; i < xvalsScaled.length; i++) {
    vertex(pixpsec * xtime[i] + 50, -xvalsScaled[i] + 545);

  }

  vertex(pixpsec * xtime[xvalsScaled.length - 1] + 50, 554);
  vertex(pixpsec * xtime[0] + 50, 554);
  vertex(pixpsec * xtime[0] + 50, - xvalsScaled[0] + 545);



  push();
  strokeWeight(2);
  stroke(100, 100, 100, 200);

  line(pixpsec * xtime[xvalsScaled.length - 1] + 50, 554, pixpsec * xtime[xvalsScaled.length - 1] + 50, 106);//vertical line used as time marker during recording
  pop();


  endShape();

  /*

//chart from sensor, live
  for (let i = 0; i < xvalsScaled.length; i++) {
    line(pixpsec * xtime[i] + 50, -xvalsScaled[i] + 545, pixpsec * xtime[i + 1] + 50, -xvalsScaled[i + 1] + 545);

  }

*/




  /*
beginShape();
  for (let i = 1; i < width; i++) {
    stroke(0,255,94);
    point(i, 4 * height / 6 + xvals[i] / 3);
    
    fill(237, 34, 93,100)
    stroke(237, 34, 93);
    point(i-(2*width/5),-xvalsScaled[i] + 545);

    
    vertex(i-(2*width/5),-xvalsScaled[i] + 545)
      


  }
  vertex(3*width/5, height);
  //vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);


*/





  //line(50, 335, 30+(chartlen), 335);
  pop()



  push();
  textSize(40)
  text((round(scaledSensor * 100)) / 100, 910, 70);
  pop();

  /*
    text('Podłączony: ', 800, 20);
    //text('Millis: ',10,60);
    //text(round(millis()),50,60);
  
  
    if (connected) {
      text('TAK!', 870, 20);
    }
    else {
      text('NIE', 870, 20);
    }
  
  */
  text('Moduł: ' + currentModule, 1000, 20);
  text('Próba: ' + taskIndex, 900, 20);
  //text(timestamp, 800, 20);
  //text('Audio: ' + sound.isPlaying(), 800, 20);



  push()
  textSize(40);
  textAlign(CENTER);
  text(exerciseData, 0, 150, width);


  pop()



  if (startCountdown) {



    timestamp3 = currentMillis - previousMillis3;//check how long from start
    if (timestamp3 > 0 && timestamp3 < 1000) {

      push()
      fill(0, 0, 0, fade1)
      textSize(90);
      textAlign(CENTER);
      text('3', width / 2, 350);
      pop()

      fade1 = fade1 - 5;
    }

    if (timestamp3 > 1000 && timestamp3 < 2000) {

      push()
      fill(0, 0, 0, fade2)
      textSize(90);
      textAlign(CENTER);
      text('2', width / 2, 350);
      pop()

      fade2 = fade2 - 5;

    }

    if (timestamp3 > 2000 && timestamp3 < 3000) {

      push()
      fill(0, 0, 0, fade3)
      textSize(90);
      textAlign(CENTER);
      text('1', width / 2, 350);
      pop()

      fade3 = fade3 - 5;
    }


    if (timestamp3 > 3000 && timestamp3 < 3500) {

      push()
      fill(0, 0, 0, fade4)
      textSize(90);
      textAlign(CENTER);
      text('START!', width / 2, 350);
      pop()

      fade4 = fade4 - 10;

    }


    if (timestamp3 > 3000) {

      if (!startState2)
        audioRecordFlag = 1;

      startState2 = 1; //start chart

    }


    if (timestamp3 > 4000) {

      startCountdown = 0; //stop this function

    }












  }





  //pop-ups
  if (popUp) {
    //popUp
    //greys out whole screen
    push()
    // strokeWeight(10);
    //fill(200)
    fill(240, 240, 240, 200);
    //stroke('#FFB703');
    strokeWeight(1);
    //fill('#FFB703')
    rect(0, 0, width, height);

    stroke('#FFB703');
    fill(250, 250, 250, 150);
    rect(width / 4, height / 4, width / 2, height / 2, 0);
    fill('#FFB703');
    rect(width / 4, 200 + height / 4, width / 2, height / 6, 0);


    pop()


    push()
    push()
    textSize(40);
    fill(20);
    textAlign(CENTER);
    text('Dobra robota!', width / 2, 200);
    fill(250);
    text('DALEJ', width / 2, 410);
    fill(100);
    text('...albo spróbuj ponownie!', width / 2, 500);



    stroke(100);
    //fill(100);
    noFill();
    strokeWeight(2);
    bezier(282, 486, 168, 460, 140, 256, 300, 90);
    line(300, 90, 270, 90);
    line(300, 90, 301, 118);
    //fill(100);

    pop()


    push()

    fill('#5EEB5B');


    strokeWeight(2);


    rect(320, 30, 150, 50, 25);//start button




    pop()


    push()
    textSize(30);
    fill(20);
    textAlign(CENTER);
    text('START', 350, 65, 100);





    pop()









  }









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





function axisInput() {
  let AllAxes = 0;
  if (connected) {
    var gamepads = navigator.getGamepads()
    for (let i in controllers) {
      let controller = gamepads[i]//controllers[i]

      //return 100+controller.axes[7]*100;
      //return 100 + (controller.axes[10] + controller.axes[7]) * 100;

      for (let j = 0; j < controller.axes.length; j++) {

        //AllAxes = AllAxes + controller.axes[j];

      }

      //AllAxes = (controller.axes[0] * 100) + 100;
      AllAxes = controller.axes[0];
      console.log(AllAxes);
      //console.log(controller.axes[0]);
      //AllAxes = map(AllAxes, -860, -830, minSensorValue, maxSensorValue); // weird sensor range fix

      //console.log(controller.axes);
      //console.log(controller.axes);


      return AllAxes;



    }
  }
  else {
    return 0;
  }
}


function startButtonF() {
  if (!startState) {
    popUp = 0;//close popUp window
    startState = 1;//start
    fade1 = 255;//reset alpha channel for countdown numbers
    fade2 = 255;//reset alpha channel for countdown numbers
    fade3 = 255;//reset alpha channel for countdown numbers
    fade4 = 255;//reset alpha channel for countdown numbers
    previousMillis3 = currentMillis;//reset timer
    startCountdown = 1;

    xvals = [];//erase data
    xvalsScaled = []//erase chart
    getAudioContext().resume(); //needed by browser to use microphone and audio

    sound.stop();
    isListening = 0;



    console.log('Start!');



    di = 0;//xvals[di] = sensor

    // recorder.record(soundFile);//record audio  


  }
}


function listeningF() {
  text('Odsłuch!', 10, 10);

}



function stopButtonF() {
  console.log('Stop!');

  startState = 0;
  startState2 = 0;
  previousMillis2 = currentMillis;
  xvalsScaled = [];

}


function playButtonF() {
  sound.play();

}


function startRecording() {

  timestamp = round(currentMillis - previousMillis2);//current time in ms from start of recording data

  if (audioRecordFlag) {
    taskIndex++;
    audioRecordFlag = 0;
    recorder.record(soundFile);//record audio  
  }


  //If data gathering time is longer than (value of time in ms), reset the timestamp.
  if (timestamp > rduration) {
    //di=0;
    //previousMillis2 = currentMillis;

    popUp = 1;//open pop-up screen
    recorder.stop();//stop recording audio




    hours = hour();
    minutes = minute();
    seconds = second();
    years = year();
    months = month();
    days = day();




    json.id = taskIndex;
    //json.module = radio.value();
    json.exercise = exerciseData;
    json.date = (str(days) + '.' + str(months) + '.' + str(years));
    json.hour = (str(hours) + ':' + str(minutes) + ':' + str(seconds));



    json.values = xvals;
    json.timestamp = xtime;


    if (zapis) {
      saveJSON(json, str(taskIndex) + '_' + 'mod' + '_' + str(days) + '-' + str(months) + '-' + str(years) + '_' + str(hours) + '-' + str(minutes) + '-' + str(seconds) + '_' + exerciseData);


      saveSound(soundFile, str(taskIndex) + '_' + 'mod' + '_' + str(days) + '-' + str(months) + '-' + str(years) + '_' + str(hours) + '-' + str(minutes) + '-' + str(seconds) + '_' + exerciseData); // save file
    }

    stopButtonF();

    //xvals = [];//erase data
    //print(xtime);
  }
  else {

    xvals[di] = sensor; //save sensor data with every frame
    xtime[di] = timestamp; //save time from start in ms with every frame

    xvalsScaled[di] = scaledSensor2;//scaled data array for chart drawing

    di++;//iterate to next frame
  }

  //text('time:', 10, 130);
  //text(timestamp, 40, 130);
  //text('frame:', 10, 145)
  //text(di, 45, 145)

}

function saveCSV() {

}



function shuffleArray(n) {


  //create array of n recurring elements

  for (let i = 1; i - 1 < n; i++) {
    examplesArray[i - 1] = i;
  }


  /* Randomize array in-place using Durstenfeld shuffle algorithm */

  for (var i = examplesArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = examplesArray[i];
    examplesArray[i] = examplesArray[j];
    examplesArray[j] = temp;
  }
  //console.log(examplesArray);
  return examplesArray;
}


//checkes if URL is valid
function UrlExists(url) {
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  if (http.status != 404) {
    return 1;
  }

  else {
    return 0;
  }

}




//Checkes how many examples are in database in 'n' module
function checkHowManyExamples(n) {
  let ii = 0;
  for (let i = 0; i < 200; i++) {
    if (UrlExists(databaseLocation + str(n) + '/' + str(i + 1) + '.json')) {
      ii++
    }
    else {
      return ii;
    }
  }

}



function mousePressed() {
  //console.log('Hello! MousePressed');
  if (mouseX > 320 && mouseX < 470 && mouseY > 30 && mouseY < 80 && !startState) {//if mouse over start button and nothing is playing
    //getAudioContext().resume(); //needed by browser to use microphone and audio
    startButtonF();
  }
  else if (mouseX > 320 && mouseX < 470 && mouseY > 30 && mouseY < 80 && startState) {//if mouse over start and example is playing
    stopButtonF();
    //timestamp3 = 0;
    startCountdown = 0;//stop countdown
    startState = 0;

    recorder.stop();//stop recording audio
    //getAudioContext().resume(); //needed by browser to use microphone and audio
  }



  if (mouseX > 50 && mouseX < 280 && mouseY > 30 && mouseY < 80 && (!startState)) {//if mouse over listening button
    if (!sound.isPlaying()) {
      playButtonF();
      console.log('odsluch');
      previousMillis1 = currentMillis;//reset listening timer
      isListening = 1;
    }
    else {
      sound.stop();
      isListening = 0;
    }



  }





  if (mouseX > 275 && mouseX < 825 && mouseY > 351 && mouseY < 453 && popUp) {
    popUp = 0;
    console.log('dalej');
    nextExercise = 1;
  }


  //playButtonF

}




