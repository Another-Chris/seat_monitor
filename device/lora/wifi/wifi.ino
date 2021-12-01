/*
   This is for WEMOS to upload the data to the internet
*/

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

String serverName = "https://seatmonitor.azurewebsites.net";
String devServer =  "https://iot-test-server.herokuapp.com/request";
WiFiClientSecure client;
HTTPClient http;

// message from lora receiver
char message[8];
int message_pos = 0;

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


void httpPost(String url, String body) {
  client.setInsecure();

  if (WiFi.status() == WL_CONNECTED) {
    http.begin(client, url);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    int httpResponseCode = http.POST(body);

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


void setup() {
  Serial.begin(115200);
  Serial.println("ready");
  setupWifi();
}
void loop() {
  while (Serial.available() > 0) {
    char reading = Serial.read();
    if (reading != '\n') {
      message[message_pos] = reading;
      message_pos ++;
    } else {
      message[message_pos] = '\0';
      int number = atoi(message);

      String url = serverName;
      url += "?status=";
      url += 
      httpPost(url, "");
      
      message_pos = 0;
    }
  }
}
