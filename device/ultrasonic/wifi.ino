#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

String serverName = "https://seatmonitor.azurewebsites.net";
String devServer =  "https://iot-test-server.herokuapp.com/request";
WiFiClientSecure client;
HTTPClient http;

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

// http query backbone
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


void changeSeatState(int seatId) {
  String query = "?seatId=";
  query += seatId;
  
  String url = serverName;
  url += "/seats";
  url += query;
  httpPost(url, "");
}

void oneMinDuration(int seatId, int duration) {
  //   send post to server
  String query = "?seatId=";
  Serial.println(seatId);
  query += seatId;
//  query +=  "&";
//  query += "duration=" ;
//  query += duration;

  String url = serverName;
  url += "/seats";
  url += "/duration";
  url += query;

  String body = ""; // JSON
  httpPost(url, body);
}
