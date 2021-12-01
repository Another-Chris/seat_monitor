#include<LoRa.h>

//=== pins
const int trigger = 30;
const int echo = 31;
const int touch = 32;

//=== object distance
const int outRange = 100;

//============================= functions
String getSeatStatus() {
  long distance = getDistance();
  int isTouching = getTouchState() == 1;
  Serial.println(distance);
  if ((distance < outRange) && isTouching)  return 0;
  else if ((distance < outRange) && !isTouching) return -1;
  else return 1;
}

void onReceive() {
  String message =  parsePacket();
  if (message == "GET_STATUS") {
    String seatStatus = getSeatStatus();

    Serial.println("[+] receive command; seat status: " + seatStatus);
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
