// ===================== variables =====================
int prevState = 0;
int outOfRangeCount = 0;
int maxOutOfRange = 5;
int inRangeCount = 0;
int maxInRange = 3;
int objectRange = 50; //cm

int seatOccupied = false;
int seatId =0; //!!!!!!!!!!!!!!!!!!!!! change this for different device

int counter = 0;

// ===================== utils  =====================

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
        changeSeatState(seatId);
        outOfRangeCount = 0;
        counter = 0;
      }
    }
  } else {
    if (!seatOccupied) {
      inRangeCount ++;
      if (inRangeCount >= maxInRange) {
        Serial.println("object detected, occupy seat");
        changeSeatState(seatId);
        seatOccupied = true;
        inRangeCount = 0;
        counter = 0;
      }
    } else {
      outOfRangeCount = 0;
    }
  }
  prevState = distance;
  return distance;
}

void setup() {
  Serial.begin(115200);
  setUpSonic();
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
  counter += 1;

  if (counter >= 120) { // 120 because 0.5s for 1 counter
    Serial.println("1min, report to the server");
    oneMinDuration(seatId, counter); // tell server this seat's state has kept for 1 minute
    counter = 0;
  }
}
