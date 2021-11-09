#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

// ===================== variables =====================
const int trigger = 12; //D6
const int echo = 13;   //D7

int prevState = 0;
int outOfRangeCount = 0;
int maxOutOfRange = 5;
int inRangeCount = 0;
int maxInRange = 3;

int objectRange = 50;        //cm

int seatOccupied = false;

// ===================== utils  =====================
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

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("wifi connected.");
}


void httpPost() {
  String serverName = "https://seatmonitor.azurewebsites.net/seats";
  String query = "?seatId=0";
  String url = serverName + query;

  if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
    HTTPClient http;
    client.setInsecure();
    http.begin(client, url);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    int httpResponseCode = http.POST("");

    if (httpResponseCode > 0) {
      Serial.println("success.");
      Serial.print("payload");
      Serial.print(http.getString());
      Serial.print("\n");
    } else {
      Serial.println("fail");
      Serial.print("Error Code: ");
      Serial.print(httpResponseCode);
      Serial.print("\n");
    }
    http.end();
  } else {
    Serial.println("WiFi disconnected.");
  }
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
    if (seatOccupied) {
      outOfRangeCount ++;
      if (outOfRangeCount >= maxOutOfRange) {
        Serial.println("no object in front, free the seat");
        seatOccupied = false;
        httpPost();
        outOfRangeCount = 0;
      }
    }
  } else {
    if (!seatOccupied) {
      inRangeCount ++;
      if (inRangeCount >= maxInRange) {
        Serial.println("object detected, occupy seat");
        httpPost();
        seatOccupied = true;
        inRangeCount = 0;
      }
    } else {
      outOfRangeCount = 0;
    }
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

void setup() {
  setupBasic();
  setupWifi();
  Serial.println("ready to go.");
}

void loop() {
  long duration;  // time the trigger being high
  sendPulse();
  duration = pulseIn(echo, HIGH);
  long distance = calcDistance(duration);
  Serial.println(distance);
  delay(500);
}
