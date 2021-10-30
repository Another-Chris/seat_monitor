#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

const int trigger = 5;
const int echo = 4;

int prevState = 0;
int outOfRangeCount = 0;
int maxOutOfRange = 5;
int objectRange = 50;        //cm



void httpPost() {

}

void setupBasic() {
  pinMode(trigger, OUTPUT);
  pinMode(echo, INPUT);
  Serial.begin(115200);
}


void setupWifi() {
  const char ssid [] = "chris";
  const char password[] = "12345678";
  String server = "";

  WiFi.begin(ssid, password);
  Serial.println("connect to wifi");

  while (WiFi.status != WL_CONNECTED) {
    delay(500);
    Serial.print(".")
  }
  Serial.println("wifi connected.");
}

void setup() {


}

void noObject() {
  Serial.println("no object in front");
}

bool outOfRange(long distance) {
  if (distance >= objectRange) {
    if (prevState >= objectRange) {
      return true;
    }
  }

  return false;
}

long calcDistance(long duration) {
  long distance = (duration / 2) / 29.1;  // 1/29.1 is the sound speed

  if (outOfRange(distance)) {
    outOfRangeCount ++;

    if (outOfRangeCount >= maxOutOfRange) {
      noObject();
      outOfRangeCount = 0;
    }
  } else {
    outOfRangeCount = 0;
  }
  prevState = distance;
  return distance;
}

void sendPulse() {
  digitalWrite(trigger, LOW);
  delayMicroseconds(2);
  digitalWrite(trigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigger, LOW);
}

void loop() {
  long duration;  // time the trigger being high
  sendPulse();
  duration = pulseIn(echo, HIGH);
  long distance = calcDistance(duration);
  Serial.println(distance);
  delay(500);
}
