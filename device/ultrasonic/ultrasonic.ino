const int trigger = 15; //D8
const int echo = 13;   //D7

void setUpSonic() {
  pinMode(trigger, OUTPUT);
  pinMode(echo, INPUT);
}

void sendPulse() {
  digitalWrite(trigger, LOW);
  delayMicroseconds(2);
  digitalWrite(trigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigger, LOW);
}
