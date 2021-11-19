const int tIn = 7;

void setup() {
   pinMode(tIn, INPUT);
    Serial.begin(9600);
    Serial.println("ready.");
}

void loop() {
    Serial.println(digitalRead(tIn));
    delay(1000);

}
