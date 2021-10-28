const int ledState = LOW;
const int pinLed = 4;
const int pinPir = 8;

int pirState = LOW;
int val = 0;
int calibrationTime = 30;

void setup() {
  pinMode(pinLed, OUTPUT);
  pinMode(pinPir, INPUT);
  Serial.begin(115200);
  Serial.println("waiting for the sensor to warm up...");
  delay(calibrationTime * 1000);

}

void loop() {

  val = digitalRead(pinPir);

  if (val == HIGH) {
    digitalWrite(pinLed, HIGH);

    if (pirState == LOW) {
      Serial.println("motion detected!");
      pirState = HIGH;
    }
  } else {
    digitalWrite(pinLed, LOW);
    if (pirState == HIGH) {
      Serial.println("motion ended");
      pirState == LOW;
    }
  }

  delay(1000);
}
