#include<LoRa.h>

//=== pins
const int trigger = 3;
const int echo = 4;
const int touch = 5;

//=== object distance
const int outRange = 100;

//============================= functions
int getSeatStatus() {
  long distance = getDistance();
  int isTouching = getTouchState() == 1;
  if (isTouching) return 0;
  else{
        if (distance < outRange) return 2;
        else return 1;
    }
}

void onReceive() {
  String message =  parsePacket();
  if (message == "GET_STATUS") {
    int seatStatus = getSeatStatus();
    sendPacket(seatStatus);
  } else return;
}

//============================= start
void setup() {
  Serial.begin(9600);
  setUpSonic();
  setUpTouch();
  setUpLoRa();
}


void loop() {
  //  LoRa.onReceive(onReceive);
  int packetSize = LoRa.parsePacket();
  if (packetSize != 0) {
    onReceive();
  }
}
