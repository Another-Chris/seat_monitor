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


long getDistance() {
  sendPulse();
  long duration = pulseIn(echo, HIGH);
  long distance = (duration / 2) / 29.1;
  return distance;
}
