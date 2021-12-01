#include<LoRa.h>

//============================= start
void setup() {
  Serial.begin(9600);
  setUpLoRa();
}

String cvtMsg(int message){
    if (message == 0) return "occupied";
    else if (message == 1) return "available";
    else return "suspicious";
  }

void loop() {
  int command = Serial.read();

  if (char(command) == 's') {
    Serial.println("sending packet...");
    sendPacket("GET_STATUS");
  }

  int packetSize = LoRa.parsePacket();
  if (packetSize != 0) {
    int message = LoRa.read();
    Serial.println("[+] receive seat status: " + cvtMsg(message));
    Serial.write(message);
  }
}
