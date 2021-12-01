#include<LoRa.h>

const long LoRaF = 915E6;

void setUpLoRa() {
  Serial.println("start LoRa...");
  while (!LoRa.begin(LoRaF)) {
    Serial.print(".");
    delay(500);
  }
}

void sendPacket(String message) {
  LoRa.beginPacket();
  LoRa.print(message);
  LoRa.endPacket();
}

String parsePacket () {
  String message = "";
  while (LoRa.available()) {
    message  += (char)LoRa.read();
  }
  return message;
}
