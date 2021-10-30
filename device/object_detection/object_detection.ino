const int ledState = LOW;
const int pinLed = 7;
const int pinPir = 5;

int pirState = LOW;
int val = 0;
int calibrationTime = 1;
int LowTime = 10 * 1000; // ms
int lastTimeLow = 0;

void setup() {

  pinMode(pinLed, OUTPUT);
  pinMode(pinPir, INPUT);
  Serial.begin(9600);
  Serial.println("waiting for the sensor to warm up...");
  delay(calibrationTime * 1000);
  Serial.println("ready!");

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
    if (pirState == HIGH) {
      Serial.println("motion ended");
      pirState = LOW;
      lastTimeLow = millis();
    }
  }




  if (!pirState && ((millis() - lastTimeLow) > LowTime) && lastTimeLow != 0) {
    digitalWrite(pinLed, LOW);
    Serial.println("LED OFF");
  }

  delay(1000);
}
