
#include <Joystick.h>

Joystick_ Joystick;

void setup() {


  
  Joystick.begin();// Initialize Joystick Library
  
}



void loop() {
  Joystick.setThrottle(0);
  delay(500);
  Joystick.setThrottle(255);
  delay(500);
  Joystick.setThrottle(100);
  delay(500);
  Joystick.setThrottle(20);
  delay(500);
}
