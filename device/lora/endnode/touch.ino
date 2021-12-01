void setUpTouch() {
  pinMode(touch, INPUT);
}

int getTouchState() {
  int state = digitalRead(touch);
  return state;
}
