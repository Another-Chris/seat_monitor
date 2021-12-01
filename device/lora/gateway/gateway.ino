#include<LoRa.h>

//============================= start
void setup() {
  Serial.begin(9600);
  Serial1.begin(115200);
  setUpLoRa();
}

String cvtMsg(int message){
    char msg = char(message);
    if (msg == '0') return "occupied";
    else if (msg == '1') return "available";
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
    Serial1.write(message);
  }
}
